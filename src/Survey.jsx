import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Survey.css";      // generic survey visuals (no .pm-* in here)
import "./intrest.css";     // your provided .pm-* CSS
import ToolTip from "./ToolTip";

// assets for interest matrix
import excel from "./assets/images/Excel-w-sgl.svg";
import sql from "./assets/images/MysqlW-sgl.svg";
import powerbi from "./assets/images/PowerBIW-sgl.svg";
import python from "./assets/images/PYW-sgl.svg";
import genAi from "./assets/images/ChatGPTW-sgl.svg";
import soc from "./assets/images/SOC-w.svg";

// Step 3 tiles
const levels = [
  { label: "Beginner",     code: 'print("hello")',      description: "I want to start from the basics." },
  { label: "Novice",       code: "if b > a:\n  print b",description: "I've seen, but not touched code before." },
  { label: "Intermediate", code: "for i in range(5):",  description: "I can write simple programs with loops." },
  { label: "Advanced",     code: "def circle(size):",   description: "I've written longer programs." }
];

// Interest Matrix model
const COLS = [
  { key: 1, label: "Not at all\ninterested" },
  { key: 2, label: "Not very\ninterested" },
  { key: 3, label: "Neutral" },
  { key: 4, label: "Somewhat\ninterested" },
  { key: 5, label: "Very\ninterested" },
];

const ROWS = [
  { key: "excel",   label: "Microsoft Excel",        icon: <img src={excel} alt="Excel" /> },
  { key: "powerbi", label: "Power BI",               icon: <img src={powerbi} alt="Power BI" /> },
  { key: "genai",   label: "GenAI",                  icon: <img src={genAi} alt="GenAI" /> },
  { key: "mysql",   label: "MySQL",                  icon: <img src={sql} alt="MySQL" /> },
  { key: "python",  label: "Python",                 icon: <img src={python} alt="Python" /> },
  { key: "soc",     label: "Saturatory On Complince",icon: <img src={soc} alt="SOC" /> },
];

// Step 2 goal options (multi-select)
const GOALS = [
  "Professional growth",
  "Staying sharp",
  "Excelling in school",
  "Helping my child learn",
  "Helping my students learn",
  "Something else"
];

