import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sales.css";

export default function Sales() {
  const techOptions = ["Excel", "PowerBI", "Python", "SQL", "Artificial Intelligence", "Statutory Compliance"];
  const NAME_YOUR_BUDGET = "Name your budget";
  const budgetOptions = ["< ₹10,000", "> ₹10,000", NAME_YOUR_BUDGET];

  const [selectedTech, setSelectedTech] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [customBudget, setCustomBudget] = useState("");

  const toggleTech = (v) => {
    setSelectedTech((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  };

  const setBudget = (v) => {
    setSelectedBudget((prev) => (prev === v ? null : v));
  };

  // Clear custom amount if user switches away from "Name your budget"
  useEffect(() => {
    if (selectedBudget !== NAME_YOUR_BUDGET) setCustomBudget("");
  }, [selectedBudget]);

  return (
    <div className="sales-container">
      <div className="sales-shell">
        {/* Left hero */}
        <aside className="sales-hero">
          <p to="/" className="hero-cta">Contact us</p>
          <h1 className="hero-title">Let’s make<br/>an impact</h1>
        </aside>

        {/* Right form */}
        <section className="sales-form-panel">
          <div className="form-head">
            <div className="pln-center">
              <h1 className="sl-head">Work better together</h1>
              <h4>Not sure what plan you need?</h4>
              <Link to="/FormulaBIElite">
                <button className="compare-btn">Check Plans</button>
              </Link>
            </div>
          </div>

          <form className="sales-form">
            {/* Row 1 */}
            <fieldset>
              <legend>Name<span className="req"> *</span></legend>
              <input
                type="text"
                placeholder="John"
                aria-label="First Name"
                name="FirstName"
              />
            </fieldset>
            <fieldset>
              <legend>Last Name <span className="req"> *</span></legend>
              <input
                type="text"
                placeholder="Doe"
                aria-label="Last Name"
                name="LastName"
              />
            </fieldset>

            {/* Row 2 */}
            <fieldset>
              <legend>Email<span className="req"> *</span></legend>
              <input
                type="text"
                placeholder="e.g. aditya@formulabilabs.com"
                aria-label="Email id"
                name="userName"
              />
            </fieldset>

            <fieldset>
              <legend>Your Phone<span className="req"> *</span></legend>
              <input
                type="text"
                placeholder="00-000-0000"
                aria-label="Phone"
                name="Phone"
              />
            </fieldset>

            {/* Row 3 */}
            <fieldset className="full">
              <legend>
                Organization Name{" "}
                <span className="note">(None, If not affiliated with any organization)</span>
                <span className="req"> *</span>
              </legend>
              <input
                type="text"
                placeholder="e.g. ABC Org"
                aria-label="organistion name"
                name="OrgName"
              />
            </fieldset>

            {/* Interest chips (Tech) */}
            <div className="full">
              <p className="group-label">I’m interested in…</p>
              <div className="pill-row">
                {techOptions.map((t) => (
                  <button
                    type="button"
                    key={t}
                    className={`pill ${selectedTech.includes(t) ? "pill--active" : ""}`}
                    onClick={() => toggleTech(t)}
                    aria-pressed={selectedTech.includes(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {/* Hidden checkboxes for compatibility */}
              <fieldset className="check sr-only">
                <legend>Tech</legend>
                {techOptions.map((t) => (
                  <label className="check-box" key={t}>
                    <input
                      type="checkbox"
                      value={t}
                      checked={selectedTech.includes(t)}
                      readOnly
                    />
                    {t}
                  </label>
                ))}
              </fieldset>
            </div>

            {/* Plan & Add-on (keep as selects) */}
         
            <fieldset>
              <legend>What Plan You Select<span className="req"> *</span></legend>
              <label htmlFor="Plan" className="sr-only">Plan</label>
              <select id="Plan" name="userPlan" defaultValue="" required>
                <option value="" disabled>-- Choose a Plan --</option>
                <option value="Team-Small">Team-Small</option>
                <option value="Team-Medium">Team-Medium</option>
                <option value="Team-Enterprise">Team-Enterprise</option>
                <option value="Firm-Standerd">Firm-Standerd Plan</option>
                <option value="Firm-Pro">Firm-Pro Plan</option>
                <option value="Firm-Enterprise">Firm-Enterprise-Plan</option>
                <option value="EduSchool">School</option>
                <option value="EduCollage">Collage</option>
                <option value="EduInstitute">Institute</option>
                <option value="Custom">Custom</option>
              </select>
            </fieldset>
<div className="full">
                        Still not sure what plan you need?
              <p className="compare-text">Check out our <Link to="/FormulaBIElite" className="compare-btn">FormulaBI Elite</Link> plans for more tailored options.</p>  
         </div>
            <fieldset>
              <legend>Do You want Add-On?<span className="req"> *</span></legend>
              <label htmlFor="Addon" className="sr-only">Add-on</label>
              <select id="Addon" name="userAddon" defaultValue="" required>
                <option value="" disabled>-- Need Add-on --</option>
                <option value="yes">Yes</option>
                <option value="No">No</option>
              </select>
            </fieldset>

            {/* Budget pills */}
            <div className="full">
              <p className="group-label">your Budget (INR)</p>
              <div className="pill-row">
                {budgetOptions.map((b) => (
                  <button
                    type="button"
                    key={b}
                    className={`pill ${selectedBudget === b ? "pill--active" : ""}`}
                    onClick={() => setBudget(b)}
                    aria-pressed={selectedBudget === b}
                  >
                    {b}
                  </button>
                ))}
              </div>

              {/* Hidden input posts selected pill OR custom amount */}
              <input
                type="hidden"
                name="budget"
                value={
                  selectedBudget === NAME_YOUR_BUDGET
                    ? customBudget
                    : (selectedBudget ?? "")
                }
              />
            </div>

            {/* Custom budget: only visible when "Name your budget" is selected */}
            {selectedBudget === NAME_YOUR_BUDGET && (
              <fieldset className="full">
                <legend>Your Budget</legend>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. ₹10,000"
                  aria-label="budget estimate"
                  name="customBudget"
                  value={customBudget}
                  onChange={(e) => setCustomBudget(e.target.value)}
                />
              </fieldset>
            )}

            {/* Query */}
            <div className="query full">
              <h2 className="query-title">Tell us about your requriments.</h2>
              <div className="query-box">
                <fieldset>
                  <legend>What's in your mind?</legend>
                  <textarea
                    placeholder="Write something concise…"
                    aria-label="query"
                    name="query"
                  />
                </fieldset>
              </div>
              <button type="submit" className="send-btn">Get in Touch</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
