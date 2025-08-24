
import React, { useState } from "react";
import "./excelSym.css";
import SymCurriculum from "./symCurriculum";
import OptionBar from "./OptionBar";
import corem from "./assets/images/corem.svg";
import advm from "./assets/images/advm.svg";
import prom from "./assets/images/prom.svg";
import compm from "./assets/images/compm.svg";

// 1. Sessions array FIRST
const powerbiSessions = [
  {
    id: 3,
    title:         "Power BI Technician",
    imgBg:         " #bd972d",
    img:           corem,
    date:          "2025-05-20",
    enddate:       "2025-05-26",
    description:   "Foundations of data cleaning with Power Query M.",
    tags:          ["Basics","Query"],
    price:         "₹ 1,799.00 ",
    mrp:           "₹ 3,999.00",
    symLink:       "/sessions/powerbi/core",
    sessionIDTag:  "powerbi-core",
    progress:      20,
    milestoneWeek: 1.5
  },
  {
    id: 4,
    title:         "Power BI Master",
    imgBg:         " #bd972d",
    img:           advm,
    date:          "2025-05-27",
    enddate:       "2025-06-02",
    description:   "In-depth DAX & viz techniques.",
    tags:          ["DAX","Viz"],
    price:         "₹ 3,999.00",
    mrp:           "₹ 7,999.00",
    symLink:       "/sessions/powerbi/advance",
    sessionIDTag:  "powerbi-advance",
    progress:      50,
    milestoneWeek: 4
  },
  {
    id: 5,
    title:         "Power BI Specialist",
    imgBg:         " #bd972d",
    img:           prom,
    date:          "2025-06-03",
    enddate:       "2025-06-09",
    description:   "Expert analytics & perf tuning.",
    tags:          ["Advanced","Perf"],
    price:         "₹ 6,999.00",
    mrp:           "₹ 11,999.00",
    symLink:       "/sessions/powerbi/proficient",
    sessionIDTag:  "powerbi-proficient",
    progress:      89,
    milestoneWeek: 7
  },
  {
    id: 6,
    title:         "Power BI Complete",
    imgBg:         " #bd972d",
    img:           compm,
    date:          "2025-05-20",
    enddate:       "2025-06-09",
    description:   "All modules in one bundle.",
    tags:          ["Complete","Bundle"],
    price:         "₹ 9,999.00",
    mrp:           "₹ 14,999.00",
    symLink:       "/sessions/powerbi/full-course",
    sessionIDTag:  "powerbi-full-course",
    progress:     100,
    milestoneWeek: 8
  }
];

// ... and curriculum object

