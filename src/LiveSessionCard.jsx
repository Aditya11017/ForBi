import { useEffect, useState } from "react";
import bArw from "./assets/images/bottm-arw.svg";
import Cirpros from "./Cirpros";
import { Link } from "react-router-dom";
import ToolTip from "./ToolTip";

export default function LiveSessionCard({
  title, tags = [],price, offerPrice, status, icon, date, time, seats,
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

  return (
    <>
      <div className="session-header">
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

  


          <button className="j-batch-main" disabled={seats === 0}>
          {seats === 0 ? "Enrollment Close" : "Submit Enrollment"}
          </button>

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
                    <li key={idx}>
                      {batch.time} <br /><span className="l-se-slot">{batch.slot}</span>
                      <br />
                      <div className="b-seats">Seats Available : {batch.bseats}</div>
                      <button className="j-batch" disabled={batch.bseats === 0}>
                        {batch.bseats === 0 ? "Enrollment Close" : "Confirm Your Enrollment"}
                        </button>
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
