import React from "react";
import "./batch.css";
import { Link } from "react-router-dom";

const statusClass = (status = "") => {
  const v = status.toLowerCase();
  if (v === "active") return "status-active";
  if (v === "upcoming") return "status-upcoming";
  if (v === "completed") return "status-completed";
  if (v === "cancelled") return "status-cancelled";
  return "";
};

export default function BatchCard({ data }) {
  return (
    <div className={`batch-list-box ${data.batchClass}`}>
      {/* Batch ID + Name */}
      <div className="batch-meta">
        <div className="batch-id">
          <span>ID</span>
          {data.batchId}
        </div>
        <div className="batch-name">{data.batchName}</div>
        <div className="batch-date">
          {data.batchStartDate} → {data.batchEndDate}
        </div>
      </div>

      {/* Duration */}
      <div className="batch-duration">
        <span>◷</span> {data.batchDuration}
      </div>

      {/* Timing */}
      <div className="time">
        {data.batchStartTime}
        <span>{data.batchEndTime}</span>
      </div>

      {/* Participants */}
      <div className="batch-participants">
        {data.batchParticipants}/{data.totalSeats}
      </div>

      {/* Price */}
      <div className="batch-price">₹{data.price}</div>

      {/* Status pill */}
      <div className="batch-stat">
        <span className={`batch-status-pill ${statusClass(data.batchStatus)}`}>
          {data.batchStatus}
        </span>
      </div>

      {/* Actions */}
      <div className="batch-actions">
        <Link
          to={`/BatchInfo/${encodeURIComponent(data.batchId)}`}
          state={{ batch: data }}
        >
          <button
            className={`batch-action-btn ${data.batchClass}-btn`}
            aria-label={`View ${data.batchName}`}
          >
            View
          </button>
        </Link>

        <button className={`batch-action-btn ${data.batchClass}-btn`}>Edit</button>
        <button className={`batch-action-btn ${data.batchClass}-btn`}>Delete</button>
      </div>
    </div>
  );
}
