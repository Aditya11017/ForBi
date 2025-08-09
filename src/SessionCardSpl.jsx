// SessionCardSpl.jsx
import { Link } from "react-router-dom";
import "./session.css";
import { sessionsSpl } from "./SessionDataSpl";

export default function SessionCardSpl({ sessionSpl, showButtons = true, children = null }) {
  if (!sessionSpl) return null;

  return (
    <div className="session-card">
      <div className="session-img" style={{ backgroundColor: sessionSpl.imgBg }}>
        <img className="img-placeholder" src={sessionSpl.img} alt={sessionSpl.title} />
      </div>
      <div className="session-info">
        <h2>{sessionSpl.title}</h2>
        <span className="start-date">
          <span>Start Date: {sessionSpl.date}</span> |{" "}
          <span>End Date: {sessionSpl.enddate}</span>
        </span>
        <p className="session-desc">{sessionSpl.description}</p>
        <div className="session-tags">
          {sessionSpl.tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
        <div className="session-price">
          {sessionSpl.price} <span className="session-mrp">{sessionSpl.mrp}</span>
        </div>

        {showButtons && (
          <div className="session-meta">
            {sessionsSpl.id === 1 ? (
              <Link to={sessionSpl.symLink}><button className="btn join-btn">Buy Pack</button></Link>
            ) : (
              <>
                <Link to={sessionSpl.symLink}><button className="btn talk-btn">View Full Details</button></Link>
                <Link to={`/LiveSessions?focus=${sessionSpl.sessionIDTag}`}>
  <button className="btn join-btn">Join Now</button>
</Link>
              </>
            )}
          </div>
        )}

        {children && <div className="session-children">{children}</div>}
      </div>
    </div>
  );
}