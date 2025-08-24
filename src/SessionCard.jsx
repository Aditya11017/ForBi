// components/SessionCard.jsx
import { Link } from "react-router-dom";
import "./session.css";

export default function SessionCard({ session, showButtons = true, children = null }) {
  if (!session) return null;

  return (
    <div className="session-card">
      <div className="session-img" style={{ backgroundColor: session.imgBg }}>
        <img className="img-placeholder" src={session.img} alt={session.title} />
      </div>
      <div className="session-info">
        <h2>{session.title}</h2>
        <span className="start-date">
          <span>Start Date: {session.date}</span> |{" "}
          <span>End Date: {session.enddate}</span>
        </span>
        <p className="session-desc">{session.description}</p>
        <div className="session-tags">
          {session.tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
        <div className="session-price">
          {session.price} <span className="session-mrp">{session.mrp}</span>
        </div>

        {showButtons && (
          <div className="session-meta">
            {session.id === 1 ? (
              <Link to={session.symLink}><button className="btn join-btn">Buy Pack</button></Link>
            ) : (
              <>
                <Link to={session.symLink}><button className="btn talk-btn">View Full Details</button></Link>
                <Link to="/LiveSessions">
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