export default function Survey() {
  const navigate = useNavigate();

  // steps: 1 = Interest Matrix, 2 = Goal (multi-select), 3 = Level + Submit
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [goals, setGoals] = useState([]);     // ← multi-select array
  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const allSelected = ROWS.length === Object.keys(answers).length;

  const primaryInterest = useMemo(() => {
    if (!allSelected) return null;
    let bestKey = null, bestScore = -Infinity;
    for (const row of ROWS) {
      const score = Number(answers[row.key] ?? -Infinity);
      if (score > bestScore) { bestScore = score; bestKey = row.key; }
    }
    return bestKey;
  }, [answers, allSelected]);

  const handleInterestPick = (rowKey, colKey) =>
    setAnswers((prev) => ({ ...prev, [rowKey]: colKey }));

  // ---- Step 2: multi-select toggler
  const toggleGoal = (goal) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const renderProgress = () => {
    const totalSteps = 3;
    return (
      <div className="custom-progress-bar">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const n = i + 1;
          const isCompleted = step > n;
          const isActive = step === n;
          return (
            <div
              key={n}
              className={`progress-step ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
            >
              <span className="step-number">{n}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const nudgeIfDisabled = () => { setShake(true); setTimeout(() => setShake(false), 400); };

  const nextFromStep1 = (e) => {
    e.preventDefault();
    if (!allSelected) return nudgeIfDisabled();
    setStep(2);
  };

  const nextFromStep2 = (e) => {
    e.preventDefault();
    if (goals.length === 0) return nudgeIfDisabled();
    setStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!level) return nudgeIfDisabled();
    setLoading(true);
    try {
      const payload = {
        interest: primaryInterest,  // primary from matrix
        matrix: answers,            // full matrix scores
        goals,                      // ← array of selected goals
        level
      };

      // ✅ Log everything at the end
      console.log("Survey submission payload:", payload);
      // (Optional) send to Apps Script
      const response = await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Network response was not ok");

      // simple routing (adjust as needed)
      if (primaryInterest === "python")       navigate("/python");
      else if (primaryInterest === "powerbi") navigate("/powerbi");
      else if (primaryInterest === "excel")   navigate("/excel");
      else if (primaryInterest === "mysql")   navigate("/sql");
      else if (primaryInterest === "genai")   navigate("/genai");
      else if (primaryInterest === "soc")     navigate("/compliance");
      else                                    navigate("/thank-you");
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setLoading(false);
      navigate("/Dashboard"); // Redirect to Dashboard after submission
    }
  };

  return (
    <div className="survey-section">
      <div className="survey-content">
        <h1>🚀 Embark on Your Learning Adventure</h1>
        <p>Answer a few quick questions and we'll tailor the perfect path to your goals.</p>

        {renderProgress()}

        {/* STEP 1: Interest Matrix — .pm-* classes from intrest.css */}
        {step === 1 && (
          <div className="pm-container">
            <div className="pm-box">
              <form className="pm-root" onSubmit={nextFromStep1}>
                <h2 className="pm-title">Rate your interest</h2>

                {/* header */}
                <div className="pm-head">
                  <div className="pm-head__spacer" />
                  {COLS.map((c) => (
                    <div key={c.key} className="pm-head__cell" aria-hidden>
                      {c.label.split("\n").map((ln, i) => <div key={i}>{ln}</div>)}
                    </div>
                  ))}
                </div>

                {/* body */}
                <div className="pm-body">
                  {ROWS.map((r) => {
                    const selected = answers[r.key];
                    return (
                      <div key={r.key} className={`pm-row ${selected ? "pm-row--active" : ""}`}>
                        <div className="pm-row__label">
                          <span className="pm-row__icon" aria-hidden>{r.icon}</span>
                          <span className="pm-row__text">{r.label}</span>
                        </div>

                        {COLS.map((c) => {
                          const id = `${r.key}-${c.key}`;
                          return (
                            <ToolTip text={c.label} key={c.key}>
                              <label htmlFor={id} className="pm-cell">
                                <input
                                  id={id}
                                  className="pm-radio"
                                  type="radio"
                                  name={r.key}
                                  value={c.key}
                                  checked={selected === c.key}
                                  onChange={() => handleInterestPick(r.key, c.key)}
                                />
                                <span className="pm-radio-ui" aria-hidden="true" />
                              </label>
                            </ToolTip>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* actions */}
                <div className="pm-actions">
                  <button
                    className={`pm-btn ${(!allSelected && shake) ? "shake" : ""}`}
                    type="submit"
                    disabled={!allSelected}
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* STEP 2: Goal selection (MULTI-SELECT) */}
        {step === 2 && (
          <form className="survey-form" onSubmit={nextFromStep2}>
            <h3 className="step-heading">🎯 Pick your goals (choose all that apply)</h3>
            <div className="level-grid">
              {GOALS.map((goal) => {
                const isActive = goals.includes(goal);
                return (
                  <div
                    key={goal}
                    className={`level-card ${isActive ? "selected" : ""}`}
                    onClick={() => toggleGoal(goal)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleGoal(goal);
                      }
                    }}
                    aria-pressed={isActive}
                    role="button"
                  >
                    <strong>{goal}</strong>
                  </div>
                );
              })}
            </div>
            <div className="pm-actions">
              <button
                className={`pm-btn ${(!goals.length && shake) ? "shake" : ""}`}
                type="submit"
                disabled={goals.length === 0}
              >
                Continue
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Level + Submit */}
        {step === 3 && (
          <form className="survey-form" onSubmit={handleSubmit}>
            <h3 className="step-heading">🧩 Choose your comfort level</h3>
            <div className="level-grid">
              {levels.map((item) => (
                <div
                  key={item.label}
                  className={`level-card ${level === item.label ? "selected" : ""}`}
                  onClick={() => setLevel(item.label)}
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setLevel(item.label)}
                >
                  <pre>{item.code}</pre>
                  <strong>{item.label}</strong>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
            <div className="pm-actions">
              <button className="pm-btn" type="submit" disabled={loading || !level}>
                {loading ? "Submitting..." : "Finish"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
