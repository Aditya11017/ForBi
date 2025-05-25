// ExcelSymposium.jsx
import "./excelSym.css";
import SymCurriculum from "./symCurriculum";
import OptionBar from "./OptionBar";
import corem from "./assets/images/corem.svg";
import advm from "./assets/images/advm.svg";
import prom from "./assets/images/prom.svg";
import compm from "./assets/images/compm.svg";




export default function ExcelSymposium() {
  const excelSessions = [
  {
    id: 1,
    title:         "Excel Core",
    imgBg:         "	#40976A",
    img:           corem,
    date:          "2025-06-01",
    enddate:       "2025-06-07",
    description:   "Sheets, formulas & formatting basics.",
    tags:          ["Basics","Formulas"],
    price:         "₹ 1,999",
    mrp:           "₹ 2,999",
    symLink:       "/sessions/excel/core",
    sessionIDTag:  "excel-core",
    progress:      20,
    milestoneWeek: 1.5
  },
  {
    id: 2,
    title:         "Excel Advance",
    imgBg:         " #40976A",
    img:           advm,
    date:          "2025-06-08",
    enddate:       "2025-06-14",
    description:   "PivotTables, Power Query & charts.",
    tags:          ["Pivot","Query"],
    price:         "₹ 2,999",
    mrp:           "₹ 4,999",
    symLink:       "/sessions/excel/advance",
    sessionIDTag:  "excel-advance",
    progress:      50,
    milestoneWeek: 4
  },
  {
    id: 3,
    title:         "Excel Proficient",
    imgBg:         " #40976A",
    img:           prom,
    date:          "2025-06-15",
    enddate:       "2025-06-21",
    description:   "Dashboards, VBA & automation.",
    tags:          ["Dashboards","VBA"],
    price:         "₹ 4,999",
    mrp:           "₹ 7,999",
    symLink:       "/sessions/excel/proficient",
    sessionIDTag:  "excel-proficient",
    progress:      89,
    milestoneWeek: 7
  },
  {
    id: 4,
    title:         "Excel Full Course",
    imgBg:         " #40976A",
    img:           compm,
    date:          "2025-06-01",
    enddate:       "2025-06-21",
    description:   "Complete bundle.",
    tags:          ["Complete","Bundle"],
    price:         "₹ 7,999",
    mrp:           "₹ 11,999",
    symLink:       "/sessions/excel/full-course",
    sessionIDTag:  "excel-full-course",
    progress:     100,
    milestoneWeek: 8
  }
]
  const excelCurriculum = [
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
    {
      week: "Week 2",
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
  ];

  
  return (
    <div className="ex-sym-container">
      <div className="ex-sym-box">
        <div className="e-sym-box">
          <h1>Microsoft Excel Symposium Training Program</h1>
          <h2>Master Excel from Basics to Brilliance—Fast, Practical, and Project-Driven.</h2>
          <h4>
            Gain a deep understanding of Excel from the ground up by learning
            its fundamentals and advancing to complex features...
          </h4>
          <div className="excel-session-card">
       <OptionBar weeksCount={7} sessions={excelSessions}>
        </OptionBar>

<div className="le-sessions-info">
    <h1>Schedule</h1>
    <p>The following are the important dates you’ll need to keep in mind for enrollment and the start of the session. Please take note of them to ensure you complete all necessary steps on time. </p>
    
    <h1>Session Curriculum</h1>
    <div className="curriculum-box">
    <SymCurriculum curriculumData={excelCurriculum} />
    </div>
</div>
        </div>
        </div>
      </div>
    </div>
  );
}
