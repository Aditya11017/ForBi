import { Link } from "react-router-dom";
import "./userType.css";
import person from "./assets/images/personpc.svg";
import persong from "./assets/images/personpcg.svg";
import team from "./assets/images/teampc.svg";
import teamg from "./assets/images/teampcg.svg";
import insti from "./assets/images/instipcw.svg";
import instig from "./assets/images/instipcwg.svg";
import custom from "./assets/images/custom.svg";
import customg from "./assets/images/customg.svg";

import { useState } from "react";
import ToolTip from "./ToolTip";
import SignButton from "./components/SignButton";

export default function UserType() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="user-type-container">
      <div className="user-type-div">
        <h1>Welcome! Let’s match you to the right learning track.</h1>
        <h3>Choose the plan to unlock a personalized experience.</h3>
        <div className="user-type-box">
          {/* Personal */}
        
          <div
  className={`user-single ${
    selectedPlan === "personal" ? "selected" : ""
  }`}
  onClick={() => handlePlanSelection("personal")}
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
            className={`user-team ${
              selectedPlan === "team" ? "selected" : ""
            }`}
            onClick={() => handlePlanSelection("team")}
          >
    <span className="elite-tag">FormulaBI<span className="for-elite-tag">+Elite</span></span>
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
            className={`user-instuition ${
              selectedPlan === "institution" ? "selected" : ""
            }`}
            onClick={() => handlePlanSelection("institution")}
          >
            
    <Link className="elite-link" to="/FormulaBIElite"><span className="elite-tag">
    
        FormulaBI<span className="for-elite-tag">+Elite</span>
        </span></Link>
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
            className={`user-custom ${
              selectedPlan === "custom" ? "selected" : ""
            }`}
            onClick={() => handlePlanSelection("custom")}
          >
    <span className="elite-tag">FormulaBI<span className="for-elite-tag">+Elite</span></span>
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
    <SignButton>
      {selectedPlan === "custom" ? "Check Plans" : "Next"}
    </SignButton>
  </Link>
) : (
  <div className="plan-btn">
    <SignButton>Next</SignButton>
  </div>
)}


      </div>
    </div>
  );
}
