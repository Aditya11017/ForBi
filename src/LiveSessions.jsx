import LiveSessionCard from "./LiveSessionCard";
import "./liveSession.css";
import exlicon from "./assets/images/Excel-w-sgl.svg"
import pwbicon from "./assets/images/PowerBIW-sgl.svg"
import pyicon from "./assets/images/PYW-sgl.svg"
import sqlicon from "./assets/images/MysqlW-sgl.svg"
import aiicon from "./assets/images/ChatGPTW-sgl.svg"
import socicon from "./assets/images/SocW-sgl.svg"




export default function LiveSessions() {
  const sessionData = [
    {
      title: "Microsoft Excel",
      background:"excel-back",
      tags: ["5 Course","5 Project", "Live Traininig" ],
      icon: exlicon,
      date: "24 April 2025",
      time: "02:00 PM - 03:00 PM",
      status: "Enrollment Close",
      seats: 0,
      offer:"0.00",
      offerPrice:"₹ 5,999.00",
      price:"₹ 8,999.00",
      resetTimer: false, 
      upcomingBatches: [
        { time: "30 April 2025 03:00 PM to 5:00 PM", slot: "Mon - Fri | 3 weeks" , bseats:0 },
        { time: "10-June-2025 10:00 AM to 12:00 PM", slot: "Weekend | 9 weeks" ,bseats:30},
        { time: "30-apr-2026 02:00 PM to 03:00 PM", slot: "Evening", bseats:30 },
      ]
    },
    { title: "PowerBI" ,
      background:"power-bi-back",
      icon: pwbicon,
      tags: ["5 Course", "9 Weeks","5 Project", "Live Traininig"],
      date: "5-June-2025",
      status: "Enrollment Closing Soon",
      offer:"0.00",
      offerPrice:"₹  10,999.00",
      price:"₹ 11,999.00",
      resetTimer: false, 
        seats: 10,
          upcomingBatches: [
        { time: "30-apr-2025 03:00 PM to 5:00 PM", slot: "Evening" , bseats:0  },
        { time: "10-June-2025 10:00 AM to 12:00 PM", slot: "Weekend" , bseats:2  },
        { time: "30-apr-2026 02:00 PM to 03:00 PM", slot: "Evening" , bseats:10 },
      ]},
    { title: "Python",
      icon: pyicon,
      tags: ["5 Course", "9 Weeks","5 Project", "Live Traininig"],
      status: "Enrollment Opening Soon",
      offer:"0",
      offerPrice:"₹  10,999.00",
      price:"₹ 11,999.00",
      resetTimer: false, 
      upcomingBatches: [
        { time: "30-apr-2025 03:00 PM to 5:00 PM", slot: "Evening" },
      ]},
    { title: "SQL",
      icon: sqlicon,
      tags: ["5 Course", "9 Weeks","5 Project", "Live Traininig"],
      status: "May 2025 Enrollment Open ",
      offer:"0",
      offerPrice:"₹  9,999.00",
      price:"₹ 10,999.00",
      resetTimer: false, 
      upcomingBatches: [
        { time: "30-apr-2025 03:00 PM to 5:00 PM", slot: "Evening" },
      ]},
    { title: "GEN AI",
      icon: aiicon,
      tags: ["5 Course", "9 Weeks","5 Project", "Live Traininig"],
      status: "Enrollment Opening Soon",
      offer:"0",
      offerPrice:"₹  8,999.00",
      price:"₹ 10,999.00",
      resetTimer: false, 
      upcomingBatches: [
        { time: "30-apr-2025 03:00 PM to 5:00 PM", slot: "Evening" },
      ]},
    { title: "Statutory Compliance",
      icon: socicon,
      tags: ["5 Course", "9 Weeks","5 Project", "Live Traininig"],
      status: "Enrollment Opening Soon",
      offer:"0.02",
      offerPrice:"₹  9,999.00",
      price:"₹ 10,999.00",
      resetTimer: true, 
      upcomingBatches: [
        { time: "30-apr-2025 03:00 PM to 5:00 PM", slot: "Evening" },
      ]}
  ];

  return (
    <div className="live-session-container">
      <div className="live-session-box">
        <div className="l-s-box">
          <h1 className="head-bg">Available Sessions</h1>
          <div className="session-card-box">
            {sessionData.map((session, index) => (
              <LiveSessionCard key={index} {...session} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
