import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { studentData } from "./student.js";   // your data file
import "./studentCard.css";

function Avatar({ name, src }) {
  const initials = (name || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const safeSrc = src && src.trim() !== "" ? src : null;

  return (
    <div className="sc-avatar">
      {safeSrc ? <img src={safeSrc} alt={name} /> : <span>{initials}</span>}
    </div>
  );
}

function Status({ value = "" }) {
  const v = value.toLowerCase();
  const cls = v === "active" ? "sc-status active" : v === "inactive" ? "sc-status inactive" : "sc-status";
  return <span className={cls}>{value}</span>;
}

export default function StudentCard({ batchId: propBatchId }) {
  // Accept batch id via prop, route param (/BatchInfo/:id?), or navigation state
  const { id: paramId } = useParams();
  const state = useLocation().state;
  const batchId = propBatchId ?? state?.batchId ?? paramId;

  const rows = studentData.filter((s) => String(s.batch_id) === String(batchId));

  return (
    <section className="sc-wrap">
      <div className="sc-toolbar">
        <h3 className="sc-title">Students</h3>
        <div className="sc-meta">
          <span className="sc-badge">Batch ID {batchId || "—"}</span>
          <span className="sc-count">{rows.length} total</span>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="sc-empty card">
          <p>No students found for this batch.</p>
        </div>
      ) : (
        <>
          {/* Table head */}
          <div className="sc-table-head">
            <span>Student</span>
            <span className="col-type">Type</span>
            <span className="col-email">Email</span>
            <span className="col-phone">Phone</span>
            <span>Course</span>
            <span>Progress</span>
            <span>Status</span>
            <span className="col-actions">Actions</span>
          </div>

          {/* Rows */}
          <div className="sc-table">
            {rows.map((s) => (
              <div key={s.id} className="sc-row">
                {/* Student */}
                <div className="sc-cell sc-student">
                  <Avatar name={s.name} src={s.profilePicture} />
                  <div className="sc-student-meta">
                    <div className="sc-name">{s.name}</div>
                    
                    <div className="sc-sub">#{s.id} • Reg {s.registrationDate}</div>
                  </div>
                </div>
                <div className="sc-type">
                    <span className="sc-type-label">{s.type || "—"}</span>
                </div>
                {/* Email */}
                <div className="sc-cell col-email">{s.email || "—"}</div>

                {/* Phone */}
                <div className="sc-cell col-phone">{s.phone || "—"}</div>

                {/* Course */}
                <div className="sc-cell">{s.course}</div>

                {/* Progress */}
                <div className="sc-cell sc-progress-cell">
                  <div
                    className="sc-progress"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={s.progress}
                  >
                    <div className="sc-progress-fill" style={{ width: `${s.progress}%` }} />
                  </div>
                  <span className="sc-progress-label">{s.progress}%</span>
                </div>

                {/* Status */}
                <div className="sc-cell">
                  <Status value={s.status} />
                </div>

                {/* Actions */}
                <div className="sc-cell sc-actions col-actions">
                  <button className="sc-btn">View</button>
                  <button className="sc-btn ghost">Message</button>
                </div>

                {/* Mobile-only meta line */}
                <div className="sc-mobile-meta">
                  <span className="chip">{s.email || "—"}</span>
                  <span className="chip">{s.phone || "—"}</span>
                  <span className="chip">{s.type  || "—"}</span>

                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
