import React, { useCallback, useMemo, useState } from "react";
import "./subAdminDashboard.css";
import { batch as batchList } from "./batch.js";

/** Utils */
const clamp = (n, min, max) => Math.max(min, Math.min(n, max));
const statusBadge = (s) =>
  ({
    Active: "badge badge--active",
    Upcoming: "badge badge--upcoming",
    Cancelled: "badge badge--cancelled",
    completed: "badge badge--completed",
  }[s] || "badge");

const formatPct = (num) => `${clamp(Math.round(num), 0, 100)}%`;

export default function SubAdminDashboard({
  subAdminName = "Sub Admin",
  allowedBatchIds = [],
}) {
  /** -------------------- DATA REDUCTION -------------------- */
  const visibleBatches = useMemo(() => {
    const arr =
      Array.isArray(allowedBatchIds) && allowedBatchIds.length
        ? batchList.filter((b) => allowedBatchIds.includes(b.batchId))
        : batchList.slice();

    const order = { Active: 1, Upcoming: 2, completed: 3, Cancelled: 4 };
    return arr.sort((a, b) => (order[a.batchStatus] || 9) - (order[b.batchStatus] || 9));
  }, [allowedBatchIds]);

  // local state: sub-admin-added users only (indexed per batchId)
  const [usersByBatch, setUsersByBatch] = useState(() => ({}));
  const addedCountFor = useCallback(
    (batchId) => (usersByBatch[batchId]?.length || 0),
    [usersByBatch]
  );

  // ✅ useCallback so hooks-exhaustive-deps is satisfied where referenced
  const participantsFor = useCallback(
    (batch) => (Number(batch.batchParticipants) || 0) + addedCountFor(batch.batchId),
    [addedCountFor]
  );

  const seatsLeftFor = useCallback(
    (batch) => (Number(batch.totalSeats) || 0) - participantsFor(batch),
    [participantsFor]
  );

  const totals = useMemo(() => {
    const totalSeats = visibleBatches.reduce((s, b) => s + (b.totalSeats || 0), 0);
    const totalParticipants = visibleBatches.reduce((s, b) => s + participantsFor(b), 0);
    const totalLeft = totalSeats - totalParticipants;
    const active = visibleBatches.filter((b) => b.batchStatus === "Active").length;
    const upcoming = visibleBatches.filter((b) => b.batchStatus === "Upcoming").length;
    const cancelled = visibleBatches.filter((b) => b.batchStatus === "Cancelled").length;
    const completed = visibleBatches.filter((b) => b.batchStatus === "completed").length;
    const addedByMe = Object.values(usersByBatch).reduce((s, arr) => s + (arr?.length || 0), 0);

    return { totalSeats, totalParticipants, totalLeft, active, upcoming, cancelled, completed, addedByMe };
  }, [visibleBatches, usersByBatch, participantsFor]); // ✅ include participantsFor

  /** -------------------- UI STATE -------------------- */
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBatchId, setSelectedBatchId] = useState(visibleBatches[0]?.batchId || "");

  const filteredBatches = useMemo(() => {
    let list = visibleBatches;
    if (statusFilter !== "All") list = list.filter((b) => b.batchStatus === statusFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (b) => b.batchName.toLowerCase().includes(q) || b.batchId.toLowerCase().includes(q)
      );
    }
    return list;
  }, [visibleBatches, statusFilter, search]);

  /** -------------------- ADD USER FORM -------------------- */
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({
    username: "",
    teamname: "",
    name: "",
    email: "",
    password: "",
    batchId: visibleBatches[0]?.batchId || "",
  });

  const genPassword = () => {
    const rnd = Math.random().toString(36).slice(-8);
    setForm((f) => ({ ...f, password: `ForBI@${rnd}` }));
  };

  const resetForm = () =>
    setForm({
      username: "",
      teamname: "",
      name: "",
      email: "",
      password: "",
      batchId: selectedBatchId || visibleBatches[0]?.batchId || "",
    });

  const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const usernameAvailable = (batchId, username) =>
    !(usersByBatch[batchId] || []).some((u) => u.username.toLowerCase() === username.toLowerCase());

  const handleCreate = (e) => {
    e.preventDefault();
    const b = visibleBatches.find((x) => x.batchId === form.batchId);
    if (!b) return alert("Select a valid batch.");

    if (!form.username || !form.name || !form.email || !form.password)
      return alert("Please fill all required fields.");

    if (!emailOk(form.email)) return alert("Invalid email format.");
    if (!usernameAvailable(form.batchId, form.username)) return alert("Username is already used in this batch.");

    const seatsLeft = seatsLeftFor(b);
    if (seatsLeft <= 0) return alert("No seats left in this batch.");

    const newUser = {
      username: form.username.trim(),
      teamname: form.teamname.trim(),
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    setUsersByBatch((prev) => ({
      ...prev,
      [form.batchId]: [...(prev[form.batchId] || []), newUser],
    }));

    alert(`User '${newUser.username}' added to ${b.batchName}`);
    resetForm();
    setSelectedBatchId(b.batchId);
    setPage("manage");
  };

  /** -------------------- MANAGE USERS -------------------- */
  const batchUsers = usersByBatch[selectedBatchId] || [];

  const toggleUser = (idx) => {
    setUsersByBatch((prev) => {
      const arr = [...(prev[selectedBatchId] || [])];
      arr[idx] = { ...arr[idx], status: arr[idx].status === "active" ? "inactive" : "active" };
      return { ...prev, [selectedBatchId]: arr };
    });
  };

  const resetPwd = (idx) => {
    setUsersByBatch((prev) => {
      const arr = [...(prev[selectedBatchId] || [])];
      const rnd = Math.random().toString(36).slice(-8);
      arr[idx] = { ...arr[idx], password: `ForBI@${rnd}` };
      return { ...prev, [selectedBatchId]: arr };
    });
    alert("Password reset and stored (client-side demo).");
  };

  const removeUser = (idx) => {
    if (!confirm("Remove this user?")) return;
    setUsersByBatch((prev) => {
      const arr = [...(prev[selectedBatchId] || [])];
      arr.splice(idx, 1);
      return { ...prev, [selectedBatchId]: arr };
    });
  };

  /** -------------------- REPORTS -------------------- */
  const reportFor = (scopeBatchId) => {
    const scope = scopeBatchId ? visibleBatches.filter((b) => b.batchId === scopeBatchId) : visibleBatches;
    const total = scope.length;
    const seats = scope.reduce((s, b) => s + b.totalSeats, 0);
    const used = scope.reduce((s, b) => s + participantsFor(b), 0);
    const left = seats - used;
    const fill = seats ? (used / seats) * 100 : 0;
    const byStatus = scope.reduce(
      (acc, b) => ((acc[b.batchStatus] = (acc[b.batchStatus] || 0) + 1), acc),
      {}
    );
    return { total, seats, used, left, fill, byStatus };
  };

  const [reportBatchId, setReportBatchId] = useState("");

  /** -------------------- VIEW HELPERS -------------------- */
  const renderCard = (b) => {
    const used = participantsFor(b);
    const total = b.totalSeats || 0;
    const pct = total ? (used / total) * 100 : 0;

    return (
      <div key={b.batchId} className="batch-card glass">
        <div className="batch-card__head">
          <h3>{b.batchName}</h3>
          <span className={statusBadge(b.batchStatus)}>{b.batchStatus}</span>
        </div>
        <div className="batch-card__meta">
          <span>ID: {b.batchId}</span>
          <span>
            {b.batchStartDate} → {b.batchEndDate}
          </span>
          <span>
            {b.batchStartTime} – {b.batchEndTime}
          </span>
        </div>

        <div className="progress">
          <div className="progress__bar" style={{ width: `${pct}%` }} />
        </div>
        <div className="progress__legend">
          <span>Seats: {used}/{total}</span>
          <span>{formatPct(pct)}</span>
        </div>

        <div className="batch-card__actions">
          <button
            className="btn"
            onClick={() => {
              setForm((f) => ({ ...f, batchId: b.batchId }));
              setSelectedBatchId(b.batchId);
              setPage("add");
            }}
            disabled={seatsLeftFor(b) <= 0 || b.batchStatus === "Cancelled" || b.batchStatus === "completed"}
            title={
              seatsLeftFor(b) <= 0
                ? "No seats left"
                : b.batchStatus === "Cancelled" || b.batchStatus === "completed"
                ? "Cannot add to cancelled/completed"
                : "Add new user"
            }
          >
            Add User
          </button>

          <button
            className="btn btn--ghost"
            onClick={() => {
              setSelectedBatchId(b.batchId);
              setPage("manage");
            }}
          >
            Manage
          </button>

          <button
            className="btn btn--ghost"
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

  /** -------------------- RENDER -------------------- */
  return (
    <div className="sub-admin-d-container">
      <div className="sub-admin-d-box">
        <header className="sub-admin-header">
          <div>
            <h1>Sub Admin Dashboard</h1>
            <p>Welcome, <strong>{subAdminName}</strong>!</p>
          </div>

          <nav className="top-actions">
            <button className={`tab ${page === "home" ? "tab--active" : ""}`} onClick={() => setPage("home")}>
              Overview
            </button>
            <button className={`tab ${page === "add" ? "tab--active" : ""}`} onClick={() => setPage("add")}>
              Add User
            </button>
            <button className={`tab ${page === "manage" ? "tab--active" : ""}`} onClick={() => setPage("manage")}>
              Manage Users
            </button>
            <button className={`tab ${page === "reports" ? "tab--active" : ""}`} onClick={() => setPage("reports")}>
              Reports
            </button>
          </nav>
        </header>

        {/* Stats */}
        <section className="stats-grid">
          <div className="stat glass">
            <div className="stat__label">Active Batches</div>
            <div className="stat__value">{totals.active}</div>
          </div>
          <div className="stat glass">
            <div className="stat__label">Upcoming</div>
            <div className="stat__value">{totals.upcoming}</div>
          </div>
          <div className="stat glass">
            <div className="stat__label">Seats Remaining</div>
            <div className="stat__value">{totals.totalLeft}</div>
          </div>
          <div className="stat glass">
            <div className="stat__label">Users Added by You</div>
            <div className="stat__value">{totals.addedByMe}</div>
          </div>
        </section>

        {/* Routerless pages */}
        {page === "home" && (
          <>
            <section className="toolbar">
              <div className="filter-row">
                <input
                  className="input"
                  placeholder="Search by batch name or ID…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select
                  className="select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>Upcoming</option>
                  <option>Cancelled</option>
                  <option value="completed">completed</option>
                </select>
              </div>
            </section>

            <section className="grid">
              {filteredBatches.map((b) => renderCard(b))}
              {filteredBatches.length === 0 && <div className="empty glass">No batches match your filters.</div>}
            </section>
          </>
        )}

        {page === "add" && (
          <section className="panel glass">
            <h2>Add New User</h2>
            <form className="form" onSubmit={handleCreate}>
              <div className="form__row">
                <label>Username<span className="req">*</span></label>
                <input
                  className="input"
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="unique username"
                  required
                />
              </div>

              <div className="form__row">
                <label>Team Name</label>
                <input
                  className="input"
                  type="text"
                  value={form.teamname}
                  onChange={(e) => setForm({ ...form, teamname: e.target.value })}
                  placeholder="e.g., Alpha Team"
                />
              </div>

              <div className="form__row">
                <label>Name<span className="req">*</span></label>
                <input
                  className="input"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="form__row">
                <label>Email<span className="req">*</span></label>
                <input
                  className="input"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="form__row">
                <label>Password<span className="req">*</span></label>
                <div className="pwd">
                  <input
                    className="input"
                    type={showPwd ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Set a temporary password"
                    required
                  />
                  <button type="button" className="btn btn--ghost" onClick={() => setShowPwd((s) => !s)}>
                    {showPwd ? "Hide" : "Show"}
                  </button>
                  <button type="button" className="btn btn--ghost" onClick={genPassword}>
                    Generate
                  </button>
                </div>
              </div>

              <div className="form__row">
                <label>Register to Batch<span className="req">*</span></label>
                <select
                  className="select"
                  value={form.batchId}
                  onChange={(e) => setForm({ ...form, batchId: e.target.value })}
                  required
                >
                  {visibleBatches.map((b) => (
                    <option
                      key={b.batchId}
                      value={b.batchId}
                      disabled={seatsLeftFor(b) <= 0 || b.batchStatus === "Cancelled" || b.batchStatus === "completed"}
                    >
                      {b.batchName} ({b.batchId}) — seats left: {Math.max(0, seatsLeftFor(b))}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form__actions">
                <button type="submit" className="btn">Create</button>
                <button type="button" className="btn btn--ghost" onClick={() => setPage("home")}>
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {page === "manage" && (
          <section className="panel glass">
            <div className="panel__head">
              <h2>Manage Users</h2>
              <div className="panel__controls">
                <label className="label">Select Batch</label>
                <select
                  className="select"
                  value={selectedBatchId}
                  onChange={(e) => setSelectedBatchId(e.target.value)}
                >
                  {visibleBatches.map((b) => (
                    <option key={b.batchId} value={b.batchId}>
                      {b.batchName} ({b.batchId})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {batchUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="empty-cell">No users added for this batch.</td>
                    </tr>
                  )}
                  {batchUsers.map((u, i) => (
                    <tr key={`${u.username}-${i}`}>
                      <td>{u.username}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`pill ${u.status === "active" ? "pill--ok" : "pill--muted"}`}>
                          {u.status}
                        </span>
                      </td>
                      <td>{new Date(u.createdAt).toLocaleString()}</td>
                      <td className="table__actions">
                        <button className="btn btn--xs" onClick={() => toggleUser(i)}>
                          {u.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                        <button className="btn btn--xs btn--ghost" onClick={() => resetPwd(i)}>Reset Pwd</button>
                        <button className="btn btn--xs btn--danger" onClick={() => removeUser(i)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {page === "reports" && (
          <section className="panel glass">
            <div className="panel__head">
              <h2>Reports</h2>
              <div className="panel__controls">
                <label className="label">Scope</label>
                <select
                  className="select"
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
                  <div className="stats-grid">
                    <div className="stat glass">
                      <div className="stat__label">Batches</div>
                      <div className="stat__value">{R.total}</div>
                    </div>
                    <div className="stat glass">
                      <div className="stat__label">Seats</div>
                      <div className="stat__value">{R.seats}</div>
                    </div>
                    <div className="stat glass">
                      <div className="stat__label">Used</div>
                      <div className="stat__value">{R.used}</div>
                    </div>
                    <div className="stat glass">
                      <div className="stat__label">Remaining</div>
                      <div className="stat__value">{R.left}</div>
                    </div>
                  </div>

                  <div className="reportbar">
                    <div className="reportbar__label">
                      Fill Rate <strong>{formatPct(R.fill)}</strong>
                    </div>
                    <div className="reportbar__track">
                      <div className="reportbar__fill" style={{ width: `${R.fill}%` }} />
                    </div>
                  </div>

                  <div className="status-break glass">
                    <h3>Status Breakdown</h3>
                    <ul>
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
