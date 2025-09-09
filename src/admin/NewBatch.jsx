// NewBatch.jsx
import React, { useMemo, useState } from "react";
import { batch as batchList } from "./batch.js";
import DatePicker from "/src/components/DatePicker.jsx";
import "./newBatch.css";
import SideBarAd from "./sideBarAd.jsx";

/** -------------------- CONSTANTS -------------------- */
const BATCH_TYPES = ["Individual", "Team", "Enterprise", "Educational"];
const BATCH_CLASSES = ["Core", "Specialist"];
const CORE_GROUPS = ["Core", "Advanced", "Proficient", "CoreComplete"];
const SPECIALIST_GROUPS = ["Technician", "Master", "Expert", "SepclistComplete"];
const BATCH_INFO = ["Microsoft Excel","PowerBI","Python","SQL","Gen AI","Statutory Compliance"];

const COURSE_CODE_MAP = { "Microsoft Excel":"101", PowerBI:"102", Python:"103", SQL:"104", "Gen AI":"105", "Statutory Compliance":"106" };
const CORE_CODE_MAP = { Core:"001", Advanced:"002", Proficient:"003", CoreComplete:"004" };
/* support both spellings for safety */
const SPEC_CODE_MAP = { Technician:"001", Master:"002", Expert:"003", SepclistComplete:"004", SpecialistComplete:"004" };
const DEFAULT_SEATS = 50;

