import React from "react";
import { Link, useLocation,} from "react-router-dom";
import "./batchInfo.css";
import StudentCard from "./StudentCard";
import SideBarAd from "./sideBarAd";
// If you keep batches in context, uncomment this and hook up the fallback:
// import { useBatch } from "./batchContext";

export default function BatchInfo() {
  const { state } = useLocation();
  // const { id } = useParams();

  // 1) Preferred: data from Link state when coming from the card
  let batch = state?.batch;

  // 2) Optional fallback (direct URL refresh) – pull from context if you have it
  // const { batches = [] } = useBatch?.() ?? {};
  // if (!batch && id) batch = batches.find(b => String(b.batchId) === String(id));

  if (!batch) {
    return (
      <div className="bi-container">
        
        <div className="card bi-empty">
          <h1>Batch Information</h1>
          <p>No batch selected. Open this page via the <b>View</b> button on a batch card.</p>
          <Link to="/Batches" className="bi-back-btn">← Back to Batches</Link>
        </div>

      </div>
    );
  }

  const pct = Math.min(
    100,
    Math.round((Number(batch.batchParticipants) / Number(batch.totalSeats)) * 100)
  );

  return (
    <div className="bi-container">
      {/* Header */}
      <div className="bt-box">
      <header className="bi-header">
        <Link to="/Batches" className="bi-back">← Back</Link>
        <SideBarAd />

        <div className="bi-title">
          <h1>{batch.batchName}</h1>
          <span className={`bi-status ${batch.batchStatus?.toLowerCase()}`}>
            {batch.batchStatus}
          </span>
        </div>

        <div className="bi-sub">
          <span className="bi-id">ID {batch.batchId}</span>
          <span className="bi-dates">
            {batch.batchStartDate} → {batch.batchEndDate}
          </span>
        </div>
      </header>

      {/* Content grid */}
      <section className="bi-grid">
        <article className="card bi-card">
          <h3>Schedule</h3>
          <div className="bi-row">
            <div><span className="bi-label">Start</span><b>{batch.batchStartTime}</b></div>
            <div><span className="bi-label">End</span><b>{batch.batchEndTime}</b></div>
            <div><span className="bi-label">Duration</span><b>{batch.batchDuration}</b></div>
          </div>
        </article>

        <article className="card bi-card">
          <h3>Enrollment</h3>
          <div className="bi-progress-wrap">
            <div className="bi-progress">
              <div className="bi-progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="bi-progress-meta">
              <b>{batch.batchParticipants}</b>/<b>{batch.totalSeats}</b> seats
              <span className="bi-pct">{pct}% filled</span>
            </div>
          </div>
        </article>

        <article className="card bi-card">
          <h3>Pricing</h3>
          <div className="bi-price">₹{batch.price}</div>
          <div className="bi-actions">
            <button className="dash-btn">View Enrollments</button>
            <Link to={`/EditBatch/${batch.batchId}`} className="bi-outline-btn">
              Edit Batch
            </Link>
          </div>
        </article>
      </section>


      <StudentCard/>
    </div>
    </div>
  );
}
