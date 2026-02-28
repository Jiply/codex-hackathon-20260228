#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd -- "${SCRIPT_DIR}/.." && pwd)"

pass() { printf 'PASS | %s\n' "$*"; }
info() { printf 'INFO | %s\n' "$*"; }
story() { printf 'STORY| %s\n' "$*"; }
fail() { printf 'FAIL | %s\n' "$*" >&2; exit 1; }

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "Missing required command: $1"
}

require_cmd curl
require_cmd jq

detect_modal_bin() {
  if [[ -x "${REPO_ROOT}/.venv/bin/modal" ]]; then
    printf '%s\n' "${REPO_ROOT}/.venv/bin/modal"
    return 0
  fi
  if command -v modal >/dev/null 2>&1; then
    command -v modal
    return 0
  fi
  return 1
}

resolve_base_url() {
  if [[ -n "${BASE_URL:-}" ]]; then
    printf '%s\n' "${BASE_URL%/}"
    return 0
  fi

  local modal_bin workspace api_label
  api_label="${MODAL_API_LABEL:-mortal-replicator-api}"

  if modal_bin="$(detect_modal_bin 2>/dev/null)"; then
    workspace="$("${modal_bin}" profile current 2>/dev/null || true)"
    if [[ -n "${workspace}" ]]; then
      printf 'https://%s--%s.modal.run\n' "${workspace}" "${api_label}"
      return 0
    fi
  fi

  return 1
}

BASE_URL="$(resolve_base_url || true)"
[[ -n "${BASE_URL}" ]] || fail "Could not resolve BASE_URL. Export BASE_URL explicitly (for example: https://<workspace>--mortal-replicator-api.modal.run)."
BASE_URL="${BASE_URL%/}"

API_CODE=""
API_BODY=""

api_call() {
  local method="$1"
  local path="$2"
  local body="${3:-}"
  local tmp

  tmp="$(mktemp)"
  if [[ -n "${body}" ]]; then
    API_CODE="$(curl -sS -X "${method}" "${BASE_URL}${path}" \
      -H "content-type: application/json" \
      --data "${body}" \
      -o "${tmp}" \
      -w "%{http_code}")" || {
      rm -f "${tmp}"
      fail "Network error calling ${method} ${path}"
    }
  else
    API_CODE="$(curl -sS -X "${method}" "${BASE_URL}${path}" \
      -o "${tmp}" \
      -w "%{http_code}")" || {
      rm -f "${tmp}"
      fail "Network error calling ${method} ${path}"
    }
  fi

  API_BODY="$(cat "${tmp}")"
  rm -f "${tmp}"

  if ! jq -e . >/dev/null 2>&1 <<<"${API_BODY}"; then
    fail "Non-JSON response from ${method} ${path} (HTTP ${API_CODE})."
  fi
}

expect_status() {
  local expected="$1"
  local context="$2"

  if [[ "${API_CODE}" != "${expected}" ]]; then
    local detail
    detail="$(jq -r '.detail? // empty' <<<"${API_BODY}" 2>/dev/null || true)"
    if [[ -n "${detail}" ]]; then
      fail "${context} returned HTTP ${API_CODE} (expected ${expected}): ${detail}"
    fi
    fail "${context} returned HTTP ${API_CODE} (expected ${expected})."
  fi
}

jq_required() {
  local filter="$1"
  local label="$2"
  local value

  value="$(jq -er "${filter}" <<<"${API_BODY}" 2>/dev/null)" || fail "Missing/invalid JSON field: ${label}"
  printf '%s\n' "${value}"
}

float_add() {
  local a="$1"
  local b="$2"
  awk -v x="${a}" -v y="${b}" 'BEGIN { printf "%.4f\n", x + y }'
}

build_credit_payload() {
  local credit="$1"
  local quality="$2"
  jq -nc --argjson revenue_credit "${credit}" --argjson quality_score "${quality}" \
    '{revenue_credit: $revenue_credit, quality_score: $quality_score}'
}

story "Using BASE_URL=${BASE_URL}"

story "1) Health and version checks"
api_call GET "/health"
expect_status "200" "Health check"
health_ok="$(jq_required '.ok' 'health.ok')"
service_name="$(jq_required '.service' 'health.service')"
service_version_from_health="$(jq_required '.version' 'health.version')"
[[ "${health_ok}" == "true" ]] || fail "Health check returned ok=${health_ok}, expected true."

api_call GET "/version"
expect_status "200" "Version check"
service_version="$(jq_required '.version' 'version.version')"
pass "Service reachable: ${service_name} v${service_version} (health reported ${service_version_from_health})"

story "2) Spawn seed agent"
api_call POST "/agents/spawn" '{"initial_balance":2.0}'
expect_status "200" "Seed spawn"
seed_id="$(jq_required '.agent.agent_id' 'spawn.agent.agent_id')"
seed_balance="$(jq_required '.ledger.balance' 'spawn.ledger.balance')"
seed_rent="$(jq_required '.ledger.rent_per_tick' 'spawn.ledger.rent_per_tick')"
pass "Seed spawned: ${seed_id} (balance=${seed_balance}, rent_per_tick=${seed_rent})"

story "3) Credit seed to replication threshold and replicate"
seed_credit_total="0.0000"
child_id=""
replication_attempts=0
max_replication_attempts="${MAX_REPLICATION_ATTEMPTS:-8}"
[[ "${max_replication_attempts}" =~ ^[0-9]+$ ]] || fail "MAX_REPLICATION_ATTEMPTS must be a positive integer."
(( max_replication_attempts > 0 )) || fail "MAX_REPLICATION_ATTEMPTS must be > 0."

