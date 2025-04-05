// ExcelSymposium.jsx
import "./excelSym.css";
import { sessions } from "./sessionsData";
import SessionCard from "./SessionCard";
import { Link } from "react-router-dom";

export default function ExcelSymposium() {
  const excelSession = sessions.find((s) => s.id === 2);

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
          <SessionCard session={excelSession} showButtons={false}>
  <div className="up-batch-box">
  <h3> Upcoming Batches</h3>
    <ul>
        <li>
        Start Date: 30-apr-2025
        </li>
        <li>            
        Start Date: 10-June-2025 
        </li>
        <li>
        Start Date: 20-June-2025 
        </li>
    </ul>
    <Link to="/LiveSessions"><button className="ex-enroll-btn">Enroll Now</button></Link>
  </div>
</SessionCard>


          

        </div>
        </div>

      
      </div>
    </div>
  );
}
