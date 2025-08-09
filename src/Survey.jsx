import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Survey.css";
import begin from "./assets/images/begin.svg";
import novice from "./assets/images/novice.svg";
import proff from "./assets/images/proff.svg";

const levels = [
  {
    label: "Beginner",
    code: 'print("hello")',
    description: "I want to start from the basics."
  },
  {
    label: "Novice",
    code: "if b > a:\n  print b",
    description: "I've seen, but not touched code before."
  },
  {
    label: "Intermediate",
    code: "for i in range(5):",
    description: "I can write simple programs with loops."
  },
  {
    label: "Advanced",
    code: "def circle(size):",
    description: "I've written longer programs."
  }
];

export default function Survey() {
  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState("data-science");
  const [level, setLevel] = useState(null);
  const [goalSelection, setGoalSelection] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Custom non-icon based progress bar renderer
  const renderProgress = () => {
    const totalSteps = 4;
    return (
      <div className="custom-progress-bar">
        {[...Array(totalSteps)].map((_, index) => {
          const stepNum = index + 1;
          const isCompleted = step > stepNum;
          const isActive = step === stepNum;
          return (
            <div
              key={stepNum}
              className={`progress-step ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
            >
              <span className="step-number">{stepNum}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interest, level }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      if (interest === "data-science") navigate("/data-science");
      else if (interest === "web-dev") navigate("/web-development");
      else navigate("/thank-you");
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="survey-section">
      <div className="survey-content">
        <h1>🚀 Embark on Your Learning Adventure</h1>
        <p>Answer a few quick questions and we'll tailor the perfect path to your goals.</p>

        {/* Render custom progress bar */}
        {renderProgress()}

        <form className="survey-form" onSubmit={step === 4 ? handleSubmit : handleNext}>
          {step === 1 && (
             <>
      <h3 className="step-heading">📈 What Level you are</h3>
      <p>Choose your :</p>
      <div className="level-grid">
        {[ 
          { label: "Beginner", value: "Beginner" , desc:"If you are at very initial stage, lacking knowledge and practical experience. " ,icon:begin  },
          { label: "Novice", value: "Novice", desc:"You may have some basic understanding and skills, but still require significant guidance and support." , icon:novice },
          { label: "Professional  ", value: "Professional", desc:"If you are someone who actively seeks to improve their knowledge and skills throughout their career." , icon:proff },
        ].map((item) => (
          <div
            key={item.value}
            className={`level-card ${interest === item.value ? "selected" : ""}`}
            onClick={() => setInterest(item.value)}
          >
            <strong>{item.label}</strong>
            <p>{item.desc}</p>
            <div className="s-icon-box">
            <img src={item.icon} alt={item.label} />
            </div>
          </div>
        ))}
      </div>
      <button type="submit" disabled={!interest}>Continue</button>
    </>
          )}

          {step === 2 && (
            <>
              <h3 className="step-heading">🎯 What's your top goal?</h3>
              <div className="level-grid">
                {[
                  "Professional growth",
                  "Staying sharp",
                  "Excelling in school",
                  "Helping my child learn",
                  "Helping my students learn",
                  "Something else"
                ].map((goal) => (
                  <div
                    key={goal}
                    className={`level-card ${goal === goalSelection ? "selected" : ""}`}
                    onClick={() => setGoalSelection(goal)}
                  >
                    <strong>{goal}</strong>
                  </div>
                ))}
              </div>
              <button type="submit" disabled={!goalSelection}>Continue</button>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="step-heading">📚 What do you want to learn?</h3>
              <p>Choose your area of interest:</p>
              <div className="level-grid">
                {[
                  { label: "Excel", value: "Excel" },
                  { label: "PowerBI", value: "PowerBI" },
                  { label: "SQL", value: "sql" },
                  { label: "AI", value: "ai" },
                  { label: "Python", value: "python" },
                  { label: "Saturatory On Complince", value: "SOC" },
                  { label: "All of them", value: "all" },
                ].map((item) => (
                  <div
                    key={item.value}
                    className={`level-card ${interest === item.value ? "selected" : ""}`}
                    onClick={() => setInterest(item.value)}
                  >
                    <strong>{item.label}</strong>
                  </div>
                ))}
              </div>
              <button type="submit" disabled={!interest}>Continue</button>
            </>
          )}

          {step === 4 && (
            <>
              <h1>On What you Comfort Level</h1>
              <p>Choose your comfort level:</p>
              <div className="level-grid">
                {levels.map((item, i) => (
                  <div
                    key={i}
                    className={`level-card ${level === item.label ? "selected" : ""}`}
                    onClick={() => setLevel(item.label)}
                  >
                    <pre>{item.code}</pre>
                    <strong>{item.label}</strong>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
              <button type="submit" disabled={loading || !level}>
                {loading ? "Submitting..." : "Continue"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
