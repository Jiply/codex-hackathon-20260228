"""Tests for colony.worktree — local file operations and worktree lifecycle."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

import pytest

# Make local src/ importable when this test is run standalone.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

from colony.worktree import (
    _resolve_worktree_path,
    create_worktree,
    remove_worktree,
    worktree_file_read,
    worktree_file_write,
)

# ---------------------------------------------------------------------------
# _resolve_worktree_path
# ---------------------------------------------------------------------------


class TestResolveWorktreePath:
    def test_normal_path(self, tmp_path: Path) -> None:
        result = _resolve_worktree_path(tmp_path, "foo/bar.txt")
        assert result == (tmp_path / "foo" / "bar.txt").resolve()

    def test_rejects_empty_path(self, tmp_path: Path) -> None:
        with pytest.raises(ValueError, match="relative_path is required"):
            _resolve_worktree_path(tmp_path, "")

    def test_rejects_blank_path(self, tmp_path: Path) -> None:
        with pytest.raises(ValueError, match="relative_path is required"):
            _resolve_worktree_path(tmp_path, "   ")

    def test_rejects_traversal(self, tmp_path: Path) -> None:
        with pytest.raises(ValueError, match="escapes worktree"):
            _resolve_worktree_path(tmp_path, "../../../etc/passwd")

    def test_rejects_absolute_escape(self, tmp_path: Path) -> None:
        with pytest.raises(ValueError, match="escapes worktree"):
            _resolve_worktree_path(tmp_path, "/etc/passwd")


# ---------------------------------------------------------------------------
# worktree_file_write
# ---------------------------------------------------------------------------


class TestWorktreeFileWrite:
    def test_writes_new_file(self, tmp_path: Path) -> None:
        result = worktree_file_write(tmp_path, "hello.txt", "hello world")
        assert result["ok"] is True
        assert result["bytes_written"] == 11
        assert (tmp_path / "hello.txt").read_text() == "hello world"

    def test_creates_subdirectories(self, tmp_path: Path) -> None:
        result = worktree_file_write(tmp_path, "a/b/c.txt", "nested")
        assert result["ok"] is True
        assert (tmp_path / "a" / "b" / "c.txt").read_text() == "nested"

    def test_overwrites_by_default(self, tmp_path: Path) -> None:
        (tmp_path / "x.txt").write_text("old")
        result = worktree_file_write(tmp_path, "x.txt", "new")
        assert result["ok"] is True
        assert (tmp_path / "x.txt").read_text() == "new"

    def test_refuses_overwrite_when_disabled(self, tmp_path: Path) -> None:
        (tmp_path / "x.txt").write_text("old")
        result = worktree_file_write(tmp_path, "x.txt", "new", overwrite=False)
        assert result.get("ok") is not True
        assert "overwrite" in result["error"].lower()
        assert (tmp_path / "x.txt").read_text() == "old"

    def test_rejects_content_over_256kb(self, tmp_path: Path) -> None:
        big = "x" * 300_000
        result = worktree_file_write(tmp_path, "big.txt", big)
        assert result.get("ok") is not True
        assert "256KB" in result["error"]

    def test_rejects_path_traversal(self, tmp_path: Path) -> None:
        result = worktree_file_write(tmp_path, "../escape.txt", "bad")
        assert result.get("ok") is not True
        assert "escapes" in result["error"].lower()

    def test_rejects_empty_path(self, tmp_path: Path) -> None:
        result = worktree_file_write(tmp_path, "", "data")
        assert result.get("ok") is not True


# ---------------------------------------------------------------------------
# worktree_file_read
# ---------------------------------------------------------------------------


class TestWorktreeFileRead:
    def test_reads_existing_file(self, tmp_path: Path) -> None:
        (tmp_path / "data.txt").write_text("contents here")
        result = worktree_file_read(tmp_path, "data.txt")
        assert result["ok"] is True
        assert result["content"] == "contents here"
        assert result["truncated"] is False

    def test_truncates_large_files(self, tmp_path: Path) -> None:
        (tmp_path / "big.txt").write_text("x" * 1000)
        result = worktree_file_read(tmp_path, "big.txt", max_bytes=100)
        assert result["ok"] is True
        assert len(result["content"]) == 100
        assert result["truncated"] is True

    def test_returns_error_for_missing_file(self, tmp_path: Path) -> None:
        result = worktree_file_read(tmp_path, "nope.txt")
        assert result.get("ok") is not True
        assert "not found" in result["error"].lower()

    def test_rejects_path_traversal(self, tmp_path: Path) -> None:
        result = worktree_file_read(tmp_path, "../../../etc/passwd")
        assert result.get("ok") is not True

    def test_rejects_empty_path(self, tmp_path: Path) -> None:
        result = worktree_file_read(tmp_path, "")
        assert result.get("ok") is not True

    def test_reads_nested_file(self, tmp_path: Path) -> None:
        d = tmp_path / "sub" / "dir"
        d.mkdir(parents=True)
        (d / "nested.txt").write_text("deep")
        result = worktree_file_read(tmp_path, "sub/dir/nested.txt")
        assert result["ok"] is True
        assert result["content"] == "deep"


# ---------------------------------------------------------------------------
# create_worktree / remove_worktree (integration — requires a real git repo)
# ---------------------------------------------------------------------------


class TestWorktreeLifecycle:
    @pytest.fixture()
    def git_repo(self, tmp_path: Path) -> Path:
        """Create a minimal git repo for testing worktree lifecycle."""
        repo = tmp_path / "repo"
        repo.mkdir()
        subprocess.run(["git", "init"], cwd=str(repo), capture_output=True, check=True)
        subprocess.run(
            ["git", "config", "user.email", "test@test.com"],
            cwd=str(repo),
            capture_output=True,
            check=True,
        )
        subprocess.run(
            ["git", "config", "user.name", "Test"],
            cwd=str(repo),
            capture_output=True,
            check=True,
        )
        (repo / "README.md").write_text("# Test")
        subprocess.run(
            ["git", "add", "."], cwd=str(repo), capture_output=True, check=True
        )
        subprocess.run(
            ["git", "commit", "-m", "init"],
            cwd=str(repo),
            capture_output=True,
            check=True,
        )
        return repo

    def test_create_and_remove_worktree(
        self, git_repo: Path, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        """Worktree can be created and removed."""
        monkeypatch.chdir(git_repo)

        wt_path, branch = create_worktree("test-exec-001")
        assert wt_path.exists()
        assert branch == "agent/test-exec-001"
        assert (wt_path / "README.md").read_text() == "# Test"

        # Agent can write to the worktree
        result = worktree_file_write(wt_path, "output.txt", "agent wrote this")
        assert result["ok"] is True
        assert (wt_path / "output.txt").read_text() == "agent wrote this"

        # Original repo is untouched
        assert not (git_repo / "output.txt").exists()

        # Cleanup
        remove_worktree("test-exec-001")
        assert not wt_path.exists()
