import React, { useState } from "react";
import "./excelSym.css";
import SymCurriculum from "./symCurriculum";
import OptionBar from "./OptionBar";
import corem from "./assets/images/corem.svg";
import advm from "./assets/images/advm.svg";
import prom from "./assets/images/prom.svg";
import compm from "./assets/images/compm.svg";

// Example data structure
const excelSessions = [
  {
    id: 1,
    title: "Excel Core",
    imgBg: "#40976A",
    img: corem,
    date: "2025-06-01",
    enddate: "2025-06-07",
    description: "Sheets, formulas & formatting basics.",
    tags: ["Basics", "Formulas"],
    price: "₹ 1,999",
    mrp: "₹ 2,999",
    symLink: "/sessions/excel/core",
    sessionIDTag: "exl_core",
    progress: 20,
    milestoneWeek: 1.5
  },
  {
    id: 2,
    title: "Excel Advance",
    imgBg: "#40976A",
    img: advm,
    date: "2025-06-08",
    enddate: "2025-06-14",
    description: "PivotTables, Power Query & charts.",
    tags: ["Pivot", "Query"],
    price: "₹ 2,999",
    mrp: "₹ 4,999",
    symLink: "/sessions/excel/advance",
    sessionIDTag: "exl_adv",
    progress: 50,
    milestoneWeek: 4
  },
  {
    id: 3,
    title: "Excel Proficient",
    imgBg: "#40976A",
    img: prom,
    date: "2025-06-15",
    enddate: "2025-06-21",
    description: "Dashboards, VBA & automation.",
    tags: ["Dashboards", "VBA"],
    price: "₹ 4,999",
    mrp: "₹ 7,999",
    symLink: "/sessions/excel/proficient",
    sessionIDTag: "exl_pro",
    progress: 89,
    milestoneWeek: 7
  },
  {
    id: 4,
    title: "Excel Complete",
    imgBg: "#40976A",
    img: compm,
    date: "2025-06-01",
    enddate: "2025-06-21",
    description: "Complete bundle.",
    tags: ["Complete", "Bundle"],
    price: "₹ 7,999",
    mrp: "₹ 11,999",
    symLink: "/sessions/excel/full-course",
    sessionIDTag: "exl_complete",
    progress: 100,
    milestoneWeek: 8
  }
];

