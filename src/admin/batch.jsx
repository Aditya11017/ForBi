// Batch.jsx
import { useMemo, useState } from "react";
import "./batch.css";
import SideBarAd from "./sideBarAd";
import { batch } from "./batch";
import BatchCard from "./BatchCard";

const FILTERS = [
  { key: "All Batches", label: "Total", sub: "Batches", className: "" },
  { key: "Active Batches", label: "Active", sub: "Running", className: "ok" },
  { key: "Upcoming Batches", label: "Upcoming", sub: "Scheduled", className: "wait" },
  { key: "Completed Batches", label: "Completed", sub: "Closed", className: "done" },
  { key: "Cancelled Batches", label: "Cancelled", sub: "Stopped", className: "bad" },
];

export default function Batch() {
  const [selectedFilter, setSelectedFilter] = useState("All Batches");
  const [search, setSearch] = useState("");

  // Derived stats
  const stats = useMemo(() => {
    const total = batch.length;
    const active = batch.filter(
      (b) => (b.batchStatus || "").toLowerCase() === "active"
    ).length;
    const upcoming = batch.filter(
      (b) => (b.batchStatus || "").toLowerCase() === "upcoming"
    ).length;
    const completed = batch.filter(
      (b) => (b.batchStatus || "").toLowerCase() === "completed"
    ).length;
    const cancelled = batch.filter(
      (b) => (b.batchStatus || "").toLowerCase() === "cancelled"
    ).length;

    return { total, active, upcoming, completed, cancelled };
  }, []);

  // Filtering logic
  const filteredBatches = useMemo(() => {
    const byFilter = batch.filter((item) => {
      if (selectedFilter === "All Batches") return true;
      return (
        (item.batchStatus || "").toLowerCase() ===
        selectedFilter.replace(" Batches", "").toLowerCase()
      );
    });

    if (!search.trim()) return byFilter;

    const q = search.toLowerCase();
    return byFilter.filter((b) => {
      const id = String(b.batchId || "").toLowerCase();
      const name = String(b.batchName || "").toLowerCase();
      const course = String(b.course || "").toLowerCase();
      return id.includes(q) || name.includes(q) || course.includes(q);
    });
  }, [selectedFilter, search]);

  return (
    <div className="batch-container">
      <div className="batch-grid">
        <SideBarAd />

        <div className="batch-panel">
          {/* Toolbar */}
          <div className="batch-toolbar glass">
            <div className="toolbar-left">
              <div className="batch-search">
                <svg width="18" height="18" viewBox="0 0 24 24" className="i">
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search batch, id, or course…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="batch-date-chip">
                <span>From date – to date</span>
                <button aria-label="open date filter" className="chip-btn">⋯</button>
              </div>
            </div>

            <div className="toolbar-right">
              <button className="new-btn">+ New Batch</button>
            </div>
          </div>

          {/* summary cards act as filters */}
          <div className="batch-summary">
            <div
              className={`sum-card ${selectedFilter === "All Batches" ? "active" : ""}`}
              onClick={() => setSelectedFilter("All Batches")}
            >
              <h5 className="sum-sub">Total Batches</h5>
              <div className="sum-val">{stats.total}</div>
            </div>
            <div
              className={`sum-card ${selectedFilter === "Active Batches" ? "active" : ""}`}
              onClick={() => setSelectedFilter("Active Batches")}
            >
              <h5 className="sum-sub ok">Active Batches</h5>
              <div className="sum-val">{stats.active}</div>
            </div>
            <div
              className={`sum-card ${selectedFilter === "Upcoming Batches" ? "active" : ""}`}
              onClick={() => setSelectedFilter("Upcoming Batches")}
            >
              <h5  className="sum-sub wait">Upcoming Batches</h5>
              <div className="sum-val">{stats.upcoming}</div>
            </div>
            <div
              className={`sum-card ${selectedFilter === "Completed Batches" ? "active" : ""}`}
              onClick={() => setSelectedFilter("Completed Batches")}
            >
              <h5 className="sum-sub done">Completed Batches</h5>
              <div className="sum-val">{stats.completed}</div>
            </div>
            <div
              className={`sum-card ${selectedFilter === "Cancelled Batches" ? "active" : ""}`}
              onClick={() => setSelectedFilter("Cancelled Batches")}
            >
              <h5 className="sum-sub bad">Cancelled Batches</h5>
              <div className="sum-val">{stats.cancelled}</div>
            </div>
          </div>

          <h2 className="batch-title">Batch Management</h2>

          {/* sticky header */}
          {/* sticky header */}
<div className="batch-table-head">
  <span className="col-batch">Batch</span>
  <span className="col-duration">Duration</span>
  <span className="col-time">Time</span>
  <span className="col-seats">Seats</span>
  <span className="col-price">Price</span>
  <span className="col-status">Status</span>
  <span className="col-actions">Actions</span>
</div>


          {/* list */}
          <div className="batch-list-panel">
            {filteredBatches.length > 0 ? (
              filteredBatches.map((item) => (
                <BatchCard key={item.key || item.batchId} data={item} />
              ))
            ) : (
              <p className="empty-text">No batches found.</p>
            )}
          </div>

          {/* Footer / pagination */}
          <div className="batch-foot">
            <div className="page-dots">
              <button className="dot">1</button>
              <button className="dot active">2</button>
              <button className="dot">3</button>
              <button className="dot">4</button>
              <button className="dot">…</button>
              <button className="dot">24</button>
            </div>
            <div className="page-size">
              <span>•</span>
              <span>30 / page</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