const powerbiCurriculum =  {
   "Power BI Technician": [/* ... core modules ... */
    { 
     week: "Module 1",
        module: "Core Power BI",
        description: "Foundations of the course and intro materials.",
        assignment: "Assignment - Power BI",
        resources: [
          { label: "Introduction to Power BI", type: "topic", url: "#" },
          { label: "Power BI ETL", type: "topic", url: "#" },
          { label: "Introduction to Power Query", type: "topic", url: "#" },
        ]
       },
       { week: "Module 2",
        module: "Power BI Environment",
        description: "Introduction to key business concepts and data tables.",
        assignment: "Assignment - Economics Quiz",
        resources: [
          { label: "Lecture 2 - Business Applications.pptx", type: "ppt", url: "#" },
          { label: "t-table.pdf", type: "pdf", url: "#" },
          { label: "Z-distribution.pdf", type: "pdf", url: "#" },
          { label: "Random Number Table.pdf", type: "pdf", url: "#" }
        ]
       },
       { week: "Module 3",
        module: "Power BI Environment",
        description: "Introduction to key business concepts and data tables.",
        assignment: "Assignment - Economics Quiz",
        resources: [
          { label: "Lecture 2 - Business Applications.pptx", type: "ppt", url: "#" },
          { label: "t-table.pdf", type: "pdf", url: "#" },
          { label: "Z-distribution.pdf", type: "pdf", url: "#" },
          { label: "Random Number Table.pdf", type: "pdf", url: "#" }
        ]
       }
   ],
   "Power BI Master": [/* ... advance modules ... */
     {
       week: "Module 4",
       module: "Power BI project",
       description: "Foundations of the course and intro materials.",
       assignment: "Assignment - Welcome Quiz",
       resources: [
         { label: "Course Overview.pdf", type: "pdf", url: "#" },
         { label: "Introduction Slides.pptx", type: "ppt", url: "#" }
       ]
     },
     {
       week: "Module 5",
       module: "Power BI Grpahs",
       description: "Introduction to key business concepts and data tables.",
       assignment: "Assignment - Economics Quiz",
       resources: [
         { label: "Lecture 2 - Business Applications.pptx", type: "ppt", url: "#" },
         { label: "t-table.pdf", type: "pdf", url: "#" },
         { label: "Z-distribution.pdf", type: "pdf", url: "#" },
         { label: "Random Number Table.pdf", type: "pdf", url: "#" }
       ]
     },
     {
       week: "Module 6",
       module: "Power BI Grpahs",
       description: "Introduction to key business concepts and data tables.",
       assignment: "Assignment - Economics Quiz",
       resources: [
         { label: "Lecture 2 - Business Applications.pptx", type: "ppt", url: "#" },
         { label: "t-table.pdf", type: "pdf", url: "#" },
         { label: "Z-distribution.pdf", type: "pdf", url: "#" },
         { label: "Random Number Table.pdf", type: "pdf", url: "#" }
       ]
     },{
       week: "Module 7",
       module: "Power BI Grpahs",
       description: "Introduction to key business concepts and data tables.",
       assignment: "Assignment - Economics Quiz",
       resources: [
         { label: "Lecture 2 - Business Applications.pptx", type: "ppt", url: "#" },
         { label: "t-table.pdf", type: "pdf", url: "#" },
         { label: "Z-distribution.pdf", type: "pdf", url: "#" },
         { label: "Random Number Table.pdf", type: "pdf", url: "#" }
       ]
     },
     {
       week: "Module 8",
       module: "Power BI Grpahs",
       description: "Introduction to key business concepts and data tables.",
       assignment: "Assignment - Economics Quiz",
       resources: [
         { label: "Lecture 2 - Business Applications.pptx", type: "ppt", url: "#" },
         { label: "t-table.pdf", type: "pdf", url: "#" },
         { label: "Z-distribution.pdf", type: "pdf", url: "#" },
         { label: "Random Number Table.pdf", type: "pdf", url: "#" }
       ]
     }
   ], 
   "Power BI Specialist": [/* ... proficient modules ... */
     {week: "Week 5",
       module: "Module 5",
       description: "Foundations of the course and intro materials.",
       assignment: "Assignment - Welcome Quiz",
       resources: [
         { label: "Course Overview.pdf", type: "pdf", url: "#" },
         { label: "Introduction Slides.pptx", type: "ppt", url: "#" }
       ]
     },
     {
       week: "Week 6",
       module: "Module 6",
       description: "Introduction to key business concepts and data tables.",
       assignment: "Assignment - Economics Quiz",
       resources: [
         { label: "Lecture 2 - Business Applications.pptx", type: "ppt", url: "#" },
         { label: "t-table.pdf", type: "pdf", url: "#" },
         { label: "Z-distribution.pdf", type: "pdf", url: "#" },
         { label: "Random Number Table.pdf", type: "pdf", url: "#" }
       ]
     }
   ],
   "Power BI Complete": [/* ... full course modules ... */
     {
       week: "Week 1",
       module: "Module 1",
       description: "Foundations of the course and intro materials.",
        assignment: "Assignment - Welcome Quiz",
        resources: [
          { label: "Course Overview.pdf", type: "pdf", url: "#" },
          { label: "Introduction Slides.pptx", type: "ppt", url: "#" }
        ]
       },
       {week: "Week 2",
         module: "Module 2",
         description: "Introduction to key business concepts and data tables.",
         assignment: "Assignment - Economics Quiz",
         resources: [
           { label: "Lecture 2 - Business Applications.pptx", type: "ppt", url: "#" },
           { label: "t-table.pdf", type: "pdf", url: "#" },
           { label: "Z-distribution.pdf", type: "pdf", url: "#" },
           { label: "Random Number Table.pdf", type: "pdf", url: "#" }
         ] 
       },{
       week: "Week 3",
       module: "Module 3",   
       description: "Foundations of the course and intro materials.",
       assignment: "Assignment - Welcome Quiz", 
       resources: [
         { label: "Course Overview.pdf", type: "pdf", url: "#" },
         { label: "Introduction Slides.pptx", type: "ppt", url: "#" }
       ] 
       },{week: "Week 4",
         module: "Module 4",
         description: "Introduction to key business concepts and data tables.",
         assignment: "Assignment - Economics Quiz",
         resources: [
           { label: "Lecture 2 - Business Applications.pptx", type: "ppt", url: "#" },
           { label: "t-table.pdf", type: "pdf", url: "#" },
           { label: "Z-distribution.pdf", type: "pdf", url: "#" },
           { label: "Random Number Table.pdf", type: "pdf", url: "#" }
         ]
       },{week: "Week 5",
         module: "Module 5",
         description: "Foundations of the course and intro materials.",
         assignment: "Assignment - Welcome Quiz",
         resources: [
           { label: "Course Overview.pdf", type: "pdf", url: "#" },
           { label: "Introduction Slides.pptx", type: "ppt", url: "#" }
         ]
       },{week: "Week 6",
         module: "Module 6",
         description: "Introduction to key business concepts and data tables.",
         assignment: "Assignment - Economics Quiz",
         resources: [
           { label: "Lecture 2 - Business Applications.pptx", type: "ppt", url: "#" },
           { label: "t-table.pdf", type: "pdf", url: "#" },
           { label: "Z-distribution.pdf", type: "pdf", url: "#" },
           { label: "Random Number Table.pdf", type: "pdf", url: "#" }
         ]
       },{week: "Week 7",
         module: "Module 7",
         description: "Foundations of the course and intro materials.",
         assignment: "Assignment - Welcome Quiz",
         resources: [
           { label: "Course Overview.pdf", type: "pdf", url: "#" },
           { label: "Introduction Slides.pptx", type: "ppt", url: "#" }
         ]
       },{week: "Bonus Week",
         module: "Bonus Module",
         description: "Introduction to key business concepts and data tables.",
         assignment: "Assignment - Economics Quiz",
         resources: [
           { label: "Lecture 2 - Business Applications.pptx", type: "ppt", url: "#" },
           { label: "t-table.pdf", type: "pdf", url: "#" },
           { label: "Z-distribution.pdf", type: "pdf", url: "#" },
           { label: "Random Number Table.pdf", type: "pdf", url: "#" }
         ]
       }
   ]
 }

export default function PowerBISymposiumSpl() {
  // 2. useState and derived variables NOW
  const [selectedTab, setSelectedTab] = useState(0);

  // Defensive: check index to avoid crash if out of range
  const currentSessionTitle = powerbiSessions[selectedTab]?.title || powerbiSessions[0].title;

  return (
    <div className="ex-sym-container">
      <div className="ex-sym-box">
        <div className="e-sym-box">
          <h1>Power BI Specialist Symposium Training Program</h1>
          <h2>Master Power BI from Basics to Brilliance—Fast, Practical, and Project-Driven.</h2>
          <h4>
            Learn Power BI from the ground up! This training takes you from core skills like data cleaning with Power Query M to advanced analytics...
          </h4>
          <div className="excel-session-card">
            <OptionBar
              weeksCount={7}
              sessions={powerbiSessions}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
            />

            <div className="le-sessions-info">
              <h1>Session Curriculum</h1>
              <div className="curriculum-box">
                <SymCurriculum curriculumData={powerbiCurriculum[currentSessionTitle] || []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


