import "./dashboard.css";
import profilePic from './assets/images/ForBi.svg';
import ToolTip from "./ToolTip";
import { Link } from "react-router-dom";
import { useState } from "react";

// Dummy data (replace with real data or props/hooks)
const latestWorks = [profilePic, profilePic, profilePic, profilePic, profilePic];
const barData = [23, 43, 53, 53, 43]; // Example data for bar chart heights
export default function Dashboard() {
  const [navItemId, setNavItemId] = useState(0);

  const navItems = ["Dashboard", "Roadmap", "Query"];
  return (
    <div className="dash-root">
            <nav className="top-nav">
                <div className="item-list">
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      className={`nav-item ${navItemId === index ? 'nav-active' : ''}`}
                      onClick={() => setNavItemId(index)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
            </nav>
    <div className="dash-grid-modern">
    <div className="profile-music-card">
  <div className="profile-music-grid">
    <div className="profile-left-col">
      <div className="profile-avatar-ring">
        <img className="profile-avatar-img" src={profilePic} alt="Aditya Sharma" />
      </div>
      <div>
        <div className="profile-main-row">
          <span className="profile-name">Aditya Sharma</span>
          <span className="profile-badge" title="Verified">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="10" fill="#23b26d"/>
              <path d="M10 4.5l1.3 3.5h3.2l-2.6 2 1 3.5-2.6-2-2.6 2 1-3.5-2.6-2h3.2L10 4.5z" fill="#d9ff7f" stroke="#d9ff7f"/>
            </svg>
          </span>
        </div>
        <div className="profile-title">AdityaShrama.Formula.bi.com</div>
      </div>
      
      
    </div>
    <div className="profile-info-column">
        <div className="profile-stat-col">
      <div className="profile-stat-label">Projects</div>
      <div className="profile-stat-value">125</div>
      </div>
      <div className="profile-stat-col">
      <div className="profile-stat-label">Member since</div>
      <div className="profile-stat-value">12/12/2022</div>
      </div>
      <div className="profile-stat-col">
      <div className="profile-stat-label">Experience</div>
      <div className="profile-stat-value">7+ Years</div>
    </div>
    <div className="profile-stat-col">
      <div className="profile-stat-label">Achivements</div>
      <div className="profile-stat-value">9</div>
    </div>
      </div>
  </div>
  {/* <div className="profile-tag-row">
    <span className="profile-tag">Exper 7+ year</span>
    <span className="profile-tag">Ambient</span>
    <span className="profile-tag">Dance</span>
    <span className="profile-tag">+3</span>
  </div> */}
  <div className="profile-action-row">
    <Link to="/Profile" className="profile-gradient-btn">View Profile</Link>
    <button className="profile-gradient-btn">Manage Profile</button>
  </div>
</div>





      {/* Plan Progress */}
      <div className="modern-card plan-card">
        <div className="modern-title">PLAN PROGRESS</div>
        <div className="modern-main-num">20<span className="modern-unit">%</span></div>
        <div className="modern-label-row">
          <span>EXCEL-CORE</span>
          <div className="plan-status">
          <span className="modern-dot"></span>
          <span>Active</span>
          </div>
        </div>
        <div className="modern-sub-row">
          <span>Start: 12-05-2025</span>
          <span>End: 22-05-2025</span>
        </div>
        <div className="modern-plan-amount">
          <span>Amount: XX,XXX.00</span>
        </div>
        <button className="modern-btn">View Details</button>
      </div>

      

      {/* Achievements */}
      <div className="modern-card achievements-card">
        <div className="modern-title">ACHIEVEMENTS</div>
        {/* <ToolTip text="Click To View All Achievements">
          <div className="modern-badge-list">
            <div className="modern-badge">1</div>
            <div className="modern-badge">2</div>
            <div className="modern-badge">3</div>
            <div className="modern-badge">4</div>
            <div className="modern-badge">5</div>
          </div>
        </ToolTip> */}
        <p>No Achievements Earn.</p>
      </div>
      {/* Meeting */}
      <div className="modern-card meet-card">
        <div className="modern-title">NEXT MEETING</div>
        <div className="modern-main-num">Day 5</div>
        <div className="modern-meet-row">Topic: Excel</div>
        <div className="modern-meet-time">
          12-05-2025<br />
          02:00 PM – 05:00 PM
        </div>
        <div className="modern-meet-link">
          <span>Meeting Link</span>
          <a href="https://erff.errs.dd.eeef12334" className="modern-meet-url" target="_blank" rel="noopener noreferrer">
            Join Meeting
          </a>
        </div>
        <div className="modern-notice">
          Please use Registered Email ID to join
        </div>
      </div>
      {/* Today's Focus */}
      <div className="modern-card">
        <div className="modern-title">ALL PLANS</div>
        <div className="sub-info" style={{color:'#b1c4df'}}>  
          <p>Plans choosen by you</p>
          <span className="modern-unit">
            <div className="plan-list">EXCEL Core</div>
            <div className="plan-list">Power-BI Full Couse</div>
            <div className="plan-list">Python Full Course</div>
            <button className="modern-btn" style={{fontSize:'2em'}}>View Plans</button>

          </span>
          </div>
      </div>

      {/* Completed Tasks */}
      <div className="modern-card">
        <div className="modern-title">COMPLETED TASKS</div>
        <div className="modern-main-num" style={{color:'#f3e5c3'}}>2 <span className="modern-unit">/ 5</span></div>
        <button className="modern-btn">View All</button>
      </div>

      {/* API Usage */}
      {/* <div className="modern-card">
        <div className="modern-title">API USAGE</div>
        <div className="modern-main-num" style={{color:'#c3e0cb'}}>5.01 <span className="modern-unit">/ $10.00</span></div>
      </div> */}

      {/* Paid Invoices */}
      {/* <div className="modern-card">
        <div className="modern-title">PAID INVOICES</div>
        <div className="modern-main-num">24 <span className="modern-unit">/ 32</span></div>
        <div className="modern-sub-row">
          <span>Total: $8,000 / $12,000</span>
        </div>
      </div> */}

      {/* Total Balance (sample bar chart style block) */}
      <div className="modern-card">
        <div className="modern-title">YOUR PERFORMNCE</div>
        <div className="modern-main-num">Average 1.592</div>
        <div className="modern-bar-chart">
          {barData.map((data, index) => (
            <div key={index} className={`modern-bar modern-bar${index + 1}`} style={{height: `${data}%`}}>
              {data}%
            </div>
          ))}
        </div>
      </div>

      {/* Custom Dashboard (wide block, like the bottom right in your reference)
      <div className="modern-card custom-card">
        <div className="modern-title">CUSTOM DASHBOARD</div>
        <div style={{fontSize:'1.2em', margin:'1.1em 0 .7em 0', color:'#232326', fontWeight:600}}>10 / 20 Templates</div>
        <button className="modern-btn">Explore Templates</button>
      </div> */}

      {/* Latest Works (like the "latest works" with 5 images) */}
      <div className="modern-card">
        <div className="modern-title">LATEST PROJECTS</div>
        <div className="modern-latest-imgs">
          {latestWorks.map((img, idx) => (
            <img key={idx} src={img} alt={`work${idx}`} />
          ))}
        </div>
        <button className="modern-btn">View All</button>
      </div>
    </div>
    </div>
  );
}
