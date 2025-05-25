import LiveSessionCard from "./LiveSessionCard";
import "./liveSession.css";
import exlicon from "./assets/images/Excel-w-sgl.svg";
import pwbicon from "./assets/images/PowerBIW-sgl.svg";
import pyicon from "./assets/images/PYW-sgl.svg";
import sqlicon from "./assets/images/MysqlW-sgl.svg";
import aiicon from "./assets/images/ChatGPTW-sgl.svg";
import socicon from "./assets/images/SocW-sgl.svg";
import { BatchData } from "./BatchData";

export default function LiveSessions() {
  const sessionData = [
    {
      title: "Microsoft Excel",
      sessionIDTag: "excel-session",
      tags: ["5 Course", "5 Project", "Live Training"],
      icon: exlicon,
      date: "24 April 2025",
      status: "Enrollment Close",
      offer: "0.00",
      offerPrice: "₹ 5,999.00",
      price: "₹ 8,999.00",
      resetTimer: false,
    },
    {
      title: "PowerBI",
      sessionIDTag: "power-session",
      tags: ["5 Course", "9 Weeks", "5 Project", "Live Training"],
      icon: pwbicon,
      date: "5-June-2025",
      status: "Enrollment Closing Soon",
      offer: "0.00",
      offerPrice: "₹ 10,999.00",
      price: "₹ 11,999.00",
      resetTimer: false,
    },
    { title: "Python",
      sessionIDTag:"python-session",
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
      sessionIDTag:"sql-session",
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
      sessionIDTag:"genai-session",
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
      sessionIDTag:"soc-session",
      icon: socicon,
      tags: ["5 Course", "9 Weeks","5 Project", "Live Traininig"],
      status: "Enrollment Opening Soon",
      offer:"0",
      offerPrice:"0",
      price:"₹ 10,999.00",
      resetTimer: false, 
      upcomingBatches: [
        { time: "30-apr-2025 03:00 PM to 5:00 PM", slot: "Evening" },
      ]}
  ];

  const mergedSessions = sessionData.map((session) => {
    const batchInfo = BatchData.find((batch) => batch.batchName === session.title);

    const current = batchInfo?.currentbatch[0];
    const upcomingBatches = batchInfo?.upcomingBatches.map((batch) => ({
      time: `${batch.batchStartDate} ${batch.batchStartTime} to ${batch.batchEndTime}`,
      slot: `${batch.batchStartDate} - ${batch.batchEndDate}`,
      bseats: batch.seat,
    })) || [];

    return {
      ...session,
      date: current ? current.batchStartDate : session.date,
      time: current ? `${current.batchStartTime} - ${current.batchEndTime}` : "Not Scheduled",
      seats: current ? current.seat : 0,
      upcomingBatches,
    };
  });

  return (
    <div className="live-session-container">
      <div className="live-session-box">
        <div className="l-s-box">
          <h1 className="head-bg">Available Sessions</h1>
          <div className="session-card-box">
            {mergedSessions.map((session, index) => (
              <LiveSessionCard key={index} {...session} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}






