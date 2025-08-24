
import "./excelSym.css";
import { Link } from "react-router-dom";
import SymCurriculum from "./symCurriculum";
import TimelineBar from "./TimelineBar";
import OptionBar from "./OptionBar";
import corem from "./assets/images/corem.svg";
import advm from "./assets/images/advm.svg";
import prom from "./assets/images/prom.svg";
import compm from "./assets/images/compm.svg";
import { useState } from "react";



export default function  SocSymposium() {
  const socSessions = [
  {
    id: 3,
    title:         "Statutory Compliance Core",
    imgBg:         " #615fdf",
    img:           corem,
    date:          "2025-05-20",
    enddate:       "2025-05-26",
    description:   "Foundations of data cleaning with Power Query M.",
    tags:          ["Basics","Query"],
    price:         "$29",
    mrp:           "$49",
    symLink:       "/sessions/powerbi/core",
    sessionIDTag:  "soc_core",
    progress:      26,
    milestoneWeek: 2.5
  },
  {
    id: 4,
    title:         "Statutory Compliance Advance",
    imgBg:         " #615fdf",
    img:           advm,
    date:          "2025-05-27",
    enddate:       "2025-06-02",
    description:   "In-depth DAX & viz techniques.",
    tags:          ["DAX","Viz"],
    price:         "$39",
    mrp:           "$59",
    symLink:       "/sessions/powerbi/advance",
    sessionIDTag:  "soc_adv",
    progress:      50,
    milestoneWeek: 5
  },
  {
    id: 5,
    title:         "Statutory Compliance Proficient",
    imgBg:         " #615fdf",
    img:            prom,
    date:          "2025-06-03",
    enddate:       "2025-06-09",
    description:   "Expert analytics & perf tuning.",
    tags:          ["Advanced","Perf"],
    price:         "$49",
    mrp:           "$69",
    symLink:       "/sessions/powerbi/proficient",
    sessionIDTag:  "soc_pro",
    progress:      80,
    milestoneWeek: 8
  },
  {
    id: 6,
    title:         "Statutory Compliance Complete",
    imgBg:         " #615fdf",
    img:           compm,
    date:          "2025-05-20",
    enddate:       "2025-06-09",
    description:   "All modules in one bundle.",
    tags:          ["Complete","Bundle"],
    price:         "$99",
    mrp:           "$149",
    symLink:       "/sessions/powerbi/full-course",
    sessionIDTag:  "soc_complete",
    progress:     100,
    milestoneWeek: 10
  }
]
  const socCurriculum = {
    "Statutory Compliance Core": [/* ... core modules ... */
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
        { week: "Week 2",
         module: "Module 2",
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
    "Statutory Compliance Advance": [/* ... advance modules ... */
      {
        week: "Week 3",
        module: "Module 3",
        description: "Foundations of the course and intro materials.",
        assignment: "Assignment - Welcome Quiz",
        resources: [
          { label: "Course Overview.pdf", type: "pdf", url: "#" },
          { label: "Introduction Slides.pptx", type: "ppt", url: "#" }
        ]
      },
      {
        week: "Week 4",
        module: "Module 4",
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
    "Statutory Compliance Proficient": [/* ... proficient modules ... */
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
    "Statutory Compliance Full Course": [/* ... full course modules ... */
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
  const [selectedTab, setSelectedTab] = useState(0);
const currentSessionTitle = socSessions[selectedTab]?.title || socSessions[0].title;


  return (
    <div className="ex-sym-container">
      <div className="ex-sym-box">
        <div className="e-sym-box">
          <h1>Statutory Compliance Symposium Training Program</h1>
          <h2>Master Statutory Compliance from Basics to Brilliance—Fast, Practical, and Project-Driven.</h2>
          <h4>
          Master Statutory Compliance with our online training, tailored for data science, analytics, and finance professionals...
          </h4>
          <div className="excel-session-card">
      <OptionBar
                weeksCount={9}
                sessions={socSessions}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
              />
              <div className="le-sessions-info">
                <h1>Session Curriculum</h1>
                <div className="curriculum-box">
                  <SymCurriculum curriculumData={socCurriculum[currentSessionTitle] || []} />
                </div>
</div>
        </div>
        </div>
      </div>
    </div>
  );
}















