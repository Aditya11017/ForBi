// Profile.jsx
import "./profile.css";
import profilePic from "./assets/images/ForBi.svg";
import ToolTip from "./ToolTip";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="dash-container">
      <div className="dash-box">
        <div className="d-box">

          {/* ← Back button */}
          <Link to="/Dashboard" className="back-btn">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* ← your arrow path here */}
              <path
                d="M15 18l-6-6 6-6"
                stroke="#E4E4E4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

         {/* ===== New Profile Card Header ===== */}
<div className="profile-card">
  <div className="profile-card__header">
    <div className="avatar-wrapper">
      <img
        className="avatar"
        src={profilePic}
        alt="Profile"
      />
      <div className="avatar-badge">👑</div>
    </div>
    <div className="profile-card__info">
      <h2 className="profile-card__name">Aditya Sharma</h2>
      <p className="profile-card__subtitle">
        Data Analyst at FormulaBI Labs
      </p>
    </div>
  </div>
  <div className="profile-card__stats">
    <div className="stat">
      <span className="stat__label">LinkedIN</span>
    </div>
    <div className="stat">
      <span className="stat__label">YouTube</span>
    </div>
    <div className="stat">
      <span className="stat__label">X</span>
    </div>
  </div>
</div>



          {/* ===== Shout-out Card ===== */}

          {/* ===== Tabs ===== */}
          {/* <div className="tabs">
            <button>Published</button>
            <button>Scheduled</button>
            <button className="active">Archived</button>
          </div> */}
          {/* ===== About / Achievements / Projects ===== */}
          <div className="user-info-dashbox">
            {/* About */}
            <div className="user-info">
              <h4>About Aditya Sharma</h4>
              <div className="user-desc">
                <p>
                  Hello everyone! I have been a Power BI enthusiast ever since I
                  started working with it in 2020. What I like the most about it
                  is that I can combine my data knowledge with my design hobby and
                  create beautiful and functional reports!
                </p>
                <ul className="profile-tag-list">
  <li className="profile-tag-item">
    <h5 className="tag-title">Working Experience</h5>
    <p className="tag-value">+7 years</p>
  </li>
  <li className="profile-tag-item">
    <h5 className="tag-title">Education</h5>
    <p className="tag-value">MCA</p>
  </li>
</ul>

              </div>
            </div>

            {/* Achievements */}
            <div className="profile-badge-dashbox">
              <h4>Achievements</h4>
              <div className="profile-badge-box">
                <ToolTip text="Click to view all Achievements">
                  <div className="profile-badge-list">
                    <div className="profile-badge-tag">B-1</div>
                    <div className="profile-badge-tag">B-2</div>
                    <div className="profile-badge-tag">B-3</div>
                    <div className="profile-badge-tag">B-4</div>
                    <div className="profile-badge-tag">B-5</div>
                  </div>
                </ToolTip>
              </div>
            </div>

            {/* Projects */}
            <div className="project-box">
              <h4>Projects</h4>
              <div className="project-list">
                <div className="project-tag">Project-1</div>
                <div className="project-tag">Project-2</div>
                <div className="project-tag">Project-3</div>
                <div className="project-tag">Project-4</div>
                <div className="project-tag">Project-5</div>
                <div className="project-tag">Project-6</div>
              </div>
            </div>
          </div>
          {/* ===== end content ===== */}

        </div>
      </div>
    </div>
  );
}
