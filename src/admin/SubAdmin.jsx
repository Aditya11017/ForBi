// SubAdmin.jsx
import React, { useMemo, useState } from "react";
import "./subAdmin.css";

/* Real batches */
import { batch as batchList } from "./batch.js";
import SideBarAd from "./sideBarAd.jsx";

export default function SubAdmin({ batches: externalBatches = [], onCreate }) {
  /* ---- STEP ---- */
  const [step, setStep] = useState(1);

  /* ---- DATA SOURCES ---- */
  const batches = externalBatches.length ? externalBatches : batchList;

  /* ---- STATE ---- */
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    status: "Active",
    expiresOn: "", // only expiry is configurable
  });

  // Access scope: list of { batchId, userLimit }
  const [scope, setScope] = useState({
    type: "limited", // 'limited' | 'all'
    items: [],       // { batchId, userLimit }
  });

  // Show/hide password toggle
  const [showPwd, setShowPwd] = useState(false);

  /* ---- UTILS ---- */
  const parseDMYToDate = (dmy) => {
    // batch.js dates are "DD-MM-YYYY"
    if (!dmy || typeof dmy !== "string") return null;
    const [dd, mm, yyyy] = dmy.split("-");
    if (!dd || !mm || !yyyy) return null;
    // construct YYYY-MM-DD to avoid locale ambiguity
    return new Date(`${yyyy}-${mm}-${dd}T00:00:00`);
  };
  const toISODate = (date) => {
    if (!(date instanceof Date)) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  const formatDMY = (date) => {
    if (!(date instanceof Date)) return "—";
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  };

  /* ---- MAP + LATEST END DATE ---- */
  const batchMap = useMemo(() => {
    const m = new Map();
    (batches || []).forEach((b) => m.set(String(b.batchId), b));
    return m;
  }, [batches]);

  const lastEndDate = useMemo(() => {
    let ids = [];
    if (scope.type === "all") {
      ids = batches.map((b) => b.batchId);
    } else {
      ids = scope.items.map((x) => x.batchId).filter(Boolean);
    }
    let max = null;
    ids.forEach((id) => {
      const b = batchMap.get(String(id));
      const d = parseDMYToDate(b?.batchEndDate);
      if (d && (!max || d > max)) max = d;
    });
    return max;
  }, [scope, batches, batchMap]);

  // initials for avatar
const initials = useMemo(() => {
  const n = (profile.fullName || "").trim();
  if (!n) return "SA";
  return n.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();
}, [profile.fullName]);

// earliest start among selected (or all, if scope = all)
const firstStartDate = useMemo(() => {
  const ids =
    scope.type === "all"
      ? batches.map(b => b.batchId)
      : scope.items.map(x => x.batchId).filter(Boolean);
  let min = null;
  ids.forEach(id => {
    const b = batchMap.get(String(id));
    const d = parseDMYToDate(b?.batchStartDate);
    if (d && (!min || d < min)) min = d;
  });
  return min;
}, [scope, batches, batchMap]);

// total user limit (only meaningful when scope = limited)
const totalUserLimit = useMemo(() => {
  if (scope.type === "all") return null;
  return scope.items.reduce((s, x) => s + (Number(x.userLimit) || 0), 0);
}, [scope]);

  /* ---- VALIDATION ---- */
  const errors = useMemo(() => {
    const e = {};
    if (step === 1) {
      if (!profile.fullName.trim()) e.fullName = "Name is required.";
      if (!profile.email.trim()) e.email = "Email is required.";
      if (!profile.username.trim()) e.username = "Username is required.";
      if (!profile.password.trim()) e.password = "Password is required.";
    }
    if (step === 2) {
      // require expiry
      if (!profile.expiresOn) {
        e.expiresOn = "Expiry date is required.";
      } else if (lastEndDate) {
        // enforce expiry ≥ last batch end
        const exp = new Date(profile.expiresOn);
        // normalize time to midnight for safe compare
        const expMid = new Date(exp.getFullYear(), exp.getMonth(), exp.getDate());
        const lastMid = new Date(
          lastEndDate.getFullYear(),
          lastEndDate.getMonth(),
          lastEndDate.getDate()
        );
        if (expMid < lastMid) {
          e.expiresOn = `Expiry must be on or after ${formatDMY(lastEndDate)} (last batch end).`;
        }
      }
      if (scope.type === "limited") {
        if (scope.items.length === 0) e.scope = "Add at least one batch or choose All Batches.";
        scope.items.forEach((row, idx) => {
          if (!row.batchId) e[`row-${idx}-batch`] = "Pick a batch.";
          if (!(Number(row.userLimit) > 0)) e[`row-${idx}-limit`] = "User limit must be > 0.";
        });
      }
    }
    return e;
  }, [step, profile, scope, lastEndDate]);

  /* ---- SCOPE HELPERS ---- */
  const addScopeRow = () => {
    const selected = new Set(scope.items.map((x) => String(x.batchId)));
    const next = batches.find((b) => !selected.has(String(b.batchId)));
    if (!next) return;
    setScope((s) => ({
      ...s,
      items: [...s.items, { batchId: next.batchId, userLimit: 1 }],
    }));
  };

  const updateScopeRow = (idx, patch) => {
    setScope((s) => {
      const items = s.items.slice();
      items[idx] = { ...items[idx], ...patch };
      return { ...s, items };
    });
  };

  const removeScopeRow = (idx) =>
    setScope((s) => ({ ...s, items: s.items.filter((_, i) => i !== idx) }));

  /* ---- NAV ---- */
  const next = () => {
    if (Object.keys(errors).length) return;
    setStep((s) => Math.min(3, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  /* ---- SUBMIT ---- */
  const handleCreate = () => {
    const payload = {
      profile: {
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        username: profile.username,
        password: profile.password, // send securely to your API
        status: profile.status,
        expiresOn: profile.expiresOn,
      },
      access: {
        type: scope.type,
        items:
          scope.type === "all"
            ? []
            : scope.items.map((x) => ({
                batchId: x.batchId,
                userLimit: Number(x.userLimit || 0),
              })),
      },
      meta: { createdAt: new Date().toISOString(), createdBy: "Admin" },
    };
    onCreate?.(payload);
    console.log("CREATE_SUBADMIN_PAYLOAD", payload);
    setStep(1);
  };
const printReview = () => {
  window.print();
};
  /* ---- UI ---- */
  return (
    <div className="subadmin-container">
        <SideBarAd/>
      <div className="sub-admin-box">
        <div className="sub-box">
          <header className="sa-head">
            <h1>Sub-Admin</h1>
            <div className="sa-steps">
              <span className={`sa-step ${step >= 1 ? "active" : ""}`}>1 Info</span>
              <span className={`sa-step ${step >= 2 ? "active" : ""}`}>2 Access</span>
              <span className={`sa-step ${step >= 3 ? "active" : ""}`}>3 Review</span>
            </div>
          </header>

          {/* Step 1: Profile */}
          {step === 1 && (
            <section className="sa-grid">
              <article className="card sa-card">
                <h3>Sub-Admin Information</h3>

                <div className="sa-form">
                  <div className="sa-field">
                    <label>Name</label>
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      placeholder="Full name"
                    />
                    {errors.fullName && <small className="err">{errors.fullName}</small>}
                  </div>

                  <div className="sa-field">
                    <label>Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      placeholder="email@company.com"
                    />
                    {errors.email && <small className="err">{errors.email}</small>}
                  </div>

                  <div className="sa-field">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="+91 ..."
                    />
                  </div>

                  <div className="sa-field">
                    <label>Username</label>
                    <input
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      placeholder="subadmin_username"
                    />
                    {errors.username && <small className="err">{errors.username}</small>}
                  </div>

                  <div className="sa-field">
                    <label>Password</label>
                    <div className="sa-password-wrap">
                      <input
                        type={showPwd ? "text" : "password"}
                        value={profile.password}
                        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="sa-btn ghost sm"
                        onClick={() => setShowPwd((v) => !v)}
                        aria-label={showPwd ? "Hide password" : "Show password"}
                      >
                        {showPwd ? "Hide" : "Show"}
                      </button>
                    </div>
                    {errors.password && <small className="err">{errors.password}</small>}
                  </div>

                  <div className="sa-field">
                    <label>Status</label>
                    <select
                      value={profile.status}
                      onChange={(e) => setProfile({ ...profile, status: e.target.value })}
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
              </article>
            </section>
          )}

          {/* Step 2: Access (Expiry + Per-batch user limits; dates auto from batch.js) */}
          {step === 2 && (
            <section className="sa-grid">
              <article className="card sa-card">
                <h3>Access & Limits</h3>

                {/* Expiry control */}
                <div className="sa-form" style={{ gridTemplateColumns: "1fr" }}>
                  <div className="sa-field">
                    <label>Account Expiry</label>
                    <input
                      type="date"
                      value={profile.expiresOn}
                      min={lastEndDate ? toISODate(lastEndDate) : undefined}
                      onChange={(e) => setProfile({ ...profile, expiresOn: e.target.value })}
                    />
                    <small className="hint">
                      {lastEndDate
                        ? `Must be on or after ${formatDMY(lastEndDate)} (latest batch end).`
                        : "Pick a date"}
                    </small>
                    {errors.expiresOn && <small className="err">{errors.expiresOn}</small>}
                  </div>
                </div>

                {/* Scope selection */}
                <div className="sa-scope-toggle">
                  <label className={`sa-chip ${scope.type === "all" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="scopeType"
                      checked={scope.type === "all"}
                      onChange={() => setScope({ ...scope, type: "all", items: [] })}
                    />
                    <span>All Batches</span>
                  </label>

                  <label className={`sa-chip ${scope.type === "limited" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="scopeType"
                      checked={scope.type === "limited"}
                      onChange={() => setScope({ ...scope, type: "limited" })}
                    />
                    <span>Specific Batches</span>
                  </label>
                </div>

                {scope.type === "limited" && (
                  <>
                    {errors.scope && <div className="err mb">{errors.scope}</div>}

                    <div className="sa-scope-list">
                      <div className="sa-scope-head">
                        <span>Batch</span>
                        <span>Start</span>
                        <span>End</span>
                        <span>User Limit</span>
                        <span>Action</span>
                      </div>

                      {scope.items.map((row, idx) => {
                        const b = batchMap.get(String(row.batchId));
                        return (
                          <div className="sa-scope-row" key={`${row.batchId}-${idx}`}>
                            {/* Batch select */}
                            <div className="sa-scope-cell">
                              <select
                                value={row.batchId}
                                onChange={(e) => updateScopeRow(idx, { batchId: e.target.value })}
                              >
                                {batches.map((opt) => (
                                  <option key={opt.batchId} value={opt.batchId}>
                                    {opt.batchId} — {opt.batchName}
                                  </option>
                                ))}
                              </select>
                              {errors[`row-${idx}-batch`] && (
                                <small className="err">{errors[`row-${idx}-batch`]}</small>
                              )}
                            </div>

                            {/* Auto Start */}
                            <div className="sa-scope-cell">
                              <div className="sa-read">{b?.batchStartDate || "—"}</div>
                            </div>

                            {/* Auto End */}
                            <div className="sa-scope-cell">
                              <div className="sa-read">{b?.batchEndDate || "—"}</div>
                            </div>

                            {/* User Limit */}
                            <div className="sa-scope-cell">
                              <input
                                type="number"
                                min="1"
                                value={row.userLimit ?? 1}
                                onChange={(e) =>
                                  updateScopeRow(idx, { userLimit: Number(e.target.value) })
                                }
                                placeholder="e.g. 25"
                              />
                              {errors[`row-${idx}-limit`] && (
                                <small className="err">{errors[`row-${idx}-limit`]}</small>
                              )}
                            </div>

                            <div className="sa-scope-cell ta-right">
                              <button
                                type="button"
                                className="sa-btn ghost"
                                onClick={() => removeScopeRow(idx)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      <button type="button" className="sa-btn" onClick={addScopeRow}>
                        + Add Batch
                      </button>
                    </div>
                  </>
                )}
              </article>
            </section>
          )}

          {/* Step 3: Review (polished) */}
{step === 3 && (
  <section className="sa-grid">
    <article className="card sa-card sa-review-card">
      {/* Banner */}
      <div className="sa-review-header">
        <div className="sa-id">
          <div className="sa-avatar">{initials}</div>
          <div>
            <div className="sa-name">{profile.fullName || "New Sub-Admin"}</div>
            <div className="sa-sub">@{profile.username || "username"}</div>
          </div>
        </div>

        <div className="sa-badges">
          <span className={`sa-pill ${profile.status === "Active" ? "on" : ""}`}>
            {profile.status}
          </span>
          <span className="sa-pill">
            {profile.expiresOn ? `Expires ${profile.expiresOn}` : "No expiry"}
          </span>
        </div>

        <div className="sa-edit">
          <button className="sa-btn ghost sm" onClick={() => setStep(1)}>✎ Edit Info</button>
          <button className="sa-btn ghost sm" onClick={() => setStep(2)}>✎ Edit Access</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        <div className="stat">
          <div className="stat-label">Batch</div>
          <div className="stat-value">
            {scope.type === "all"
              ? `All Batches (${batches.length})`
              : `${scope.items.length} Batch selected`}
          </div>
        </div>
        <div className="stat">
          <div className="stat-label">Earliest Start</div>
          <div className="stat-value">{firstStartDate ? formatDMY(firstStartDate) : "—"}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Latest End</div>
          <div className="stat-value">{lastEndDate ? formatDMY(lastEndDate) : "—"}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Total User Limit</div>
          <div className="stat-value">
            {scope.type === "all" ? "—" : totalUserLimit}
          </div>
        </div>
      </div>

      {/* Profile quick view */}
      <div className="sa-section two-col">
        <div className="sa-card-lite">
          <div className="sa-section-title">Profile</div>
          <ul className="sa-list">
            <li><b>Name:</b> {profile.fullName || "—"}</li>
            <li><b>Email:</b> {profile.email || "—"}</li>
            <li><b>Phone:</b> {profile.phone || "—"}</li>
            <li><b>Username:</b> {profile.username || "—"}</li>
          </ul>
        </div>

        <div className="sa-card-lite">
          <div className="sa-section-title">Security</div>
          <div className="sa-security">
            <span><b>Password:</b> {profile.password ? "••••••••" : "—"}</span>
            <button className="sa-btn ghost sm" onClick={() => setStep(1)}>Change</button>
          </div>
          <small className="hint">
            Tip: rotate sub-admin passwords periodically and keep an expiry set.
          </small>
        </div>
      </div>

      {/* Access table */}
      <div className="sa-section">
        <div className="sa-section-title">Batch Access</div>

        {scope.type === "all" ? (
          <p className="sa-kv"><b>Scope:</b> All Batches</p>
        ) : scope.items.length ? (
          <div className="sa-mini-table">
            <div className="sa-mini-head">
              <span>Batch</span>
              <span>Start</span>
              <span>End</span>
              <span>User Limit</span>
            </div>
            {scope.items.map((x, i) => {
              const b = batchMap.get(String(x.batchId));
              return (
                <div className="sa-mini-row" key={`${x.batchId}-${i}`}>
                  <span className="mono">{x.batchId}—{b?.batchName}</span>
                  <span>{b?.batchStartDate || "—"}</span>
                  <span>{b?.batchEndDate || "—"}</span>
                  <span>{x.userLimit}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="sa-kv">—</p>
        )}
        {/* Step 3 footer actions */}
<footer className="sa-foot">
  {step > 1 && (
    <button type="button" className="sa-btn ghost" onClick={back}>
      ← Back
    </button>
  )}
  <button type="button" className="sa-btn" onClick={printReview}>
    Print / Save PDF
  </button>
  <button type="button" className="sa-btn primary" onClick={handleCreate}>
    Create Sub-Admin
  </button>
</footer>

      </div>
    </article>
  </section>
)}


          {/* Footer actions */}
          <footer className="sa-foot">
            {step > 1 && (
              <button type="button" className="sa-btn ghost" onClick={back}>
                ← Back
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                className="sa-btn"
                onClick={next}
                disabled={Object.keys(errors).length > 0}
                title={Object.values(errors)[0] || ""}
              >
                Next →
              </button>
            )}
            {step === 3 && (
              <button type="button" className="sa-btn primary" onClick={handleCreate}>
                Create Sub-Admin
              </button>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}
