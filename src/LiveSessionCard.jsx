import { useEffect, useState } from "react";
import bArw from "./assets/images/bottm-arw.svg";
import Cirpros from "./Cirpros";
import { Link } from "react-router-dom";
import ToolTip from "./ToolTip";
import { useLocation } from "react-router-dom";
export default function LiveSessionCard({
  title,sessionIDTag, tags = [],price, offerPrice, status, icon, date, time, seats,
  offer, upcomingBatches = [] ,resetTimer
}) {


  const [showUpcoming, setShowUpcoming] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");
const [progressPercent, setProgressPercent] = useState(100); // Full at start


  // 🕒 Countdown logic
  useEffect(() => {
    if (!offer || !title) return;
  
    const storageKey = `offerDeadline-${title}`;
    let deadline;
  
    if (resetTimer === true) {
      const offerMillis = parseFloat(offer) * 60 * 60 * 1000;
      deadline = Date.now() + offerMillis;
      localStorage.setItem(storageKey, deadline);
    } else {
      const savedDeadline = localStorage.getItem(storageKey);
      if (savedDeadline) {
        deadline = parseInt(savedDeadline);
      } else {
        const offerMillis = parseFloat(offer) * 60 * 60 * 1000;
        deadline = Date.now() + offerMillis;
        localStorage.setItem(storageKey, deadline);
      }
    }
  
    const totalMillis = deadline - Date.now();
  
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = deadline - now;
  
      if (distance <= 0) {
        clearInterval(interval);
        setRemainingTime("00:00:00");
        setProgressPercent(0);
        return;
      }
  
      const hours = String(Math.floor(distance / (1000 * 60 * 60))).padStart(2, "0");
      const minutes = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
      const seconds = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0");
  
      setRemainingTime(`${hours}:${minutes}:${seconds}`);
      setProgressPercent((distance / totalMillis) * 100);
    }, 1000);
  
    return () => clearInterval(interval);
  }, [offer, title, resetTimer]);
    
  const toggleUpcoming = () => {
    if (showUpcoming) {
      setIsClosing(true);
      setTimeout(() => {
        setShowUpcoming(false);
        setIsClosing(false);
      }, 300);
    } else {
      setShowUpcoming(true);
    }
  };

    const location = useLocation();
  
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const targetId = params.get("focus");
  
      if (targetId) {
        // Ensure scrolling happens after DOM renders
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
  
            // Optional: clean URL after scroll
            window.history.replaceState({}, "", "/LiveSessions");
          }
        }, 300);
      }
    }, [location]);



  
  return (
    <>
      <div className="session-header" id={sessionIDTag}>
        <img className="session-iocn" src={icon} alt={`${title}-icon`} />
        <p>{title} <Link to="/Training"><ToolTip text="info"><span className="info-icon">i</span></ToolTip></Link> </p>
        <div className="l-se-tags">
          {tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
                {/* 🕒 Offer timer */}
                <div className="l-se-offer-fixed">
  <div className="offer-top-right">
    {parseFloat(offer) > 0 && remainingTime !== "00:00:00" ? (
      <>
        <span className="l-se-offer-price">{offerPrice}</span>
        <div className="offer-label">Offer Ends In</div>
      </>
    ) : (
      <span className="offer-expired">{price}</span>
    )}
  </div>

  {parseFloat(offer) > 0 && remainingTime !== "00:00:00" && (
    <div className="offer-bottom-right">
      <Cirpros
        percent={progressPercent}
        time={remainingTime}
        size={120}
        segments={24}
      />
    </div>
  )}
</div>


      </div>
      <div className="live-session-card">
        {status && <div className="status-info">{status}</div>}
        <div className="l-se-info">
  {date && <div className="l-se-date">{date}</div>}
  {time && <div className="l-se-time">{time}</div>}

  {seats !== undefined && (
    <div className="l-se-seat">Seats Available : {seats}</div>
  )}

{seats === 0 ? (
  <button className="j-batch-main" disabled>
    Enrollment Closed
  </button>
) : (
  <Link to="/Enroll" className="batch-link">
    <button className="j-batch-main">
      Submit Enrollment
    </button>
  </Link>
)}


  {upcomingBatches.length > 0 && (
    <>
      <div className="l-es-upcoming" onClick={toggleUpcoming}>
        Upcoming Batches{" "}
        <img
          className={`arw-img ${showUpcoming && !isClosing ? "rotate" : ""}`}
          src={bArw}
          alt="arrow"
        />
      </div>

      {(showUpcoming || isClosing) && (
        <ul className={`le-session-list ${isClosing ? "close" : ""}`}>
          {upcomingBatches.map((batch, idx) => (
            <li key={idx} className="b-time">
              {batch.time} <br />
              <span className="l-se-slot">{batch.slot}</span>
              <br />
              <div className="b-seats">Seats Available : {batch.bseats}</div>
              {batch.bseats === 0 ? (
  <button className="j-batch" disabled>
    Enrollment Closed
  </button>
) : (
  <Link to="/Enroll" className="batch-link">
    <button className="j-batch">
      Confirm Your Enrollment
    </button>
  </Link>
)}

            </li>
          ))}
        </ul>
      )}
    </>
  )}
</div>

      </div>
    </>
  );
}
