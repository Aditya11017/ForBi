import React, { useMemo, useState } from "react";
import "./admin.css";
import SideBarAd from "./sideBarAd";
import { batch as batchList } from "./batch.js";

/* ---------- utils ---------- */
const toInt = (n) => (Number.isFinite(+n) ? +n : 0);
const seatsLeft = (b) => Math.max(0, toInt(b.totalSeats) - toInt(b.batchParticipants));

const STATUS = ["Active", "Upcoming", "Completed", "Cancelled"];
const badgeClass = (s) =>
  ({
    Active: "status-badge status-badge--active",
    Upcoming: "status-badge status-badge--upcoming",
    Completed: "status-badge status-badge--completed",
    Cancelled: "status-badge status-badge--cancelled",
  }[s] || "status-badge");

const isValidUrl = (str) => {
  try {
    const u = new URL(str);
    return ["http:", "https:"].includes(u.protocol);
  } catch {
    return false;
  }
};

const downloadCSV = (rows, filename = "report.csv") => {
  const csv = rows.map((r) =>
    r.map((v) => {
      const s = String(v ?? "");
      return s.includes(",") || s.includes("\n") || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(",")
  ).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

/* ---------- component ---------- */
export default function Admin() {
  // Enrich batches with link/passcode fields for link mgmt (local only)
  const [batches, setBatches] = useState(
    batchList.map((b) => ({ ...b, meetingLink: b.meetingLink || "", passcode: b.passcode || "" }))
  );

  const [statusFilter, setStatusFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState(null); // inline message bar

  const summary = useMemo(() => {
    const total = batches.length;
    const active = batches.filter((b) => b.batchStatus === "Active").length;
    const seatsAvail = batches.reduce((acc, b) => acc + seatsLeft(b), 0);
    return { total, active, seatsAvail };
  }, [batches]);

  const filtered = useMemo(() => {
    return batches.filter((b) => {
      const f1 = statusFilter === "All" || b.batchStatus === statusFilter;
      const q = query.trim().toLowerCase();
      const f2 =
        !q ||
        [b.batchId, b.batchName, b.batchPlan, b.batchClass]
          .filter(Boolean)
          .some((s) => String(s).toLowerCase().includes(q));
      return f1 && f2;
    });
  }, [batches, statusFilter, query]);

  const setBatchStatus = (batchId, newStatus) => {
    setBatches((prev) =>
      prev.map((b) => (b.batchId === batchId ? { ...b, batchStatus: newStatus } : b))
    );
    setNotice({ type: "ok", text: `Status updated to "${newStatus}" for ${batchId}.` });
  };

  const toggleSubAdmin = (batchId) => {
    setBatches((prev) =>
      prev.map((b) =>
        b.batchId === batchId
          ? { ...b, subAdminStatus: b.subAdminStatus === "enabled" ? "disabled" : "enabled" }
          : b
      )
    );
  };

  const saveMeeting = (batchId) => {
    const b = batches.find((x) => x.batchId === batchId);
    if (!b) return;
    if (b.meetingLink && !isValidUrl(b.meetingLink)) {
      setNotice({ type: "warn", text: "Invalid URL. Please enter a valid http(s) link." });
      return;
    }
    // TODO: call your API here to persist (meetingLink, passcode)
    setNotice({ type: "ok", text: `Meeting details saved for ${batchId}.` });
  };

  const copyToClipboard = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      setNotice({ type: "ok", text: "Copied to clipboard." });
    } catch {
      setNotice({ type: "warn", text: "Copy failed. Your browser may block clipboard API." });
    }
  };

  /* ---------- reports (CSV) ---------- */
  const exportBatchReport = () => {
    const header = [
      "Batch ID",
      "Batch Name",
      "Start Date",
      "End Date",
      "Time",
      "Seats Used",
      "Seats Total",
      "Seats Left",
      "Status",
      "SubAdmin Status",
      "Plan",
      "Class",
      "MRP",
      "Price",
      "Meeting Link",
      "Passcode",
    ];
    const rows = batches.map((b) => [
      b.batchId,
      b.batchName,
      b.batchStartDate,
      b.batchEndDate,
      `${b.batchStartTime || ""}–${b.batchEndTime || ""}`,
      b.batchParticipants,
      b.totalSeats,
      seatsLeft(b),
      b.batchStatus,
      b.subAdminStatus,
      b.batchPlan,
      b.batchClass,
      b.mrp,
      b.price,
      b.meetingLink || "",
      b.passcode || "",
    ]);
    downloadCSV([header, ...rows], "batch_report.csv");
  };

  const exportStudentReport = () => {
    const header = ["Batch ID", "Batch Name", "Enrolled", "Seats Total", "Seats Left", "Status"];
    const rows = batches.map((b) => [
      b.batchId,
      b.batchName,
      b.batchParticipants,
      b.totalSeats,
      seatsLeft(b),
      b.batchStatus,
    ]);
    downloadCSV([header, ...rows], "student_status_report.csv");
  };

  const exportSubAdminReport = () => {
    const header = ["Batch ID", "Batch Name", "SubAdmin Status", "Batch Status"];
    const rows = batches.map((b) => [b.batchId, b.batchName, b.subAdminStatus || "disabled", b.batchStatus]);
    downloadCSV([header, ...rows], "subadmin_status_report.csv");
  };

  const subAdminSummary = useMemo(() => {
    const enabled = batches.filter((b) => b.subAdminStatus === "enabled").length;
    const disabled = batches.filter((b) => b.subAdminStatus !== "enabled").length;
    return { enabled, disabled };
  }, [batches]);

  return (
    <div className="admin-container">
      <div className="admin-grid">
        <SideBarAd />

        <div className="admin-panel">
          <h1>Welcome, Admin Dashboard</h1>
          <h2>Admin Panel</h2>

          {/* flash notice */}
          {notice && (
            <div
              className={`notice-bar ${notice.type === "ok" ? "notice-bar--ok" : "notice-bar--warn"}`}
              onAnimationEnd={() => setNotice(null)}
            >
              {notice.text}
            </div>
          )}

          {/* top summary tiles */}
          <div className="batch-info-panel glass-card">
            <div className="active-batch-box">
              Active Batches
              <span className="active-batch-count">{summary.active}</span>
              <button
                className="dash-btn"
                onClick={() => setStatusFilter("Active")}
                aria-label="View Active Batches"
              >
                View Active Batches
              </button>
            </div>
            <div className="batch-box glass-card">
              Total Batches Currently available
              <span className="batch-count">{summary.total}</span>
              <button className="dash-btn" onClick={() => setStatusFilter("All")}>
                View Batches
              </button>
            </div>
            <div className="seats-box glass-card">
              Total Seats Available
              <span className="seats-count">{summary.seatsAvail}</span>
              <button className="dash-btn" onClick={exportBatchReport}>
                Export Report
              </button>
            </div>
          </div>

          {/* Sections */}
          <div className="admin-sections-grid">
            {/* 1) Batch Status & Management */}
            <section className="section-card glass-card">
              <div className="section-head">
                <h3>Batch Status & Management</h3>
                <div className="section-controls">
                  <select
                    className="ui-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filter by status"
                  >
                    <option>All</option>
                    {STATUS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <input
                    className="ui-input"
                    placeholder="Search by ID, name, plan, class…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button className="btn btn--ghost" onClick={exportBatchReport}>
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="table-wrap">
                <table className="ui-table">
                  <thead>
                    <tr>
                      <th>Batch</th>
                      <th>Schedule</th>
                      <th>Seats</th>
                      <th>Status</th>
                      <th>Sub-Admin</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((b) => (
                      <tr key={b.batchId}>
                        <td>
                          <div className="cell-leading">
                            <div className="cell-title">{b.batchName}</div>
                            <div className="cell-sub">
                              {b.batchId} · {b.batchPlan} · <span className="mono">{b.batchClass}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="cell-sub">
                            {b.batchStartDate} → {b.batchEndDate}
                          </div>
                          <div className="cell-sub">
                            {(b.batchStartTime || "").trim()} – {(b.batchEndTime || "").trim()}
                          </div>
                        </td>
                        <td>
                          <div className="cell-strong">
                            {b.batchParticipants}/{b.totalSeats}
                          </div>
                          <div className="cell-sub">{seatsLeft(b)} left</div>
                        </td>
                        <td>
                          <span className={badgeClass(b.batchStatus)}>{b.batchStatus}</span>
                        </td>
                        <td>
                          <span
                            className={
                              b.subAdminStatus === "enabled"
                                ? "status-chip status-chip--ok"
                                : "status-chip status-chip--dim"
                            }
                          >
                            {b.subAdminStatus === "enabled" ? "enabled" : "disabled"}
                          </span>
                        </td>
                        <td className="row-actions">
                          <div className="btn-group">
                            <button className="btn btn--ghost" onClick={() => setBatchStatus(b.batchId, "Active")}>
                              Set Active
                            </button>
                            <button className="btn btn--ghost" onClick={() => setBatchStatus(b.batchId, "Upcoming")}>
                              Upcoming
                            </button>
                            <button className="btn btn--ghost" onClick={() => setBatchStatus(b.batchId, "Completed")}>
                              Complete
                            </button>
                            <button className="btn btn--danger" onClick={() => setBatchStatus(b.batchId, "Cancelled")}>
                              Cancel
                            </button>
                            <button className="btn btn--ghost" onClick={() => toggleSubAdmin(b.batchId)}>
                              {b.subAdminStatus === "enabled" ? "Disable SubAdmin" : "Enable SubAdmin"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={6} className="empty-row">
                          No batches match your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 2) Online Batch Link Management */}
            <section className="section-card glass-card">
              <div className="section-head">
                <h3>Online Batch Link Management</h3>
                <div className="section-controls">
                  <button className="btn btn--ghost" onClick={exportBatchReport}>
                    Export Links CSV
                  </button>
                </div>
              </div>

              <div className="table-wrap">
                <table className="ui-table">
                  <thead>
                    <tr>
                      <th>Batch</th>
                      <th>Meeting URL</th>
                      <th>Passcode</th>
                      <th>Quick</th>
                      <th>Save</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map((b) => (
                      <tr key={`link-${b.batchId}`}>
                        <td>
                          <div className="cell-leading">
                            <div className="cell-title">{b.batchName}</div>
                            <div className="cell-sub">{b.batchId}</div>
                          </div>
                        </td>
                        <td>
                          <input
                            className="ui-input"
                            placeholder="https://…"
                            value={b.meetingLink}
                            onChange={(e) =>
                              setBatches((prev) =>
                                prev.map((x) =>
                                  x.batchId === b.batchId ? { ...x, meetingLink: e.target.value } : x
                                )
                              )
                            }
                          />
                        </td>
                        <td>
                          <input
                            className="ui-input"
                            placeholder="passcode"
                            value={b.passcode}
                            onChange={(e) =>
                              setBatches((prev) =>
                                prev.map((x) =>
                                  x.batchId === b.batchId ? { ...x, passcode: e.target.value } : x
                                )
                              )
                            }
                          />
                        </td>
                        <td className="row-actions">
                          <div className="btn-group">
                            <button
                              className="btn btn--ghost"
                              onClick={() => copyToClipboard(b.meetingLink || "")}
                              disabled={!b.meetingLink}
                              title="Copy meeting URL"
                            >
                              Copy URL
                            </button>
                            <button
                              className="btn btn--ghost"
                              onClick={() => copyToClipboard(b.passcode || "")}
                              disabled={!b.passcode}
                              title="Copy passcode"
                            >
                              Copy Code
                            </button>
                            {b.meetingLink ? (
                              <a className="btn btn--ghost" href={b.meetingLink} target="_blank" rel="noreferrer">
                                Open
                              </a>
                            ) : (
                              <button className="btn btn--ghost" disabled>
                                Open
                              </button>
                            )}
                          </div>
                        </td>
                        <td>
                          <button className="btn btn--primary" onClick={() => saveMeeting(b.batchId)}>
                            Save
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3) Student Status & Report */}
            <section className="section-card glass-card">
              <div className="section-head">
                <h3>Student Status</h3>
                <div className="section-controls">
                  <div className="mini-metrics">
                    <span className="mini-badge">
                      Enrolled:{" "}
                      {batches.reduce((acc, b) => acc + toInt(b.batchParticipants), 0)}
                    </span>
                    <span className="mini-badge">
                      Seats Left: {batches.reduce((acc, b) => acc + seatsLeft(b), 0)}
                    </span>
                  </div>
                  <button className="btn btn--ghost" onClick={exportStudentReport}>
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="table-wrap">
                <table className="ui-table">
                  <thead>
                    <tr>
                      <th>Batch</th>
                      <th>Enrolled</th>
                      <th>Total Seats</th>
                      <th>Left</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map((b) => (
                      <tr key={`std-${b.batchId}`}>
                        <td>
                          <div className="cell-leading">
                            <div className="cell-title">{b.batchName}</div>
                            <div className="cell-sub">{b.batchId}</div>
                          </div>
                        </td>
                        <td className="cell-strong">{b.batchParticipants}</td>
                        <td>{b.totalSeats}</td>
                        <td>{seatsLeft(b)}</td>
                        <td>
                          <span className={badgeClass(b.batchStatus)}>{b.batchStatus}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4) Sub-Admin Status & Report */}
            <section className="section-card glass-card">
              <div className="section-head">
                <h3>Sub-Admin Status</h3>
                <div className="section-controls">
                  <div className="mini-metrics">
                    <span className="mini-badge mini-badge--ok">Enabled: {subAdminSummary.enabled}</span>
                    <span className="mini-badge mini-badge--dim">Disabled: {subAdminSummary.disabled}</span>
                  </div>
                  <button className="btn btn--ghost" onClick={exportSubAdminReport}>
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="table-wrap">
                <table className="ui-table">
                  <thead>
                    <tr>
                      <th>Batch</th>
                      <th>Sub-Admin</th>
                      <th>Batch Status</th>
                      <th>Toggle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map((b) => (
                      <tr key={`sa-${b.batchId}`}>
                        <td>
                          <div className="cell-leading">
                            <div className="cell-title">{b.batchName}</div>
                            <div className="cell-sub">{b.batchId}</div>
                          </div>
                        </td>
                        <td>
                          <span
                            className={
                              b.subAdminStatus === "enabled"
                                ? "status-chip status-chip--ok"
                                : "status-chip status-chip--dim"
                            }
                          >
                            {b.subAdminStatus === "enabled" ? "enabled" : "disabled"}
                          </span>
                        </td>
                        <td>
                          <span className={badgeClass(b.batchStatus)}>{b.batchStatus}</span>
                        </td>
                        <td>
                          <button className="btn btn--primary" onClick={() => toggleSubAdmin(b.batchId)}>
                            {b.subAdminStatus === "enabled" ? "Disable" : "Enable"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
