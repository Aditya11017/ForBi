
 import React, { useState } from "react";
 import "./excelSym.css";
 import SymCurriculum from "./symCurriculum";
 import OptionBar from "./OptionBar";
//  import corem from "./assets/images/corem.svg";
 import advm from "./assets/images/advm.svg";
  import prom from "./assets/images/prom.svg";
//  import compm from "./assets/images/compm.svg";

export default function ExcelSymSpl() {
  const [selectedTab, setSelectedTab] = useState(0);
  const excelSessions = [
        { id: 1,
      title: "Excel Technician",
      sessionIDTag: "excel-tec",
      description: "Master Excel with our online training, tailored for data science, analytics, and finance professionals. Learn to analyze data, build visualizations, and automate tasks to enhance your career in today's data-driven world.",
      tags: ["5 Course", "9 Weeks", "5 Project", "Live Training"],
      date: "April, 4, 2025",
      enddate: "April, 19, 2025",
      img: advm,
      progress: 20,
      milestoneWeek: 1.5 

    },
    { id: 2,
      title: "Excel Master",      
      description: "Learn Excel from the ground up! This training takes you from core skills like data cleaning with Pivot Table to advanced analytics...",
      img: prom,
      imgBg: "rgb(189, 253, 222)", 
      date: "2025-06-01",
      enddate: "2025-06-07",
      tags: ["5 Course", "9 Weeks", "5 Project", "Live Training"],
      price: "₹ 1,999",
      mrp: "₹ 2,999",
      symLink: "/sessions/excel/core",
      sessionIDTag: "excel-Spl-1",
      progress: 50,
      milestoneWeek: 4 

    },
    {
      id: 3,
      title: "Excel Specialist",
      sessionIDTag: "excel-spl-2",
      description: "Gain a deep understanding of Excel from the ground up by learning its fundamentals and advancing to complex features. Quickly and easily master the latest Excel tools, including Formulas, Power Query, DAX, and more, through real-life projects.",
      tags: ["5 Course", "9 Weeks", "5 Project", "Live Training"],
      date: "April, 4, 2025",
      enddate: "April, 19, 2025",
      img: "ForBackEX",
      imgBg: "rgb(189, 253, 222)",
    },
    {
      id: 4,  
      title: "Excel Complete",
      sessionIDTag: "excel-session-complete",   
      description: "Master Excel with our online training, tailored for data science, analytics, and finance professionals. Learn to analyze data, build visualizations, and automate tasks to enhance your career in today's data-driven world.",
      tags: ["5 Course", "9 Weeks", "5 Project", "Live Training"],    }
  ];
  const excelCurriculum = {
    "Excel Technician": [
      {
        week: "Module 1",
        module: "Core Excel Fundamentals",
        description: "Foundations of Excel and introduction to core functionalities.",
        assignment: "Assignment - Sheet Setup",
        resources: [
          { label: "Excel Introduction", type: "topic", url: "#" },
          { label: "Legacy Excel ", type: "topic", url: "#" },
          { label: "Custom Format & Formatting", type: "project", url: "#" },
          { label: "Reference & Functions", type: "project", url: "#" }
        ]
      }
    ],
    "Excel Master": [ { 
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
      }
    ],
    "Excel Specialist": [
      {
        week: "Module 2",
        module: "Advanced Excel Techniques",
        description: "Advanced features and techniques for data analysis.",
        assignment: "Assignment - Data Analysis",
        resources: [
          { label: "Advanced Formulas", type: "topic", url: "#" },
          { label: "Data Visualization", type: "topic", url: "#" },
          { label: "Pivot Tables", type: "project", url: "#" },
          { label: "Macros & Automation", type: "project", url: "#" }
        ]
      }],
    "Excel Complete": [
      {
        week: "Module 3",
        module: "Complete Excel Mastery",
        description: "Comprehensive coverage of all Excel functionalities.",
        assignment: "Assignment - Full Project",
        resources: [
          { label: "Data Cleaning Techniques", type: "topic", url: "#" },
          { label: "Advanced Data Analysis", type: "topic", url: "#" },
          { label: "Dashboard Creation", type: "project", url: "#" },
          { label: "Final Project Submission", type: "project", url: "#" }
        ]
      }]
    }
     const currentSessionTitle = excelSessions[selectedTab].title;
   return (
     <div className="ex-sym-container">
       <div className="ex-sym-box">
         <div className="e-sym-box">
           <h1>Microsoft Excel Specialist Symposium Training Program</h1>
           <h2>Master Excel from Basics to Brilliance—Fast, Practical, and Project-Driven.</h2>
           <h4>
             Gain a deep understanding of Excel from the ground up by learning
             its fundamentals and advancing to complex features...
           </h4>
           <div className="excel-session-card">
                  <OptionBar
                    weeksCount={7}
                    sessions={excelSessions}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                  />
      
 <div className="le-sessions-info">
     <h1>Schedule</h1>
     <p>The following are the important dates you’ll need to keep in mind for enrollment and the start of the session. Please take note of them to ensure you complete all necessary steps on time. </p>
  
     <h1>Session Curriculum</h1>
     <div className="curriculum-box">
     <SymCurriculum curriculumData={excelCurriculum[currentSessionTitle] || []} />
     </div>
 </div>
         </div>
         </div>
       </div>
     </div>
   );
}
