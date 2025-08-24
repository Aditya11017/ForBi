// AdminUserPanel.jsx
import React, { useCallback, useMemo, useState } from "react";
import "./mangeUserPanel.css";
import { batch as batchList } from "./batch.js";
import { studentData as initialStudents } from "./student.js"; // ⬅️ adjust path/name if needed

/** ---------- Utils ---------- */
const clamp = (n, min, max) => Math.max(min, Math.min(n, max));
const pct = (num) => `${clamp(Math.round(num), 0, 100)}%`;
const byId = (arr, key = "batchId") =>
  Object.fromEntries(arr.map((x) => [x[key], x]));

const statusToBadgeClass = (s) =>
  ({
    Active: "umx-badge umx-badge--active",
    Upcoming: "umx-badge umx-badge--upcoming",
    Cancelled: "umx-badge umx-badge--cancelled",
    completed: "umx-badge umx-badge--completed",
  }[s] || "umx-badge");

function dmyToISO(dmy) {
  // expects "DD-MM-YYYY"
  if (!dmy) return "";
  const [d, m, y] = dmy.split("-").map((x) => parseInt(x, 10));
  if (!y || !m || !d) return "";
  const mm = String(m).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
}

/** ---------- Component ---------- */
export default function ManageUserPanel({
  adminName = "Admin",
  allowedBatchIds = [], // optional filter
}) {
  /** --------- Batches (visible) --------- */
  const visibleBatches = useMemo(() => {
    const rows =
      Array.isArray(allowedBatchIds) && allowedBatchIds.length
        ? batchList.filter((b) => allowedBatchIds.includes(b.batchId))
        : batchList.slice();

    const order = { Active: 1, Upcoming: 2, completed: 3, Cancelled: 4 };
    return rows.sort(
      (a, b) => (order[a.batchStatus] || 9) - (order[b.batchStatus] || 9)
    );
  }, [allowedBatchIds]);

  const batchMap = useMemo(() => byId(visibleBatches), [visibleBatches]);

  /** --------- Data: Students + SubAdmins --------- */
  const [students, setStudents] = useState(() =>
    initialStudents.map((s) => ({
      ...s,
      role: s.type === "Student" ? "Student" : s.type || "Student",
      status: s.status || "Active",
    }))
  );

  const [subAdmins, setSubAdmins] = useState(() => [
    // keep empty to start; example:
    // {
    //   id: "SA-001",
    //   name: "Team Lead",
    //   email: "lead@forbi.in",
    //   phone: "+91-9000000000",
    //   batch_id: visibleBatches[0]?.batchId || "",
    //   status: "Active",
    //   role: "SubAdmin",
    //   expiresOn: "",
    //   createdAt: new Date().toISOString(),
    //   password: "ForBI@12345",
    // },
  ]);

  /** Seats usage: count **students** per batch (admin can decide if subadmins consume seats; default: no) */
  const studentsByBatch = useMemo(() => {
    const m = {};
    for (const s of students) {
      if (!s.batch_id) continue;
      if (!m[s.batch_id]) m[s.batch_id] = [];
      m[s.batch_id].push(s);
    }
    return m;
  }, [students]);

  const usedSeatsFor = useCallback(
    (batch) => {
      const declared = Number(batch.batchParticipants) || 0; // pre-booked/declared
      const localStudents = (studentsByBatch[batch.batchId] || []).length;
      return declared + localStudents;
    },
    [studentsByBatch]
  );

  const seatsLeftFor = useCallback(
    (batch) => (Number(batch.totalSeats) || 0) - usedSeatsFor(batch),
    [usedSeatsFor]
  );

  /** --------- Stats --------- */
  const totals = useMemo(() => {
    const totalSeats = visibleBatches.reduce(
      (s, b) => s + (b.totalSeats || 0),
      0
    );
    const totalUsed = visibleBatches.reduce((s, b) => s + usedSeatsFor(b), 0);
    const totalLeft = totalSeats - totalUsed;

    const activeBatches = visibleBatches.filter(
      (b) => b.batchStatus === "Active"
    ).length;

    const totalStudents = students.length;
    const activeSubAdmins = subAdmins.filter((u) => u.status === "Active")
      .length;

    return {
      totalSeats,
      totalUsed,
      totalLeft,
      activeBatches,
      totalStudents,
      activeSubAdmins,
      fillRate: totalSeats ? (totalUsed / totalSeats) * 100 : 0,
    };
  }, [visibleBatches, students, subAdmins, usedSeatsFor]);

  /** --------- UI State --------- */
  const [page, setPage] = useState("overview");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [batchFilter, setBatchFilter] = useState("");

  const [selectedBatchId, setSelectedBatchId] = useState(
    visibleBatches[0]?.batchId || ""
  );

  /** --------- Filters --------- */
  const applyFilters = useCallback(
    (rows) => {
      let list = rows;
      if (batchFilter) list = list.filter((r) => r.batch_id === batchFilter);
      if (statusFilter !== "All")
        list = list.filter((r) => (r.status || "Active") === statusFilter);
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        list = list.filter(
          (r) =>
            (r.name || "").toLowerCase().includes(q) ||
            (r.email || "").toLowerCase().includes(q) ||
            (r.batch_id || "").toLowerCase().includes(q)
        );
      }
      return list;
    },
    [batchFilter, statusFilter, search]
  );

  const filteredStudents = useMemo(
    () => applyFilters(students),
    [students, applyFilters]
  );
  const filteredSubAdmins = useMemo(
    () => applyFilters(subAdmins),
    [subAdmins, applyFilters]
  );

  /** --------- Student actions --------- */
  const toggleStudent = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s
      )
    );
  };

  const removeStudent = (id) => {
    if (!window.confirm("Remove this student?")) return;
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const transferStudent = (id, toBatchId) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, batch_id: toBatchId } : s))
    );
  };

  /** --------- SubAdmin actions --------- */
  const [showPwd, setShowPwd] = useState(false);
  const [saForm, setSaForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    batch_id: visibleBatches[0]?.batchId || "",
    expiresOn: "", // YYYY-MM-DD
    status: "Active",
  });

  const genPassword = () => {
    const rnd = Math.random().toString(36).slice(-8);
    setSaForm((f) => ({ ...f, password: `ForBI@${rnd}` }));
  };

  const addSubAdmin = (e) => {
    e.preventDefault();
    if (!saForm.name || !saForm.email || !saForm.password) {
      alert("Please fill name, email and password.");
      return;
    }
    const newSA = {
      id: `SA-${Date.now()}`,
      role: "SubAdmin",
      createdAt: new Date().toISOString(),
      ...saForm,
    };
    setSubAdmins((prev) => [newSA, ...prev]);
    setSaForm({
      name: "",
      email: "",
      phone: "",
      password: "",
      batch_id: visibleBatches[0]?.batchId || "",
      expiresOn: "",
      status: "Active",
    });
    setPage("subadmins");
  };

  const toggleSubAdmin = (id) => {
    setSubAdmins((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u
      )
    );
  };

  const resetSaPwd = (id) => {
    const rnd = Math.random().toString(36).slice(-8);
    setSubAdmins((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, password: `ForBI@${rnd}` } : u
      )
    );
    alert("Sub Admin password has been reset (stored in state).");
  };

  const removeSubAdmin = (id) => {
    if (!window.confirm("Remove this sub admin?")) return;
    setSubAdmins((prev) => prev.filter((u) => u.id !== id));
  };

  /** --------- Reports helper --------- */
  const reportFor = (scopeBatchId) => {
    const scope = scopeBatchId
      ? visibleBatches.filter((b) => b.batchId === scopeBatchId)
      : visibleBatches;

    const total = scope.length;
    const seats = scope.reduce((s, b) => s + (b.totalSeats || 0), 0);
    const used = scope.reduce((s, b) => s + usedSeatsFor(b), 0);
    const left = seats - used;
    const fill = seats ? (used / seats) * 100 : 0;

    const byStatus = scope.reduce((acc, b) => {
      acc[b.batchStatus] = (acc[b.batchStatus] || 0) + 1;
      return acc;
    }, {});

    const studentsInScope = students.filter((st) =>
      scope.some((b) => b.batchId === st.batch_id)
    ).length;

    const subAdminsInScope = subAdmins.filter((sa) =>
      scope.some((b) => b.batchId === sa.batch_id)
    ).length;

    return { total, seats, used, left, fill, byStatus, studentsInScope, subAdminsInScope };
  };

  const [reportBatchId, setReportBatchId] = useState("");

  /** --------- Render helpers --------- */
  const renderBatchCard = (b) => {
    const used = usedSeatsFor(b);
    const total = b.totalSeats || 0;
    const p = total ? (used / total) * 100 : 0;

    return (
      <div key={b.batchId} className="umx-card umx-glass">
        <div className="umx-card__head">
          <h3 className="umx-card__title">{b.batchName}</h3>
          <span className={statusToBadgeClass(b.batchStatus)}>{b.batchStatus}</span>
        </div>

        <div className="umx-card__meta">
          <span className="umx-meta">ID: {b.batchId}</span>
          <span className="umx-meta">
            {b.batchStartDate} → {b.batchEndDate}
          </span>
          <span className="umx-meta">
            {b.batchStartTime} – {b.batchEndTime}
          </span>
        </div>

        <div className="umx-progress">
          <div className="umx-progress__bar" style={{ width: `${p}%` }} />
        </div>
        <div className="umx-progress__legend">
          <span>Seats: {used}/{total}</span>
          <span>{pct(p)}</span>
        </div>

        <div className="umx-card__actions">
          <button
            className="umx-btn"
            onClick={() => {
              setSelectedBatchId(b.batchId);
              setPage("students");
              setBatchFilter(b.batchId);
            }}
          >
            View Students
          </button>
          <button
            className="umx-btn umx-btn--ghost"
            onClick={() => {
              setSelectedBatchId(b.batchId);
              setPage("subadmins");
              setBatchFilter(b.batchId);
            }}
          >
            View Sub Admins
          </button>
          <button
            className="umx-btn umx-btn--ghost"
            onClick={() => {
              setReportBatchId(b.batchId);
              setPage("reports");
            }}
          >
            Reports
          </button>
        </div>
      </div>
    );
  };

  /** --------- JSX --------- */
  return (
    <div className="umx-container">
      <div className="umx-shell">
        <header className="umx-header">
          <div>
            <h1 className="umx-title">Admin → User Manager</h1>
            <p className="umx-subtitle">
              Howdy, <strong>{adminName}</strong>!
            </p>
          </div>

          <nav className="umx-tabs">
            <button
              className={`umx-tab ${page === "overview" ? "umx-tab--active" : ""}`}
              onClick={() => setPage("overview")}
            >
              Overview
            </button>
            <button
              className={`umx-tab ${page === "students" ? "umx-tab--active" : ""}`}
              onClick={() => setPage("students")}
            >
              Students
            </button>
            <button
              className={`umx-tab ${page === "subadmins" ? "umx-tab--active" : ""}`}
              onClick={() => setPage("subadmins")}
            >
              Sub Admins
            </button>
            <button
              className={`umx-tab ${page === "reports" ? "umx-tab--active" : ""}`}
              onClick={() => setPage("reports")}
            >
              Reports
            </button>
          </nav>
        </header>

        {/* ---- Stats ---- */}
        <section className="umx-stats">
          <div className="umx-stat umx-glass">
            <div className="umx-stat__label">Active Batches</div>
            <div className="umx-stat__value">{totals.activeBatches}</div>
          </div>
          <div className="umx-stat umx-glass">
            <div className="umx-stat__label">Total Students</div>
            <div className="umx-stat__value">{totals.totalStudents}</div>
          </div>
          <div className="umx-stat umx-glass">
            <div className="umx-stat__label">Active Sub Admins</div>
            <div className="umx-stat__value">{totals.activeSubAdmins}</div>
          </div>
          <div className="umx-stat umx-glass">
            <div className="umx-stat__label">Seats Remaining</div>
            <div className="umx-stat__value">{totals.totalLeft}</div>
          </div>
        </section>

        {/* ---- Overview ---- */}
        {page === "overview" && (
          <>
            <section className="umx-toolbar">
              <div className="umx-filter-row">
                <input
                  className="umx-input"
                  placeholder="Search name/email/batch…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select
                  className="umx-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Cancelled</option>
                  <option value="completed">completed</option>
                </select>
                <select
                  className="umx-select"
                  value={batchFilter}
                  onChange={(e) => setBatchFilter(e.target.value)}
                >
                  <option value="">All Batches</option>
                  {visibleBatches.map((b) => (
                    <option key={b.batchId} value={b.batchId}>
                      {b.batchName} ({b.batchId})
                    </option>
                  ))}
                </select>
              </div>
            </section>

            <section className="umx-grid">
              {visibleBatches.map((b) => renderBatchCard(b))}
              {visibleBatches.length === 0 && (
                <div className="umx-empty umx-glass">No batches available.</div>
              )}
            </section>
          </>
        )}

        {/* ---- Students ---- */}
        {page === "students" && (
          <section className="umx-panel umx-glass">
            <div className="umx-panel__head">
              <h2 className="umx-panel__title">Students</h2>
              <div className="umx-panel__controls">
                <label className="umx-label">Batch</label>
                <select
                  className="umx-select"
                  value={batchFilter}
                  onChange={(e) => setBatchFilter(e.target.value)}
                >
                  <option value="">All</option>
                  {visibleBatches.map((b) => (
                    <option key={b.batchId} value={b.batchId}>
                      {b.batchName} ({b.batchId})
                    </option>
                  ))}
                </select>
                <input
                  className="umx-input"
                  placeholder="Search…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select
                  className="umx-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="umx-tablewrap">
              <table className="umx-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Batch</th>
                    <th>Status</th>
                    <th>Progress</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={6} className="umx-emptycell">
                        No students match your filters.
                      </td>
                    </tr>
                  )}
                  {filteredStudents.map((s) => (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.email || "—"}</td>
                      <td>{s.batch_id || "—"}</td>
                      <td>
                        <span
                          className={`umx-pill ${
                            s.status === "Active" ? "umx-pill--ok" : "umx-pill--muted"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td>{s.progress != null ? `${s.progress}%` : "—"}</td>
                      <td className="umx-actions">
                        <button
                          className="umx-btn umx-btn--xs"
                          onClick={() => toggleStudent(s.id)}
                        >
                          {s.status === "Active" ? "Deactivate" : "Activate"}
                        </button>

                        <div className="umx-inline">
                          <label className="umx-sublabel">Transfer:</label>
                          <select
                            className="umx-select umx-select--xs"
                            value={s.batch_id || ""}
                            onChange={(e) => transferStudent(s.id, e.target.value)}
                          >
                            <option value="">—</option>
                            {visibleBatches.map((b) => (
                              <option key={b.batchId} value={b.batchId}>
                                {b.batchName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          className="umx-btn umx-btn--xs umx-btn--danger"
                          onClick={() => removeStudent(s.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ---- Sub Admins ---- */}
        {page === "subadmins" && (
          <section className="umx-panel umx-glass">
            <div className="umx-panel__head">
              <h2 className="umx-panel__title">Sub Admins</h2>
              <div className="umx-panel__controls">
                <label className="umx-label">Batch</label>
                <select
                  className="umx-select"
                  value={batchFilter}
                  onChange={(e) => setBatchFilter(e.target.value)}
                >
                  <option value="">All</option>
                  {visibleBatches.map((b) => (
                    <option key={b.batchId} value={b.batchId}>
                      {b.batchName} ({b.batchId})
                    </option>
                  ))}
                </select>
                <input
                  className="umx-input"
                  placeholder="Search…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select
                  className="umx-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            {/* Add SubAdmin */}
            <details className="umx-accordion" open>
              <summary className="umx-accordion__sum">Add Sub Admin</summary>
              <form className="umx-form" onSubmit={addSubAdmin}>
                <div className="umx-form__row">
                  <label className="umx-label">Name<span className="umx-req">*</span></label>
                  <input
                    className="umx-input"
                    value={saForm.name}
                    onChange={(e) => setSaForm({ ...saForm, name: e.target.value })}
                    placeholder="Full name"
                    required
                  />
                </div>

                <div className="umx-form__row">
                  <label className="umx-label">Email<span className="umx-req">*</span></label>
                  <input
                    className="umx-input"
                    type="email"
                    value={saForm.email}
                    onChange={(e) => setSaForm({ ...saForm, email: e.target.value })}
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="umx-form__row">
                  <label className="umx-label">Phone</label>
                  <input
                    className="umx-input"
                    value={saForm.phone}
                    onChange={(e) => setSaForm({ ...saForm, phone: e.target.value })}
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>

                <div className="umx-form__row">
                  <label className="umx-label">Password<span className="umx-req">*</span></label>
                  <div className="umx-pwd">
                    <input
                      className="umx-input"
                      type={showPwd ? "text" : "password"}
                      value={saForm.password}
                      onChange={(e) => setSaForm({ ...saForm, password: e.target.value })}
                      placeholder="Temp password"
                      required
                    />
                    <button type="button" className="umx-btn umx-btn--ghost" onClick={() => setShowPwd((s) => !s)}>
                      {showPwd ? "Hide" : "Show"}
                    </button>
                    <button type="button" className="umx-btn umx-btn--ghost" onClick={genPassword}>
                      Generate
                    </button>
                  </div>
                </div>

                <div className="umx-form__row">
                  <label className="umx-label">Assign to Batch</label>
                  <select
                    className="umx-select"
                    value={saForm.batch_id}
                    onChange={(e) => {
                      const b = batchMap[e.target.value];
                      const minISO = b ? dmyToISO(b.batchEndDate) : "";
                      setSaForm((f) => ({
                        ...f,
                        batch_id: e.target.value,
                        // if expiry set, ensure it respects min
                        expiresOn:
                          f.expiresOn && minISO && f.expiresOn < minISO ? minISO : f.expiresOn,
                      }));
                    }}
                  >
                    {visibleBatches.map((b) => (
                      <option key={b.batchId} value={b.batchId}>
                        {b.batchName} ({b.batchId})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="umx-form__row">
                  <label className="umx-label">Expiry (≥ batch end)</label>
                  <input
                    className="umx-input"
                    type="date"
                    min={saForm.batch_id ? dmyToISO(batchMap[saForm.batch_id]?.batchEndDate) : undefined}
                    value={saForm.expiresOn}
                    onChange={(e) => setSaForm({ ...saForm, expiresOn: e.target.value })}
                  />
                </div>

                <div className="umx-form__actions">
                  <button type="submit" className="umx-btn">Create</button>
                  <button type="button" className="umx-btn umx-btn--ghost" onClick={() => setPage("overview")}>
                    Cancel
                  </button>
                </div>
              </form>
            </details>

            <div className="umx-tablewrap">
              <table className="umx-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Batch</th>
                    <th>Status</th>
                    <th>Expiry</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubAdmins.length === 0 && (
                    <tr>
                      <td colSpan={6} className="umx-emptycell">
                        No sub admins match your filters.
                      </td>
                    </tr>
                  )}
                  {filteredSubAdmins.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.batch_id || "—"}</td>
                      <td>
                        <span
                          className={`umx-pill ${
                            u.status === "Active" ? "umx-pill--ok" : "umx-pill--muted"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td>{u.expiresOn || "—"}</td>
                      <td className="umx-actions">
                        <button
                          className="umx-btn umx-btn--xs"
                          onClick={() => toggleSubAdmin(u.id)}
                        >
                          {u.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          className="umx-btn umx-btn--xs umx-btn--ghost"
                          onClick={() => resetSaPwd(u.id)}
                        >
                          Reset Pwd
                        </button>
                        <button
                          className="umx-btn umx-btn--xs umx-btn--danger"
                          onClick={() => removeSubAdmin(u.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ---- Reports ---- */}
        {page === "reports" && (
          <section className="umx-panel umx-glass">
            <div className="umx-panel__head">
              <h2 className="umx-panel__title">Reports</h2>
              <div className="umx-panel__controls">
                <label className="umx-label">Scope</label>
                <select
                  className="umx-select"
                  value={reportBatchId}
                  onChange={(e) => setReportBatchId(e.target.value)}
                >
                  <option value="">All Visible Batches</option>
                  {visibleBatches.map((b) => (
                    <option key={b.batchId} value={b.batchId}>
                      {b.batchName} ({b.batchId})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(() => {
              const R = reportFor(reportBatchId || null);
              return (
                <>
                  <div className="umx-stats">
                    <div className="umx-stat umx-glass">
                      <div className="umx-stat__label">Batches</div>
                      <div className="umx-stat__value">{R.total}</div>
                    </div>
                    <div className="umx-stat umx-glass">
                      <div className="umx-stat__label">Seats</div>
                      <div className="umx-stat__value">{R.seats}</div>
                    </div>
                    <div className="umx-stat umx-glass">
                      <div className="umx-stat__label">Used</div>
                      <div className="umx-stat__value">{R.used}</div>
                    </div>
                    <div className="umx-stat umx-glass">
                      <div className="umx-stat__label">Remaining</div>
                      <div className="umx-stat__value">{R.left}</div>
                    </div>
                    <div className="umx-stat umx-glass">
                      <div className="umx-stat__label">Students</div>
                      <div className="umx-stat__value">{R.studentsInScope}</div>
                    </div>
                    <div className="umx-stat umx-glass">
                      <div className="umx-stat__label">Sub Admins</div>
                      <div className="umx-stat__value">{R.subAdminsInScope}</div>
                    </div>
                  </div>

                  <div className="umx-reportbar">
                    <div className="umx-reportbar__label">
                      Fill Rate <strong>{pct(R.fill)}</strong>
                    </div>
                    <div className="umx-reportbar__track">
                      <div className="umx-reportbar__fill" style={{ width: `${R.fill}%` }} />
                    </div>
                  </div>

                  <div className="umx-statusbreak umx-glass">
                    <h3 className="umx-h3">Status Breakdown</h3>
                    <ul className="umx-list">
                      <li>Active: {R.byStatus.Active || 0}</li>
                      <li>Upcoming: {R.byStatus.Upcoming || 0}</li>
                      <li>Cancelled: {R.byStatus.Cancelled || 0}</li>
                      <li>Completed: {R.byStatus.completed || 0}</li>
                    </ul>
                  </div>
                </>
              );
            })()}
          </section>
        )}
      </div>
    </div>
  );
}