/** -------------------- HELPERS -------------------- */
const pad = (n, len) => String(n).padStart(len, "0");
const to12h = (hhmm) => {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = ((h + 11) % 12) + 1;
  return `${pad(hr, 2)}:${pad(m, 2)} ${ampm}`;
};
const fmtDMY = (yyyy_mm_dd) => {
  if (!yyyy_mm_dd) return "";
  const [y, m, d] = yyyy_mm_dd.split("-").map(Number);
  return `${pad(d, 2)}-${pad(m, 2)}-${y}`;
};
const minutesDiff = (startHHMM, endHHMM) => {
  if (!startHHMM || !endHHMM) return 0;
  const [sh, sm] = startHHMM.split(":").map(Number);
  const [eh, em] = endHHMM.split(":").map(Number);
  let start = sh * 60 + sm;
  let end = eh * 60 + em;
  if (end < start) end += 24 * 60;
  return end - start;
};
const fmtDuration = (mins) => {
  if (!mins || mins < 0) return "";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h} hour${h > 1 ? "s" : ""} ${m} minute${m > 1 ? "s" : ""}`;
  if (h) return `${h} hour${h > 1 ? "s" : ""}`;
  return `${m} minute${m > 1 ? "s" : ""}`;
};

function buildPrefix(course, klass, group) {
  const courseCode = COURSE_CODE_MAP[course] || "000";
  let groupCode = "000";
  if (klass === "Core") groupCode = CORE_CODE_MAP[group] || "000";
  if (klass === "Specialist") groupCode = SPEC_CODE_MAP[group] || "000";
  return `${courseCode}-${groupCode}`;
}
function nextSerialForPrefix(prefix, list) {
  const serials = (list || [])
    .map((b) => String(b?.batchId || ""))
    .filter((id) => id.startsWith(prefix + "-"))
    .map((id) => {
      const parts = id.split("-");
      return parts.length >= 3 ? parseInt(parts[2], 10) || 0 : 0;
    });
  const max = serials.length ? Math.max(...serials) : 0;
  return pad(max + 1, 4);
}

/** -------------------- COMPONENT -------------------- */
export default function NewBatch({ onCreate }) {
  const [batchType, setBatchType] = useState("");
  const [batchClass, setBatchClass] = useState("");
  const [batchInfo, setBatchInfo] = useState("");
  const [groupCore, setGroupCore] = useState("");
  const [groupSpec, setGroupSpec] = useState("");

  const [startDate, setStartDate] = useState(""); // yyyy-mm-dd
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState(""); // HH:MM
  const [endTime, setEndTime] = useState("");

  const [seats, setSeats] = useState(DEFAULT_SEATS);
  const [status, setStatus] = useState("Active");
  const [mrp, setMrp] = useState("");
  const [price, setPrice] = useState("");

  const [url, setUrl] = useState("");

  // Sub-Admin (only for non-Individual)
  const allowSubAdmin = batchType && batchType !== "Individual";
  const [subAdminMaxUsers, setSubAdminMaxUsers] = useState("");
  const [subAdminExpiresOn, setSubAdminExpiresOn] = useState("");

  // Derived
  const selectedGroup =
    batchClass === "Core" ? groupCore : batchClass === "Specialist" ? groupSpec : "";

  const durationMins = useMemo(
    () => minutesDiff(startTime, endTime),
    [startTime, endTime]
  );
  const durationText = useMemo(() => fmtDuration(durationMins), [durationMins]);

  const batchName = useMemo(() => {
    const l = [batchInfo, selectedGroup].filter(Boolean).join(" - ");
    return l || "";
  }, [batchInfo, selectedGroup]);

  const [regenTick] = useState(0);

  const batchId = useMemo(() => {
    if (!batchInfo || !batchClass || !selectedGroup) return "";
    const prefix = buildPrefix(batchInfo, batchClass, selectedGroup);
    const serial = nextSerialForPrefix(prefix, batchList);
    return `${prefix}-${serial}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchInfo, batchClass, selectedGroup, regenTick]);

  // Validation
  const errors = useMemo(() => {
    const e = {};
    if (!batchType) e.batchType = "Select a Batch Type.";
    if (!batchClass) e.batchClass = "Select Batch Class.";
    if (!batchInfo) e.batchInfo = "Select Course.";
    if (batchClass === "Core" && !groupCore) e.groupCore = "Choose a Core group.";
    if (batchClass === "Specialist" && !groupSpec) e.groupSpec = "Choose a Specialist group.";
    if (!startDate) e.startDate = "Start date is required.";
    if (!endDate) e.endDate = "End date is required.";
    if (startDate && endDate && endDate < startDate)
      e.dateOrder = "End date cannot be before start date.";
    if (!startTime) e.startTime = "Start time is required.";
    if (!endTime) e.endTime = "End time is required.";
    if (minutesDiff(startTime, endTime) <= 0) e.duration = "End time must be after start time.";
    if (!seats || seats <= 0) e.seats = "Seats must be a positive number.";
    if (!mrp || Number(mrp) <= 0) e.mrp = "MRP must be a positive amount.";
    if (!price || Number(price) <= 0) e.price = "Price must be a positive amount.";
    if (mrp && price && Number(price) > Number(mrp)) e.priceMore = "Price cannot exceed MRP.";
    if (allowSubAdmin) {
      if (!subAdminMaxUsers || Number(subAdminMaxUsers) <= 0) e.subAdminMaxUsers = "Enter allowed number of users.";
      if (!subAdminExpiresOn) e.subAdminExpiresOn = "Set Sub-Admin expiry.";
      if (subAdminExpiresOn && endDate && subAdminExpiresOn < endDate)
        e.subAdminExpiry = "Expiry must be on or after batch End date.";
    }
    if (!batchId) e.batchId = "Batch ID will auto-generate after selections.";
    return e;
  }, [
    batchType, batchClass, batchInfo, groupCore, groupSpec,
    startDate, endDate, startTime, endTime,
    seats, mrp, price, allowSubAdmin, subAdminMaxUsers, subAdminExpiresOn, batchId
  ]);
  const isValid = Object.keys(errors).length === 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;

    const payload = {
      key: Date.now(),
      batchId,
      batchName,
      batchInfo,
      batchClass,
      batchGroup: selectedGroup,
      batchType,
      batchStartDate: fmtDMY(startDate),
      batchEndDate: fmtDMY(endDate),
      batchStartTime: to12h(startTime),
      batchEndTime: to12h(endTime),
      batchDuration: durationText,
      batchParticipants: 0,
      totalSeats: Number(seats),
      batchPlan: batchType,
      subAdminStatus: allowSubAdmin ? "enabled" : "disabled",
      subAdmin: allowSubAdmin ? { maxUsers: Number(subAdminMaxUsers), expiresOn: fmtDMY(subAdminExpiresOn) } : null,
      batchStatus: status,
      mrp: Number(mrp),
      price: Number(price),
      url
    };

    if (typeof onCreate === "function") onCreate(payload);
    else console.log("NewBatch → payload", payload);
  }

  return (
    <div className="nb-wrap">
      <SideBarAd/>
      <form className="nb-form glass-card" onSubmit={handleSubmit} noValidate>
        {/* Header */}
        <div className="nb-head">
          <div>
            <h2>New Batch</h2>
            <div className="nb-head__meta">Manage basic details.</div>
          </div>
        </div>

        {/* Lines (label on left, control on right) */}
        <div className="nb-lines">
          {/* IDs & Title */}
          <div className="nb-line">
            <div className="nb-label">
              <div className="nb-label-title">Batch ID *</div>
            </div>
            <div className="nb-control nb-field">
              <input value={batchId || ""} placeholder='e.g., "1001-100-0001"' readOnly />
            </div>
            <div className="nb-label">
              <div className="nb-label-title">Batch Title *</div>
            </div>
            <div className="nb-control nb-field">
              <input value={batchName || ""} placeholder='e.g., "Microsoft Excel - Advanced"' readOnly />
            </div>
          </div>

          {/* Date & time */}
          <div className="nb-line">
            <div className="nb-label">
              <div className="nb-label-title">Date and time *</div>
            </div>
            <div className="nb-control">
              <div className="nb-chiprow">
                <DatePicker value={startDate} onChange={setStartDate} ariaLabel="Select start date" />
                <input type="time" value={startTime} onChange={(e)=>setStartTime(e.target.value)} />
                <span className="nb-chiprow__sep">to</span>
                <input type="time" value={endTime} onChange={(e)=>setEndTime(e.target.value)} />
                <DatePicker value={endDate} onChange={setEndDate} min={startDate || undefined} ariaLabel="Select end date" />
              </div>

              {(errors.startDate || errors.endDate || errors.dateOrder || errors.startTime || errors.endTime || errors.duration) && (
                <small className="nb-err">
                  {errors.startDate || errors.endDate || errors.dateOrder || errors.startTime || errors.endTime || errors.duration}
                </small>
              )}

              <div className="nb-field" style={{ marginTop: 10 }}>
                <span>Duration</span>
                {durationText || "—"}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="nb-line">
            <div className="nb-label">
              <div className="nb-label-title">URL</div>
              <div className="nb-label-hint">Add URL to for your batch</div>
            </div>
            <div className="nb-control nb-field">
              <input placeholder="Add URL" value={url} onChange={(e)=>setUrl(e.target.value)} />
            </div>
          </div>

          {/* Batch meta (Type/Class/Course/Group/ID/Status/Seats/Pricing) */}
          <div className="nb-line">
            <div className="nb-label">
              <div className="nb-label-title">Batch details</div>
            </div>
            <div className="nb-control">
              <div className="nb-chipgrid">
                <div className="nb-field">
                  <span>Batch Type</span>
                  <select value={batchType} onChange={(e)=>setBatchType(e.target.value)}>
                    <option value="">Select Batch Type</option>
                    {BATCH_TYPES.map(t=> <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.batchType && <small className="nb-err">{errors.batchType}</small>}
                </div>

                <div className="nb-field">
                  <span>Batch Class</span>
                  <select
                    value={batchClass}
                    onChange={(e)=>{ setBatchClass(e.target.value); setGroupCore(""); setGroupSpec(""); }}
                  >
                    <option value="">Select Batch Class</option>
                    {BATCH_CLASSES.map(c=> <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.batchClass && <small className="nb-err">{errors.batchClass}</small>}
                </div>

                <div className="nb-field">
                  <span>Course</span>
                  <select value={batchInfo} onChange={(e)=>setBatchInfo(e.target.value)}>
                    <option value="">Select Course</option>
                    {BATCH_INFO.map(c=> <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.batchInfo && <small className="nb-err">{errors.batchInfo}</small>}
                </div>

                {batchClass && (
                  <div className="nb-field">
                    <span>{batchClass === "Core" ? "Core Group" : "Specialist Group"}</span>
                    <select
                      value={batchClass === "Core" ? groupCore : groupSpec}
                      onChange={(e)=> (batchClass === "Core" ? setGroupCore(e.target.value) : setGroupSpec(e.target.value))}
                    >
                      <option value="">Select Group</option>
                      {(batchClass === "Core" ? CORE_GROUPS : SPECIALIST_GROUPS).map(g=> <option key={g} value={g}>{g}</option>)}
                    </select>
                    {batchClass === "Core" && errors.groupCore && <small className="nb-err">{errors.groupCore}</small>}
                    {batchClass === "Specialist" && errors.groupSpec && <small className="nb-err">{errors.groupSpec}</small>}
                  </div>
                )}

                <div className="nb-field">
                  <span>Status</span>
                  <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                    {["Active","Upcoming","Completed","Cancelled"].map(s=> <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="nb-field">
                  <span>Total Seats</span>
                  <input type="number" min={1} value={seats} onChange={(e)=>setSeats(Number(e.target.value))}/>
                  {errors.seats && <small className="nb-err">{errors.seats}</small>}
                </div>

                <div className="nb-field">
                  <span>MRP</span>
                  <input type="number" step="0.01" value={mrp} onChange={(e)=>setMrp(e.target.value)} />
                  {errors.mrp && <small className="nb-err">{errors.mrp}</small>}
                </div>

                <div className="nb-field">
                  <span>Price</span>
                  <input type="number" step="0.01" value={price} onChange={(e)=>setPrice(e.target.value)} />
                  {(errors.price || errors.priceMore) && <small className="nb-err">{errors.price || errors.priceMore}</small>}
                </div>
              </div>

              {/* Sub-admin section */}
              {allowSubAdmin && (
                <div className="nb-chipgrid">
                  <div className="nb-field">
                    <span>Sub-Admin users</span>
                    <input type="number" min={1} value={subAdminMaxUsers} onChange={(e)=>setSubAdminMaxUsers(e.target.value)} />
                    {errors.subAdminMaxUsers && <small className="nb-err">{errors.subAdminMaxUsers}</small>}
                  </div>
                  <div className="nb-field">
                    <span>Sub-Admin expiry</span>
                    <DatePicker value={subAdminExpiresOn} onChange={setSubAdminExpiresOn} min={endDate || undefined} ariaLabel="Select sub-admin expiry date"/>
                    {(errors.subAdminExpiresOn || errors.subAdminExpiry) && (
                      <small className="nb-err">{errors.subAdminExpiresOn || errors.subAdminExpiry}</small>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="nb-actions">
          <button type="button" className="nb-btn" onClick={() => window.history.back()}>Cancel</button>
          <button className="nb-btn nb-primary" type="submit" disabled={!isValid}>Create Batch</button>
        </div>

        {/* Compact JSON preview retained for debugging */}
        <pre className="nb-preview">
{JSON.stringify(
  {
    batchId: batchId || "—",
    batchName: batchName || "—",
    type: batchType || "—",
    class: batchClass || "—",
    group: selectedGroup || "—",
    startDate: startDate ? fmtDMY(startDate) : "—",
    endDate: endDate ? fmtDMY(endDate) : "—",
    startTime: to12h(startTime) || "—",
    endTime: to12h(endTime) || "—",
    duration: durationText || "—",
    seats: seats || "—",
    status,
    mrp: mrp || "—",
    price: price || "—",
    url,
    subAdmin: allowSubAdmin
      ? { maxUsers: subAdminMaxUsers || "—", expiresOn: subAdminExpiresOn ? fmtDMY(subAdminExpiresOn) : "—" }
      : "disabled",
  },
  null,
  2
)}
        </pre>
      </form>
    </div>
  );
}