const excelCurriculum = {
  "Excel Core": [/* ... core modules ... */
   { 
    week: "Module 1",
       module: "Core Excel Fundamentals",
       description: "Foundations of Excel and introduction to core functionalities.",
       assignment: "Assignment - Sheet Setup",
       resources: [
         { label: "Excel Introduction", type: "topic", url: "#" },
         { label: "Legecy Excel ", type: "topic", url: "#" },
         { label: "Custom Format & Formating", type: "project", url: "#" },
         { label: "Referenace & Functions", type: "project", url: "#" }
       ]
      },
      { week: "Module 2",
       module: "Core Excel Data Setup Fundamentals", // Visualization Fundamentals
       description: "How to structuring data properly to facilitate analysis in Excel.",
       assignment: "Assignment - Loan Amortization Sheet(Part-1)",
       resources: [
         { label: "Data Setup Fundamentals", type: "topic", url: "#" },
         { label: "Conditional Formatting", type: "project", url: "#" },
         { label: "Data Cleaning Setup", type: "topic", url: "#" },
       ]
      },
      { week: "Module 3",
       module: "Core Excel Visualization Fundamentals", // 
       description: "How to visualised data in Excel.",
       assignment: "Assignment - Loan Amortization Sheet(Part-2)",
       resources: [
         { label: "Excel Charts Fundamentals", type: "project", url: "#" },
         { label: "Conditional Formatting with tables", type: "project", url: "#" },
         { label: "Data Validation", type: "project", url: "#" },
       ]
      }
  ],
  "Excel Advance": [/* ... advance modules ... */
    {
      week: "Module 4",
      module: "Advanced Excel Functions Setup (Part-1)",
      description: "Understanding various formulas and techniques for data manipulation, analysis, and reporting.",
      assignment: "Assignment - PAN Card Data Cleanup",
      resources: [
        { label: "Text Functions", type: "topic", url: "#" },
        { label: "Math Functions", type: "topic", url: "#" },
        { label: "Date & Time Functions", type: "topic", url: "#" },
        { label: "Data Extraction", type: "project", url: "#" }
      ]
    },
    {
      week: "Module 5",
      module: "Advanced Excel Functions Setup (Part-2)",
      description: "Understanding various formulas and techniques for data manipulation, analysis, and reporting.",
      assignment: "Assignment - PAN Card Data Extraction",
      resources: [
        { label: "Excel operators Fundamentals", type: "topic", url: "#" },
        { label: "Conditional Functions", type: "topic", url: "#" },
        { label: "Lookup Functions", type: "topic", url: "#" },
        { label: "Statistical Functions", type: "topic", url: "#" },
        { label: "Advanced Data Extraction", type: "project", url: "#" },
      ]
    },
    {
      week: "Module 6",
      module: "Excel Tools Setup (Part-1)",
      // description: "To effectively set up an environment for advanced Excel usage, focus on understanding key features, developing strong excel skills, and leveraging excel tools, according to various sources.",
      description: "To leveraging excel tools, according to various sources. ",
      assignment: "Assignment - Advance Filters Dataset",
      resources: [
        { label: "Error Handling", type: "project", url: "#" },
        { label: "Tables", type: "topic", url: "#" },
        { label: "Data Sorting", type: "project", url: "#" },
        { label: "Filters", type: "topic", url: "#" },
        { label: "Advance Filters", type: "project", url: "#" },
      ]
    },
    {
      week: "Module 7",
      module: "Excel Tools Setup (Part-2)",
      // description: "To effectively set up an environment for advanced Excel usage, focus on understanding key features, developing strong excel skills, and leveraging excel tools, according to various sources.",
      description: "To leveraging excel tools, according to various sources. ",
      assignment: "Assignment - Data Consolidation for Balance Sheet",
      resources: [
        { label: "Data Groups", type: "project", url: "#" },
        { label: "Data Consolidation", type: "project", url: "#" },
        { label: "Multi workbook Consolidation", type: "project", url: "#" },
        { label: "Macros Fundamentals", type: "topic", url: "#" },
        { label: "Macros with workbook", type: "project", url: "#" },
      ]
    },
    {
      week: "Module 8",
      module: "Excel Tools Setup (Part-3)",
      // description: "To effectively set up an environment for advanced Excel usage, focus on understanding key features, developing strong excel skills, and leveraging excel tools, according to various sources.",
      description: "To leveraging excel tools, according to various sources. ",
      assignment: "Assignment - Potected Macro Workbook",
      resources: [
        { label: "Macro Security", type: "topic", url: "#" },
        { label: "Excel Protection", type: "topic", url: "#" },
        { label: "Dynamic Data Visualization Fundamentals", type: "topic", url: "#" },
        { label: "Combo Charts", type: "project", url: "#" },
        { label: "Advance Filter with Macro", type: "project", url: "#" },
      ]
    }
    
  ],
  "Excel Proficient": [/* ... proficient modules ... */
    {week: "Module 9",
      module: "Excel Analytics Setup (Part-1)",
      description: "Unlock the full potential of your data to discover Excel insights that drive smarter decisions and make data analysis effortless",
      assignment: "Assignment - Data Filtering Sheet",
      resources: [
        { label: "Excel Analysis Fundamentals", type: "topic", url: "#" },
        { label: "Function Combination (Part-1)", type: "topic", url: "#" },//Left + right + VLOOKUP 
        { label: "Logical Functions", type: "topic", url: "#" },
        { label: "Function Combination (Part-2)", type: "topic", url: "#" },// if + And + OR
        { label: "Salary Sheet", type: "project", url: "#" },
        { label: "Multi Condition Excel Sheet(Part-1)", type: "topic", url: "#" },//Nested IF

      ]
    },
    {
      week: "Module 10",
      module: "Excel Analytics Setup (Part-2)",
      description: "Unlock the full potential of your data to discover Excel insights that drive smarter decisions and make data analysis effortless",
      assignment: "Assignment - Data Searching Sheet",
      resources: [
        { label: "Wild Card operators", type: "topic", url: "#" },
        { label: "Multi Condition Excel Sheet(Part-2)", type: "topic", url: "#" }, //Nested IF with wild card
        { label: "Data Searching Project(Part-1)", type: "project", url: "#" },
        { label: "Multi Condition Excel Sheet(Part-2)", type: "topic", url: "#" },//serach + find
        { label: "Data Searching Project(Part-2)", type: "project", url: "#" },
      ]
    },
    {
      week: "Module 11",
      module: "Excel Analytics Setup (Part-3)",
      description: "Unlock the full potential of your data to discover Excel insights that drive smarter decisions and make data analysis effortless",
      assignment: "Assignment - Data Searching Sheet",
      resources: [
        { label: "Multi Condition Excel Sheet(Part-3)", type: "topic", url: "#" }, // Date, Day + Wild Card, 
        { label: "Date Filter", type: "project", url: "#" },
        { label: "Multi Condition Excel Sheet(Part-3)", type: "project", url: "#" },//Subsitute + replace
        { label: "Data Extractor Functions Fundamentals", type: "topic", url: "#" },//split + text to column
        { label: "Data Cleaning Project(Part-1)", type: "project", url: "#" },
      ]
    },
        {
      week: "Module 12",
      module: "Excel Analytics Setup (Part-4)",
      description: "Unlock the full potential of your data to discover Excel insights that drive smarter decisions and make data analysis effortless",
      assignment: "Assignment - Data Searching Sheet",
      resources: [
        { label: "Excel Legecy Lookup", type: "topic", url: "#" }, // Index & Match,
        { label: "Arrays Functions Fundamentals", type: "topic", url: "#" }, // Arrays functions, 
        { label: "Array Lookup Functions", type: "project", url: "#" }, // Array VLOOKUP, XLOOKUP, Index & Match
        { label: "Dataset Information Extractor", type: "project", url: "#" }, // Multi Vlookup by IS ERROR & iferror & ISBLANK with Data Validation
        { label: "Data Cleaning Project(Part-2)", type: "project", url: "#" },
      ]
    },
       {
      week: "Module 13",
      module: "Excel Analytics Setup (Part-5)",
      description: "Unlock the full potential of your data to discover Excel insights that drive smarter decisions and make data analysis effortless",
      assignment: "Assignment - Data Searching Sheet",
      resources: [
        { label: "Data insight Fundamentals (Part-1) ", type: "topic", url: "#" }, // Sparklies, 
        { label: "Pivot Table", type: "topic", url: "#" }, // Pivot Table, Pivot Chart
        { label: "Data insight Fundamentals (Part-2)", type: "topic", url: "#" }, // Conditional Formatting with Pivot Table, 
        { label: "Pivot Table with Slicers", type: "project", url: "#" }, // Pivot Table with Slicers
        { label: "Pivot Table with Charts", type: "project", url: "#" }, // Pivot Table with Charts
        { label: "Power Pivot", type: "topic", url: "#" }, // Power Pivot        
        { label: "Excel Dashboard(Part-1)", type: "project", url: "#" },// Excel Dashboard with Pivot Table
        { label: "Data insight Fundamentals (Part-3)", type: "project", url: "#" },// Calculated Fields, Calculated Items, and Calculated Columns
      ]
    },
     {
      week: "Module 14",
      module: "Excel Analytics Setup (Part-6)",
      description: "Unlock the full potential of your data to discover Excel insights that drive smarter decisions and make data analysis effortless",
      assignment: "Assignment - Dynamic Dashboard ",
      resources: [
        { label: "Excel Dashboard(Part-2) ", type: "topic", url: "#" }, //Ecxel Dashboard with Pivot Table & charts 
        { label: "Data insight Fundamentals (Part-4) ", type: "topic", url: "#" }, // GETPIVOTDATA,Slicer, Timeline, ERROR.TYPE, Conditional Formatting with Pivot Table,
        { label: "Excel Dashboard(Part-3)", type: "topic", url: "#" }, // Pivot Table, Pivot Chart,with Slicers, Timeline, and conditional Formatting
        { label: "What if Analyslis", type: "topic", url: "#" }, // Conditional Formatting with Pivot Table, 
        { label: "Solver", type: "project", url: "#" }, // Pivot Table with Slicers
        { label: "Formula Audit (Part-1)", type: "project", url: "#" },// Formula Audit with Formula Auditing tools, Trace Precedents
        { label: "Formula Audit (Part-2)", type: "project", url: "#" }, // Formula Audit with IFERROR, ISBLANK, ISERROR, ISNA, ISNUMBER, ISTEXT, ISLOGICAL, ISFORMULA
        { label: "Power Query Fundamentals (Part-1)", type: "project", url: "#" },// Power Query with Importing Data, 
        { label: "Power Query Fundamentals (Part-2)", type: "project", url: "#" },// Power Query with Transforming Data,
        { label: "Power Query Fundamentals (Part-3)", type: "project", url: "#" }// Power Query with Cleaning Data
      ]
    },
  ],
  "Excel Complete": [/* ... full course modules ... */
     {week: "Module 1",
       module: "Core Excel Fundamentals",
       description: "Foundations of Excel and introduction to core functionalities.",
       assignment: "Assignment - Sheet Setup",
       resources: [
         { label: "Excel Introduction", type: "topic", url: "#" },
         { label: "Legecy Excel ", type: "topic", url: "#" },
         { label: "Custom Format & Formating", type: "project", url: "#" },
         { label: "Referenace & Functions", type: "project", url: "#" }
       ]
      },
      { week: "Module 2",
       module: "Core Excel Data Setup Fundamentals", // Visualization Fundamentals
       description: "How to structuring data properly to facilitate analysis in Excel.",
       assignment: "Assignment - Loan Amortization Sheet(Part-1)",
       resources: [
         { label: "Data Setup Fundamentals", type: "topic", url: "#" },
         { label: "Conditional Formatting", type: "project", url: "#" },
         { label: "Data Cleaning Setup", type: "topic", url: "#" },
       ]
      },
      { week: "Module 3",
       module: "Core Excel Visualization Fundamentals", // 
       description: "How to visualised data in Excel.",
       assignment: "Assignment - Loan Amortization Sheet(Part-2)",
       resources: [
         { label: "Excel Charts Fundamentals", type: "project", url: "#" },
         { label: "Conditional Formatting with tables", type: "project", url: "#" },
         { label: "Data Validation", type: "project", url: "#" },
       ]
      },
      {
      week: "Module 4",
      module: "Advanced Excel Functions Setup (Part-1)",
      description: "Understanding various formulas and techniques for data manipulation, analysis, and reporting.",
      assignment: "Assignment - PAN Card Data Cleanup",
      resources: [
        { label: "Text Functions", type: "topic", url: "#" },
        { label: "Math Functions", type: "topic", url: "#" },
        { label: "Date & Time Functions", type: "topic", url: "#" },
        { label: "Data Extraction", type: "project", url: "#" }
      ]
    },
    {
      week: "Module 5",
      module: "Advanced Excel Functions Setup (Part-2)",
      description: "Understanding various formulas and techniques for data manipulation, analysis, and reporting.",
      assignment: "Assignment - PAN Card Data Extraction",
      resources: [
        { label: "Excel operators Fundamentals", type: "topic", url: "#" },
        { label: "Conditional Functions", type: "topic", url: "#" },
        { label: "Lookup Functions", type: "topic", url: "#" },
        { label: "Statistical Functions", type: "topic", url: "#" },
        { label: "Advanced Data Extraction", type: "project", url: "#" },
      ]
    },
    {
      week: "Module 6",
      module: "Excel Tools Setup (Part-1)",
      // description: "To effectively set up an environment for advanced Excel usage, focus on understanding key features, developing strong excel skills, and leveraging excel tools, according to various sources.",
      description: "To leveraging excel tools, according to various sources. ",
      assignment: "Assignment - Advance Filters Dataset",
      resources: [
        { label: "Error Handling", type: "project", url: "#" },
        { label: "Tables", type: "topic", url: "#" },
        { label: "Data Sorting", type: "project", url: "#" },
        { label: "Filters", type: "topic", url: "#" },
        { label: "Advance Filters", type: "project", url: "#" },
      ]
    },
    {
      week: "Module 7",
      module: "Excel Tools Setup (Part-2)",
      // description: "To effectively set up an environment for advanced Excel usage, focus on understanding key features, developing strong excel skills, and leveraging excel tools, according to various sources.",
      description: "To leveraging excel tools, according to various sources. ",
      assignment: "Assignment - Data Consolidation for Balance Sheet",
      resources: [
        { label: "Data Groups", type: "project", url: "#" },
        { label: "Data Consolidation", type: "project", url: "#" },
        { label: "Multi workbook Consolidation", type: "project", url: "#" },
        { label: "Macros Fundamentals", type: "topic", url: "#" },
        { label: "Macros with workbook", type: "project", url: "#" },
      ]
    },
    {
      week: "Module 8",
      module: "Excel Tools Setup (Part-3)",
      // description: "To effectively set up an environment for advanced Excel usage, focus on understanding key features, developing strong excel skills, and leveraging excel tools, according to various sources.",
      description: "To leveraging excel tools, according to various sources. ",
      assignment: "Assignment - Potected Macro Workbook",
      resources: [
        { label: "Macro Security", type: "topic", url: "#" },
        { label: "Excel Protection", type: "topic", url: "#" },
        { label: "Dynamic Data Visualization Fundamentals", type: "topic", url: "#" },
        { label: "Combo Charts", type: "project", url: "#" },
        { label: "Advance Filter with Macro", type: "project", url: "#" },
      ]
    },
    {week: "Module 9",
      module: "Excel Analytics Setup (Part-1)",
      description: "Unlock the full potential of your data to discover Excel insights that drive smarter decisions and make data analysis effortless",
      assignment: "Assignment - Data Filtering Sheet",
      resources: [
        { label: "Excel Analysis Fundamentals", type: "topic", url: "#" },
        { label: "Function Combination (Part-1)", type: "topic", url: "#" },//Left + right + VLOOKUP 
        { label: "Logical Functions", type: "topic", url: "#" },
        { label: "Function Combination (Part-2)", type: "topic", url: "#" },// if + And + OR
        { label: "Salary Sheet", type: "project", url: "#" },
        { label: "Multi Condition Excel Sheet(Part-1)", type: "topic", url: "#" },//Nested IF

      ]
    },
    {
      week: "Module 10",
      module: "Excel Analytics Setup (Part-2)",
      description: "Unlock the full potential of your data to discover Excel insights that drive smarter decisions and make data analysis effortless",
      assignment: "Assignment - Data Searching Sheet",
      resources: [
        { label: "Wild Card operators", type: "topic", url: "#" },
        { label: "Multi Condition Excel Sheet(Part-2)", type: "topic", url: "#" }, //Nested IF with wild card
        { label: "Data Searching Project(Part-1)", type: "project", url: "#" },
        { label: "Multi Condition Excel Sheet(Part-2)", type: "topic", url: "#" },//serach + find
        { label: "Data Searching Project(Part-2)", type: "project", url: "#" },
      ]
    },
    {
      week: "Module 11",
      module: "Excel Analytics Setup (Part-3)",
      description: "Unlock the full potential of your data to discover Excel insights that drive smarter decisions and make data analysis effortless",
      assignment: "Assignment - Data Searching Sheet",
      resources: [
        { label: "Multi Condition Excel Sheet(Part-3)", type: "topic", url: "#" }, // Date, Day + Wild Card, 
        { label: "Date Filter", type: "project", url: "#" },
        { label: "Multi Condition Excel Sheet(Part-3)", type: "project", url: "#" },//Subsitute + replace
        { label: "Data Extractor Functions Fundamentals", type: "topic", url: "#" },//split + text to column
        { label: "Data Cleaning Project(Part-1)", type: "project", url: "#" },
      ]
    },
        {
      week: "Module 12",
      module: "Excel Analytics Setup (Part-4)",
      description: "Unlock the full potential of your data to discover Excel insights that drive smarter decisions and make data analysis effortless",
      assignment: "Assignment - Data Searching Sheet",
      resources: [
        { label: "Excel Legecy Lookup", type: "topic", url: "#" }, // Index & Match,
        { label: "Arrays Functions Fundamentals", type: "topic", url: "#" }, // Arrays functions, 
        { label: "Array Lookup Functions", type: "project", url: "#" }, // Array VLOOKUP, XLOOKUP, Index & Match
        { label: "Dataset Information Extractor", type: "project", url: "#" }, // Multi Vlookup by IS ERROR & iferror & ISBLANK with Data Validation
        { label: "Data Cleaning Project(Part-2)", type: "project", url: "#" },
      ]
    },
       {
      week: "Module 13",
      module: "Excel Analytics Setup (Part-5)",
      description: "Unlock the full potential of your data to discover Excel insights that drive smarter decisions and make data analysis effortless",
      assignment: "Assignment - Data Searching Sheet",
      resources: [
        { label: "Data insight Fundamentals (Part-1) ", type: "topic", url: "#" }, // Sparklies, 
        { label: "Pivot Table", type: "topic", url: "#" }, // Pivot Table, Pivot Chart
        { label: "Data insight Fundamentals (Part-2)", type: "topic", url: "#" }, // Conditional Formatting with Pivot Table, 
        { label: "Pivot Table with Slicers", type: "project", url: "#" }, // Pivot Table with Slicers
        { label: "Pivot Table with Charts", type: "project", url: "#" }, // Pivot Table with Charts
        { label: "Power Pivot", type: "topic", url: "#" }, // Power Pivot        
        { label: "Excel Dashboard(Part-1)", type: "project", url: "#" },// Excel Dashboard with Pivot Table
        { label: "Data insight Fundamentals (Part-3)", type: "project", url: "#" },// Calculated Fields, Calculated Items, and Calculated Columns
      ]
    },
     {
      week: "Module 14",
      module: "Excel Analytics Setup (Part-6)",
      description: "Unlock the full potential of your data to discover Excel insights that drive smarter decisions and make data analysis effortless",
      assignment: "Assignment - Dynamic Dashboard ",
      resources: [
        { label: "Excel Dashboard(Part-2) ", type: "topic", url: "#" }, //Ecxel Dashboard with Pivot Table & charts 
        { label: "Data insight Fundamentals (Part-4) ", type: "topic", url: "#" }, // GETPIVOTDATA,Slicer, Timeline, ERROR.TYPE, Conditional Formatting with Pivot Table,
        { label: "Excel Dashboard(Part-3)", type: "topic", url: "#" }, // Pivot Table, Pivot Chart,with Slicers, Timeline, and conditional Formatting
        { label: "What if Analyslis", type: "topic", url: "#" }, // Conditional Formatting with Pivot Table, 
        { label: "Solver", type: "project", url: "#" }, // Pivot Table with Slicers
        { label: "Formula Audit (Part-1)", type: "project", url: "#" },// Formula Audit with Formula Auditing tools, Trace Precedents
        { label: "Formula Audit (Part-2)", type: "project", url: "#" }, // Formula Audit with IFERROR, ISBLANK, ISERROR, ISNA, ISNUMBER, ISTEXT, ISLOGICAL, ISFORMULA
        { label: "Power Query Fundamentals (Part-1)", type: "project", url: "#" },// Power Query with Importing Data, 
        { label: "Power Query Fundamentals (Part-2)", type: "project", url: "#" },// Power Query with Transforming Data,
        { label: "Power Query Fundamentals (Part-3)", type: "project", url: "#" }// Power Query with Cleaning Data
      ]
    },
     {
      week: "Bonus Module",
      module: "Excel Bonus Setup",
      description: "Unlock the full potential of your Excel skills with our bonus module, designed to enhance your expertise and provide advanced insights into Excel's capabilities.",
      assignment: "Assignment - Excel Bonus Project",
      resources: [
        { label: "Excel Addins", type: "project", url: "#" }, // Excel Addins, Excel Analyze
        { label: "Excel hidden Addins", type: "project", url: "#" }, //Excel Addins, Analysis ToolPack & Excel Lab 
        { label: "Excel Comaprison", type: "project", url: "#" }, 
        { label: "Excel 365 Online", type: "topic", url: "#" }, // Excel 365 Online,
        { label: "Excel With Co-pliot", type: "project", url: "#" }, // Excel with Co-pilot,}
        { label: "Excel Agents", type: "project", url: "#" }, // Excel with Co-pilot,}

        ]
    },
  ]
};

export default function ExcelSymposium() {
  const [selectedTab, setSelectedTab] = useState(0);
  const currentSessionTitle = excelSessions[selectedTab].title;

  return (
    <div className="ex-sym-container">
      <div className="ex-sym-box">
        <div className="e-sym-box">
          <h1>Excel Symposium Training Program</h1>
          <h2>Master Excel from Basics to Brilliance—Fast, Practical, and Project-Driven.</h2>
          <h4>
            Learn Excel from the ground up! This training takes you from core skills like data cleaning with Pivot Table to advanced analytics...
          </h4>
          <OptionBar
            weeksCount={7}
            sessions={excelSessions}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />

          <div className="le-sessions-info">
            <h1>Session Curriculum</h1>
            <div className="curriculum-box">
              <SymCurriculum curriculumData={excelCurriculum[currentSessionTitle] || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

