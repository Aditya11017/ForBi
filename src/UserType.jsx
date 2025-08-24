import { Link, useNavigate } from "react-router-dom";
import "./userType.css";
import person from "./assets/images/personpc.svg";
import persong from "./assets/images/personpcg.svg";
import team from "./assets/images/teampc.svg";
import teamg from "./assets/images/teampcg.svg";
import insti from "./assets/images/instipcw.svg";
import instig from "./assets/images/instipcwg.svg";
import custom from "./assets/images/custom.svg";
import customg from "./assets/images/customg.svg";

import { useState, useEffect } from "react";
import ToolTip from "./ToolTip";
import SignButton from "./components/SignButton";

export default function UserType() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  // 🔹 Handle Enter key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && selectedPlan) {
        e.preventDefault();
        if (selectedPlan === "custom") {
          navigate("/FormulaBIElite");
        } else if (selectedPlan === "personal") {
          navigate("/IndividualUser");
        } else if (selectedPlan === "team") {
          navigate("/Teams");
        } else if (selectedPlan === "institution") {
          navigate("/Institution");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPlan, navigate]);

  return (
    <div className="user-type-container">
      <div className="user-type-div">
        <h1>Welcome! Let’s match you to the right learning track.</h1>
        <h3>Choose the plan to unlock a personalized experience.</h3>
        <Link to="/FormulaBIElite"><button className="elite-btn" >Check Plans</button></Link>
        <div className="user-type-box">
          {/* Personal */}
          <div
            className={`user-single ${selectedPlan === "personal" ? "selected" : ""}`}
            onClick={() => handlePlanSelection("personal")}
            tabIndex={0}
          >
            <h2 className="type-head">Personal</h2>
            <div className="user-box">
              <span className="person-img">
                <img
                  className="person-img"
                  src={selectedPlan === "personal" ? persong : person}
                  alt="Personal"
                />
              </span>
              <p>If you’re learning solo and want a personalized experience.</p>
            </div>
          </div>

          {/* Teams */}
          <div
            className={`user-team ${selectedPlan === "team" ? "selected" : ""}`}
            onClick={() => handlePlanSelection("team")}
            tabIndex={0}
          >
            <span className="elite-tag">
              FormulaBI<span className="for-elite-tag">+Elite</span>
            </span>
            <h2 className="type-head">Teams</h2>
            <div className="user-box">
              <span>
                <img
                  className="person-img"
                  src={selectedPlan === "team" ? teamg : team}
                  alt="teams"
                />
              </span>
              <p>A perfect solution for teams and groups focused on shared learning experiences.</p>
            </div>
          </div>

          {/* Institution */}
          <div
            className={`user-instuition ${selectedPlan === "institution" ? "selected" : ""}`}
            onClick={() => handlePlanSelection("institution")}
            tabIndex={0}
          >
            <Link className="elite-link" to="/FormulaBIElite">
              <span className="elite-tag">
                FormulaBI<span className="for-elite-tag">+Elite</span>
              </span>
            </Link>
            <h2 className="type-head">Institution</h2>
            <div className="user-box">
              <span>
                <img
                  className="person-img"
                  src={selectedPlan === "institution" ? instig : insti}
                  alt="institution"
                />
              </span>
              <p>Designed for collaborative learning for corporate, academic, or nonprofit spheres.</p>
            </div>
          </div>

          {/* Custom */}
          <div
            className={`user-custom ${selectedPlan === "custom" ? "selected" : ""}`}
            onClick={() => handlePlanSelection("custom")}
            tabIndex={0}
          >
            <span className="elite-tag">
              FormulaBI<span className="for-elite-tag">+Elite</span>
            </span>
            <h2 className="type-head">Custom</h2>
            <div className="user-box">
              <span>
                <img
                  className="person-img"
                  src={selectedPlan === "custom" ? customg : custom}
                  alt="custom"
                />
              </span>
              <p>Customized training programs tailored to your unique requirements.</p>
            </div>
          </div>
        </div>

        {/* Button */}
        {selectedPlan ? (
          <Link
            className="plan-btn"
            to={
              selectedPlan === "custom"
                ? "/FormulaBIElite"
                : selectedPlan === "personal"
                ? "/IndividualUser"
                : selectedPlan === "team"
                ? "/Teams"
                : selectedPlan === "institution"
                ? "/Institution"
                : "/"
            }
          >
            <SignButton>{selectedPlan === "custom" ? "Check Plans" : "Next"}</SignButton>
          </Link>
        ) : (
          <div className="plan-btn">
            <SignButton>Next</SignButton>
          </div>
        )}
        <Link to="/Dashboard" className="skip-link">Goto Dashboard</Link>
      </div>
    </div>
  );
}
