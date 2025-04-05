import "./table.css";
import { useState } from "react";
import ToolTip from "./ToolTip";
import { Link } from "react-router-dom";
export default function TrainTable() {


  const trainData = {
    team: [
      { Features: " ", Small: "", Medium: "", Enterprise: " " },
      { " ": "Live Training", Small: "tick", Medium: "tick", Large: "tick" },
      { " ": "User Approved Data", Small: "tick", Medium: "tick", Large: "tick" },
      { " ": "Current Infra", Small: "tick", Medium: "tick", Large: "tick" },
      { " ": "Industry example", Small: "tick", Medium: "tick", Large: "tick" },
      { " ": "Safety & Ethics", Small: "tick", Medium: "tick", Large: "tick" },
      { " ": "Reusable Recorded Session", Small: "cross", Medium: "cross", Large: "tick" },
    ],
    teamaddon: [
      { Addons: " ", Small: "", Medium: "", Enterprise: " " },
    ],
    firms: [
        { Features: " "	,Small: " "	,Pro: " "	 ,Enterprise: "  " },
        {"  ": "User Approved Data"	,Small: "tick"	 ,pro: "tick"	 ,Large: "tick" },
        {"  ": "Live Training"	,Small: "tick"	 ,pro: "tick"	 ,Large: "tick" },
        {"  ": "Current Infrastructure"	,Small: "tick"	 ,pro: "tick"	 ,Large: "tick" },
        {"  ": "Industry example"	,Small: "tick"	 ,pro: "tick"	 ,Large: "tick" },
        {"  ": "Safety & Ethics"	,Small: "tick"	 ,pro: "tick"	 ,Large: "tick" },
        {"  ": "Assignments"	,Small: "tick"	 ,pro: "tick"	 ,Large: "tick" },
        {"  ": "Free practice datasets and prompts"	,Small: "tick"	 ,pro: "tick"	 ,Large: "tick" },
        {"  ": "Graded benchmark and final assessments for Assignments"	,Small: "tick"	 ,pro: "tick"	 ,Large: "tick" },
        {"  ": "Team progress tracking & reporting"	 ,Small: "cross"	 ,pro: "tick"	 ,Large: "tick" },
        {"  ": "Custom billing options available"	 ,Small: "cross"	 ,pro: "tick"	 ,Large: "tick" },
        {"  ": "Course-level assessments & improvement reports"	 ,Small: "cross"	 ,pro: "tick"	 ,Large: "tick" },
        {"  ": "Weekly report Tracker"	 ,Small: "cross"	 ,pro: "tick"	 ,Large: "tick" },
        {"  ": "Blog Publishing Access (Legal) After Approval"	 ,Small: "cross"	 ,pro: "tick"	 ,Large: "tick" },
        {"  ": "AI Prompt Training"	 ,Small: "cross"	 ,pro: "cross"	 ,Large: "tick" },
        {"  ": "Reusable Recorded Session"	 ,Small: "cross"	 ,pro: "cross"	 ,Large: "tick" },
        {"  ": "Free trial available"	 ,Small: "cross"	 ,pro: "cross"	 ,Large: "tick" },
        {"  ": "Editable seat(Limit - min 30(Large)"	 ,Small: "cross"	 ,pro: "cross"	 ,Large: "tick" },
        {"  ": "Individual member Progress Report"	 ,Small: "cross"	 ,pro: "cross"	 ,Large: "tick" },
    ],
    firmsaddon:[
      { Features: " ", Small: "", Pro: "", Enterprise: " "},
      {"  ": "Team progress tracking & reporting"	 ,Small: "cross"	 ,pro: "tick"	 ,Large: "tick" },
      {"  ": "Custom billing options available"	 ,Small: "cross"	 ,pro: "tick"	 ,Large: "tick" },
      {"  ": "Course-level assessments & improvement reports"	 ,Small: "cross"	 ,pro: "tick"	 ,Large: "tick" },
      {"  ": "Weekly report Tracker"	 ,Small: "cross"	 ,pro: "tick"	 ,Large: "tick" },
      {"  ": "Blog Publishing Access (Legal) After Approval"	 ,Small: "cross"	 ,pro: "tick"	 ,Large: "tick" },
      {"  ": "AI Prompt Training"	 ,Small: "cross"	 ,pro: "cross"	 ,Large: "tick" },
      {"  ": "Reusable Recorded Session"	 ,Small: "cross"	 ,pro: "cross"	 ,Large: "tick" },
      {"  ": "Free trial available"	 ,Small: "cross"	 ,pro: "cross"	 ,Large: "tick" },
      {"  ": "Editable seat(Limit - min 30(Large)"	 ,Small: "cross"	 ,pro: "cross"	 ,Large: "tick" },
      {"  ": "Individual member Progress Report"	 ,Small: "cross"	 ,pro: "cross"	 ,Large: "tick" },  
    ],
    education: [
      { Features: " ", School: "", Collage: "", Institute: " " },
      { " ": "Live Training", small: "tick", Medium: "tick", Large: "tick" },
      { " ": "User Approved Data", Small: "tick", Medium: "tick", Large: "tick" },
      { " ": "Current Infra", Small: "tick", Medium: "tick", Large: "tick" },
      { " ": "Industry example", Small: "tick", Medium: "tick", Large: "tick" },
      { " ": "Safety & Ethics", Small: "tick", Medium: "tick", Large: "tick" },
      { " ": "Reusable Recorded Session", Small: "cross", Medium: "tick", Large: "tick" },
    ],
    educationaddon:[
      { Features: " ", School: "", Collage: "", Institute: " " },
    ],
  };

  const [selectedMainTable, setSelectedMainTable] = useState("team");

  // Mapping main tables to their respective addon tables
  const addonTableMap = {
    team: "teamaddon",
    firms: "firmsaddon",
    education: "educationaddon"
  };

  return (
    <div className="trin-wrapper">
    <div className="table-container">
      <h1>Compare Plans</h1>
      <div className="plan-view">
        <ul className="view-box">
          <li
            className={selectedMainTable === "team" ? "p-active" : ""}
            onClick={() => setSelectedMainTable("team")}
          >
            For Teams
          </li>
          <li
            className={selectedMainTable === "firms" ? "p-active" : ""}
            onClick={() => setSelectedMainTable("firms")}
          >
            For Firms
          </li>
          <li
            className={selectedMainTable === "education" ? "p-active" : ""}
            onClick={() => setSelectedMainTable("education")}
          >
            For Education Institute
          </li>
        </ul>
      </div>

      {/* Main Table */}
      <div className="table-div">
      <table>
        <thead>
          <tr>
            {Object.keys(trainData[selectedMainTable][0]).map((key) => (
              <th key={key}>{key.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {trainData[selectedMainTable].map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx} className={value}>
                  {value === "tick" ? "" : value === "cross" ? "" : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
<h1>Addons</h1>
      
{addonTableMap[selectedMainTable] && (
  <table>
    <thead>
      <tr>
        {Object.keys(trainData[addonTableMap[selectedMainTable]][0]).map((key) => (
          <th key={key}>{key.toUpperCase()}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {trainData[addonTableMap[selectedMainTable]].map((row, index) => (
        <tr key={index}>
          {Object.values(row).map((value, idx) => (
            <td key={idx}>
              { value === "tick" ? (
                <span className={value}></span>
              ) : value === "cross" ? (
                <ToolTip text="Contact Sales team for get your Add-Ons">
                <span className="add-on">Add-On</span>
                </ToolTip>          
              ) : (
                value
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)}
</div>
<Link to="/sales"><button className="btn talk-btn">Contact Sales Team</button></Link>

    </div>
    </div>
  );
}