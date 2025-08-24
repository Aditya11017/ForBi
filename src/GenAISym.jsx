
import "./excelSym.css";
import SymCurriculum from "./symCurriculum";
import OptionBar from "./OptionBar";
import corem from "./assets/images/corem.svg";
import advm from "./assets/images/advm.svg";
import prom from "./assets/images/prom.svg";
import compm from "./assets/images/compm.svg";
import { useState } from "react";



export default function  GenAISymposium() {

  const genaiSessions = [
  {
    id: 3,
    title:         "Gen AI Core",
    imgBg:         " #458d79",
    img:           corem,
    date:          "2025-05-20",
    enddate:       "2025-05-26",
    description:   "Foundations of working with Artificeail Intelligence.",
    tags:          ["Basics","Query"],
    price:         "₹ 999.00",
    mrp:           "₹ 1,499.00",
    symLink:       "/sessions/powerbi/core",
    sessionIDTag:  "gen_ai_core",
    progress:      20,
    milestoneWeek: 1.5
  },
  {
    id: 4,
    title:         "Gen AI Advance",
    imgBg:         " #458d79",
    img:           advm,
    date:          "2025-05-27",
    enddate:       "2025-06-02",
    description:   "In-depth working with AI",
    tags:          ["DAX","Viz"],
    price:         "₹ 2,999.00",
    mrp:           "₹ 5,999.00",
    symLink:       "/sessions/powerbi/advance",
    sessionIDTag:  "gen_ai_adv",
    progress:      50,
    milestoneWeek: 4
  },
  {
    id: 5,
    title:         "Gen AI Proficient",
    imgBg:         " #458d79",
    img:           prom,
    date:          "2025-06-03",
    enddate:       "2025-06-09",
    description:   "Expert analytics & perf tuning.",
    tags:          ["Advanced","Perf"],
    price:         "₹ 4,999.00",
    mrp:           "₹ 9,999.00",
    symLink:       "/sessions/powerbi/proficient",
    sessionIDTag:  "gen_ai_pro",
    progress:      89,
    milestoneWeek: 7
  },
  {
    id: 6,
    title:         "Gen AI Complete",
    imgBg:         " #458d79",
    img:           compm,
    date:          "2025-05-20",
    enddate:       "2025-06-09",
    description:   "All modules in one bundle.",
    tags:          ["Complete","Bundle"],
    price:         "₹ 7,499.00",
    mrp:           "₹ 9,999.00",
    symLink:       "/sessions/powerbi/full-course",
    sessionIDTag:  "gen_ai_complete",
    progress:     100,
    milestoneWeek: 8
  }
]
  const genaiCurriculum =   {
    "Gen AI Core": [/* ... core modules ... */
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
    "Gen AI Advance": [/* ... advance modules ... */
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
    "Gen AI Proficient": [/* ... proficient modules ... */
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
    "Gen AI Complete": [/* ... full course modules ... */
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
const currentSessionTitle = genaiSessions[selectedTab]?.title || genaiSessions[0].title;
  return (
    
    <div className="ex-sym-container">
      <div className="ex-sym-box">
        <div className="e-sym-box">
          <h1>Gen AI Symposium Training Program</h1>
          <h2>Master Gen AI from Basics to Brilliance—Fast, Practical, and Project-Driven.</h2>
          <h4>
          Master Gen AI with our online training, tailored for data science, analytics, and finance professionals...
          </h4>
          <div className="excel-session-card">
      <OptionBar
                weeksCount={7}
                sessions={genaiSessions}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
              />
              <div className="le-sessions-info">
                <h1>Session Curriculum</h1>
                <div className="curriculum-box">
                  <SymCurriculum curriculumData={genaiCurriculum[currentSessionTitle] || []} />
                </div>

</div>
        </div>
        </div>
      </div>
    </div>
  );
}