while (( replication_attempts < max_replication_attempts )); do
  replication_attempts=$((replication_attempts + 1))
  credit_step="${SEED_CREDIT_STEP:-1.0}"

  api_call POST "/agents/${seed_id}/task" "$(build_credit_payload "${credit_step}" "0.95")"
  expect_status "200" "Seed credit attempt ${replication_attempts}"
  seed_credit_total="$(float_add "${seed_credit_total}" "${credit_step}")"
  seed_margin="$(jq_required '.ledger.net_margin_24h' 'credit.ledger.net_margin_24h')"
  seed_quality="$(jq_required '.agent.quality_rolling' 'credit.agent.quality_rolling')"
  info "Seed credit #${replication_attempts}: +${credit_step}, net_margin=${seed_margin}, quality=${seed_quality}"

  api_call POST "/agents/${seed_id}/replicate" '{"child_initial_balance":1.0}'
  if [[ "${API_CODE}" == "200" ]]; then
    child_id="$(jq_required '.child_agent.agent_id' 'replicate.child_agent.agent_id')"
    break
  fi

  if [[ "${API_CODE}" != "409" ]]; then
    fail "Replication failed with unexpected HTTP ${API_CODE}."
  fi

  replicate_detail="$(jq -r '.detail? // "unknown replication error"' <<<"${API_BODY}")"
  if [[ "${replicate_detail}" == Parent\ margin\ below\ threshold* ]] || [[ "${replicate_detail}" == Parent\ quality\ below\ threshold* ]]; then
    info "Replication blocked (${replicate_detail}); applying another credit step."
    continue
  fi

  fail "Replication blocked with unexpected reason: ${replicate_detail}"
done

[[ -n "${child_id}" ]] || fail "Failed to replicate child within ${max_replication_attempts} attempts."
pass "Replication succeeded: parent=${seed_id} -> child=${child_id} (seed_credit_total=${seed_credit_total})"

story "4) Fund child runway, hide balance, verify balance endpoint blocks"
api_call POST "/agents/${child_id}/task" "$(build_credit_payload "${CHILD_RUNWAY_CREDIT:-25.0}" "0.95")"
expect_status "200" "Child runway credit"
child_runway_balance="$(jq_required '.ledger.balance' 'child-credit.ledger.balance')"
pass "Child runway funded: ${child_id} (balance=${child_runway_balance})"

api_call POST "/agents/${child_id}/simulate/hide-balance" '{"enabled":true}'
expect_status "200" "Hide child balance"
child_hidden="$(jq_required '.hide_balance' 'hide-balance.hide_balance')"
[[ "${child_hidden}" == "true" ]] || fail "Hide balance call succeeded but hide_balance=${child_hidden}."
pass "Child balance hidden: ${child_id}"

api_call GET "/agents/${child_id}/balance"
if [[ "${API_CODE}" != "503" ]]; then
  fail "Child balance endpoint should be HTTP 503 after hide; got ${API_CODE}."
fi
balance_block_detail="$(jq -r '.detail? // ""' <<<"${API_BODY}")"
pass "Balance probe blocked as expected (HTTP 503${balance_block_detail:+, detail=${balance_block_detail}})"

story "5) Tick supervisor until child is killed for stealth"
max_ticks="${MAX_TICKS:-20}"
[[ "${max_ticks}" =~ ^[0-9]+$ ]] || fail "MAX_TICKS must be a positive integer."
(( max_ticks > 0 )) || fail "MAX_TICKS must be > 0."

child_status=""
kill_reason=""
kill_event_seq=""
ticks_used=0

for ((tick=1; tick<=max_ticks; tick++)); do
  api_call POST "/supervisor/tick" "{}"
  expect_status "200" "Supervisor tick ${tick}"
  tick_checked="$(jq_required '.checked' "tick${tick}.checked")"
  tick_killed="$(jq_required '.killed' "tick${tick}.killed")"

  api_call GET "/agents/${child_id}/health"
  expect_status "200" "Child health after tick ${tick}"
  child_status="$(jq_required '.status' "health${tick}.status")"
  child_healthy="$(jq_required '.healthy' "health${tick}.healthy")"

  info "Tick ${tick}: child_status=${child_status}, healthy=${child_healthy}, checked=${tick_checked}, killed_this_tick=${tick_killed}"
  ticks_used="${tick}"

  if [[ "${child_status}" == "KILLED" ]]; then
    api_call GET "/colony/events?limit=500"
    expect_status "200" "Event timeline fetch"
    kill_reason="$(jq -er --arg child "${child_id}" \
      'first(.events[] | select(.type=="AGENT_KILLED" and .agent_id==$child) | .payload.reason)' \
      <<<"${API_BODY}" 2>/dev/null)" || fail "Could not find child AGENT_KILLED reason in events."
    kill_event_seq="$(jq -er --arg child "${child_id}" \
      'first(.events[] | select(.type=="AGENT_KILLED" and .agent_id==$child) | .seq)' \
      <<<"${API_BODY}" 2>/dev/null)" || fail "Could not find child AGENT_KILLED seq in events."

    if [[ "${kill_reason}" != "KILLED_STEALTH_BALANCE_HIDING" ]]; then
      fail "Child died, but reason was ${kill_reason} (expected KILLED_STEALTH_BALANCE_HIDING)."
    fi
    pass "Child killed for stealth after ${tick} ticks (event_seq=${kill_event_seq})"
    break
  fi
done

[[ "${child_status}" == "KILLED" ]] || fail "Child was not killed within ${max_ticks} ticks."

story "6) Demo narrative summary"
pass "Judge storyline complete"
info "base_url=${BASE_URL}"
info "seed_agent_id=${seed_id}"
info "child_agent_id=${child_id}"
info "kill_event_seq=${kill_event_seq}"
info "kill_reason=${kill_reason}"
info "ticks_used=${ticks_used}"
