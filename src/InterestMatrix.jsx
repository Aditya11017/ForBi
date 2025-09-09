

import { useState } from "react";
import "./intrest.css"; // <-- new CSS below
import excel from "./assets/images/Excel-w-sgl.svg";
import sql from "./assets/images/MysqlW-sgl.svg";
import powerbi from "./assets/images/PowerBIW-sgl.svg";
import python from "./assets/images/PYW-sgl.svg";
import genAi from "./assets/images/ChatGPTW-sgl.svg";
import soc from "./assets/images/SOC-w.svg";
import ToolTip from "./ToolTip";
import { useNavigate } from "react-router-dom";







const COLS = [
  { key: 1, label: "Not at all\ninterested" },
  { key: 2, label: "Not very\ninterested" },
  { key: 3, label: "Neutral" },
  { key: 4, label: "Somewhat\ninterested" },
  { key: 5, label: "Very\ninterested" },
];

const ROWS = [
  { key: "excel", label: "Microsoft Excel", icon: <img src={excel}/> },
  { key: "powerbi", label: "Power BI", icon: <img src={powerbi}/>},
  { key: "genai", label: "GenAI", icon: <img src={genAi}/> },
  { key: "mysql", label: "MySQL", icon: <img src={sql}/> },
  { key: "python", label: "Python", icon: <img src={python}/> },
  { key: "soc", label: "Saturatory On Complince", icon: <img src={soc}/> },
  
];

export default function InterestMatrix() {
  const [answers, setAnswers] = useState({}); // { excel: 3, powerbi: 5, ... }

  const setAnswer = (rowKey, colKey) =>
    setAnswers((prev) => ({ ...prev, [rowKey]: colKey }));

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Preferences:", answers);
  };
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
const handleButtonClick = (e) => {
  if (!allSelected) {
    e.preventDefault();
    setShake(true);
    setTimeout(() => setShake(false), 400);
    navigate("/Survey") // remove class after animation
  }
};

  // ✅ Check if all preferences are selected
  const allSelected = ROWS.length === Object.keys(answers).length;

  return (
    <div className="pm-containter">
      <div className="pm-box">
        <form className="pm-root" onSubmit={onSubmit}>
          <h1 className="pm-title">Rate your interest</h1>

          {/* Header */}
          <div className="pm-head">
            <div className="pm-head__spacer" />
            {COLS.map((c) => (
              <div key={c.key} className="pm-head__cell" aria-hidden>
                {c.label.split("\n").map((ln, i) => (
                  <div key={i}>{ln}</div>
                ))}
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="pm-body">
            {ROWS.map((r) => {
              const selected = answers[r.key];
              return (
                <div
                  key={r.key}
                  className={`pm-row ${selected ? "pm-row--active" : ""}`}
                >
                  <div className="pm-row__label">
                    <span className="pm-row__icon" aria-hidden>
                      {r.icon}
                    </span>
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
                            onChange={() => setAnswer(r.key, c.key)}
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

          {/* Save Button */}
          <div className="pm-actions">
            <button
  className={`pm-btn ${shake ? "shake" : ""}`}
  type="submit"
  disabled={!allSelected}
  onClick={handleButtonClick}
>
  Save Preferences
</button>
          </div>
        </form>
      </div>
    </div>
  );
}
