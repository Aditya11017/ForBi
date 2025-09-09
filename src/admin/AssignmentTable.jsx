// src/components/AssignmentTable.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./AssignmentTable.css";

export default function AssignmentTable() {
  const [rows, setRows] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // free text + status dropdown
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  // Use local API in dev; relative in prod (avoids HTTPS mixed-content issues)
  const API_BASE = "http://localhost:3001";

  /** -------------------- Normalizers -------------------- */
  const norm = (s) =>
    (s ?? "")
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

  // Treat "In-Progress", "in progress", "in_progress" as the same
  const toStatusKey = (s) => norm(String(s).replace(/[-_]+/g, " "));
  const prettyStatus = (s) =>
    toStatusKey(s)
      .split(" ")
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
      .join(" ");

  /** -------------------- Badge helpers -------------------- */
  const statusClass = (s) => {
    const k = toStatusKey(s);
    if (!k) return "asg-pill asg-pill--neutral";
    if (["active", "completed", "done"].includes(k)) return "asg-pill asg-pill--green";
    if (["upcoming", "pending", "in progress"].includes(k)) return "asg-pill asg-pill--amber";
    if (["blocked", "cancelled", "failed"].includes(k)) return "asg-pill asg-pill--red";
    return "asg-pill asg-pill--gray";
  };

  // Supports letters (A+, A, B, C, D, F), words ("Pass", "Fail"), or numeric (0–100)
  const gradeClass = (val) => {
    const raw = String(val ?? "").trim();
    if (!raw) return "asg-pill asg-pill--gray";
    const up = raw.toUpperCase();

    // Numeric grade
    const num = Number(raw);
    if (!Number.isNaN(num)) {
      if (num >= 85) return "asg-pill asg-pill--green";
      if (num >= 70) return "asg-pill asg-pill--amber";
      if (num >= 50) return "asg-pill asg-pill--orange";
      return "asg-pill asg-pill--red";
    }

    // Letter / word grade
    if (["A+", "A", "EXCELLENT"].includes(up)) return "asg-pill asg-pill--green";
    if (["A-", "B+", "B", "GOOD"].includes(up)) return "asg-pill asg-pill--amber";
    if (["B-", "C+", "C", "AVERAGE"].includes(up)) return "asg-pill asg-pill--orange";
    if (["C-", "D", "E", "F", "FAIL", "POOR"].includes(up)) return "asg-pill asg-pill--red";
    if (["PASS", "OK"].includes(up)) return "asg-pill asg-pill--amber";
    return "asg-pill asg-pill--gray";
  };

  /** -------------------- Data Fetchers -------------------- */
  async function fetchAll() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/assignments`, { cache: "no-store" });
      const text = await res.text();
      if (!res.ok) throw new Error(`API ${res.status}: ${text}`);
      const data = JSON.parse(text);
      if (!Array.isArray(data)) throw new Error("API returned non-array JSON.");
      setRows(data);
      setAllRows(data);
    } catch (e) {
      console.error(e);
      setError(String(e.message || e));
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSearch() {
    // If both are empty -> show all
    if (!query.trim() && !status) {
      fetchAll();
      return;
    }

    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (status) params.set("status", toStatusKey(status)); // normalized status value

      const res = await fetch(`${API_BASE}/api/assignments/search?${params.toString()}`, {
        cache: "no-store",
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`API ${res.status}: ${text}`);
      const data = JSON.parse(text);
      if (!Array.isArray(data)) throw new Error("Search returned non-array JSON.");
      setRows(data);
    } catch (e) {
      console.error(e);
      // Client-side fallback across all string fields + status
      const needle = query.toLowerCase().trim();
      const guess = (allRows || []).filter((r) => {
        const matchesQ =
          !needle ||
          Object.values(r).some((v) => String(v ?? "").toLowerCase().includes(needle));
        const matchesStatus = !status || toStatusKey(r.status) === toStatusKey(status);
        return matchesQ && matchesStatus;
      });
      setRows(guess);
      setError(`Server search failed; showing client-side matches (${guess.length}).`);
    } finally {
      setLoading(false);
    }
  }

  /** -------------------- Effects -------------------- */
  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-run search when status changes
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    fetchSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  /** -------------------- Derived UI Data -------------------- */
  const statusOptions = useMemo(() => {
    const seen = new Map(); // key -> label
    for (const r of allRows || []) {
      const raw = (r?.status ?? "").toString().trim();
      if (!raw) continue;
      const key = toStatusKey(raw);
      if (!seen.has(key)) seen.set(key, prettyStatus(raw));
    }
    return [{ value: "", label: "All statuses" }, ...[...seen].map(([value, label]) => ({ value, label }))];
  }, [allRows]);

  /** -------------------- Render -------------------- */
  return (
    <div className="assign-page">
      <h2 className="assign-title">Assignment Tracker</h2>

      {/* Toolbar */}
      <div className="assign-toolbar">
        <input
          className="input"
          placeholder="Search across all columns…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchSearch()}
        />

        <select
          className="select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchSearch()}
          aria-label="Filter by status"
        >
          {statusOptions.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={fetchSearch} disabled={loading}>
          {loading ? "Searching…" : "Search"}
        </button>

        <button
          className="btn btn-ghost"
          onClick={() => {
            setQuery("");
            setStatus("");
            setError("");
            fetchAll();
          }}
          disabled={loading}
        >
          Reset
        </button>
      </div>

      {loading && <p className="muted">Loading…</p>}
      {!loading && error && <p className="warn">{error}</p>}
      {!loading && !error && rows.length === 0 && <p className="muted">No rows found.</p>}

      {!loading && rows.length > 0 && (
        <div className="assign-table">
          {/* Sticky column header (visually matches your screenshot’s top row) */}
          <div className="assign-head row-grid">
            <div className="head-cell hc-project">Project</div>
            <div className="head-cell hc-milestone">Milestone</div>
            <div className="head-cell hc-assignee">Assignee</div>
            <div className="head-cell hc-due">Due Date</div>
            <div className="head-cell hc-time">Time</div>
            <div className="head-cell hc-status">Status</div>
            <div className="head-cell hc-grade">Grade</div>
            <div className="head-cell hc-team">Team</div>
            <div className="head-cell hc-actions">Actions</div>
          </div>

          {/* Card rows */}
          {rows.map((r, i) => (
            <div className="assign-row row-grid" key={i}>
              <div className="cell project">
                <div className="proj-id">{r.project_id || "—"}</div>
                <div className="proj-name">{r.project_name || "Untitled Project"}</div>
              </div>

              <div className="cell milestone">{r.milestone_part || "—"}</div>
              <div className="cell assignee">{r.assignee || "—"}</div>
              <div className="cell due">{r.due_date || "—"}</div>
              <div className="cell time">{r.time || "—"}</div>

              <div className="cell status">
                <span className={statusClass(r.status)}>{prettyStatus(r.status || "—")}</span>
              </div>

              <div className="cell grade">
                <span className={gradeClass(r.grade)}>{String(r.grade ?? "—")}</span>
              </div>

              <div className="cell team">{r.team_id || "—"}</div>

              <div className="cell actions">
                              <Link
  to={`/student/${encodeURIComponent(r.assignee)}/project/${encodeURIComponent(r.project_name)}`}
> <button className="btn btn-ghost sm" onClick={() => console.log("View", r)}>View</button></Link>
 
<button className="btn btn-ghost sm" onClick={() => console.log("Assign", r)}>Assign</button>
                <button className="btn btn-ghost sm danger" onClick={() => console.log("Delete", r)}>Delete</button>
              </div>
            </div>
          ))}

          <p className="muted count">
            Showing {rows.length}
            {allRows.length ? ` of ${allRows.length}` : ""} rows
          </p>
        </div>
      )}
    </div>
  );
}
