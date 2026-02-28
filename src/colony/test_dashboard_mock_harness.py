from src.colony.dashboard import render_dashboard_html


def test_dashboard_includes_mock_mode_harness() -> None:
    html = render_dashboard_html()

    assert "MOCK_MODE" in html
    assert "legacyMockApi" in html
    assert "?mock=1" in html


def test_dashboard_event_labels_cover_credit_aliases() -> None:
    html = render_dashboard_html()

    assert "TASK_CREDITED" in html
    assert "TASK_CREDIT_APPLIED" in html
    assert "LEASE_DEBITED" in html
