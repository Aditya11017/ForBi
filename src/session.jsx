// components/Session.jsx
import { sessions } from "./sessionsData";
import SessionCard from "./SessionCard";
import "./session.css";

export default function Session({ showButtons = true }) {
  return (
    <div className="session-container">
      <h1>Symposium Learning</h1>
      <h3>Discover the most suitable Online Collaborative Learning experience for You.</h3>
      <div className="session-box">
        {sessions.map((session, index) => (
          <SessionCard key={index} session={session} showButtons={showButtons} />
        ))}
      </div>
    </div>
  );
}
