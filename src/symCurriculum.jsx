import React, { useState } from "react";
import "./symCurriculum.css";
import ToolTip from "./ToolTip";
import { Link } from "react-router-dom";

export default function SymCurriculum({ curriculumData }) {
  const [expandedModules, setExpandedModules] = useState({});

  const toggleExpand = (week) => {
    setExpandedModules((prev) => ({
      ...prev,
      [week]: !prev[week]
    }));
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "topic":
        return "📄";
      case "project":
        return "📝";
      default:
        return "🗃️";
    }
  };

  return (
    <div className="curriculum-container">
      {curriculumData.map((section, idx) => {
        const expanded = expandedModules[section.week];
        return (
          <div key={idx} className="curriculum-section">
            <div
              className={`section-header ${expanded ? "expanded" : ""}`}
              onClick={() => toggleExpand(section.week)}
            >
              <h3>
                {section.week} - {section.module}
              </h3>
              <div className="header-right">
                <span className="toggle">{expanded ? "−" : "+"}</span>
              </div>
            </div>
            <div className={`section-content-wrapper ${expanded ? "open" : "closed"}`}>
              <div className="section-content">
                <p className="module-description">{section.description}</p>
                <ul className="resource-list">
                  {section.resources.map((res, rIdx) => (
                    <li key={rIdx} className="resource-item">
                      <span className="icon">{getFileIcon(res.type)}</span>
                      <a className="label" rel="noreferrer">
                        {res.label}
                      </a>
                      <ToolTip text="Project">
                      <Link>{res.type == "project" ? "⚗️" : " "}</Link>
                      </ToolTip>
                    </li>
                  ))}
                </ul>
                <div className="assignment-card">
                  <strong>{section.assignment}</strong>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
