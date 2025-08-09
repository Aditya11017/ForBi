import './admin.css';
import SideBarAd from './sideBarAd';

export default function Admin() {
  return (
    <div className="admin-container">
      {/* Toggle for small screens */}
      <div className="admin-grid">
        <SideBarAd/>
        <div className="admin-panel">
          <h1>Welcome, Admin Dashboard</h1>
          <h2>Admin Panel</h2>

          <div className="batch-info-panel glass-card">
            <div className="active-batch-box">
              Active Batches
              <br />
              <span className="active-batch-count"> 2</span>
              <br />
              <button className="dash-btn">View Active Batches</button>
            </div>
            <div className="batch-box glass-card">
              Total Batches Currently available
              <br />
              <span className="batch-count"> 5</span>
              <br />
              <button className="dash-btn">View Batches</button>
            </div>
            <div className="seats-box glass-card">
              Total Seats Available
              <br />
              <span className="seats-count"> 100</span>
              <br />
              <button className="dash-btn">View Seats</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
