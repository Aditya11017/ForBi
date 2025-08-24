import "./admin.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SideBarAd() {
  const [isOpen, setIsOpen] = useState(false); // open by default on large screens
  const { pathname } = useLocation();
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    if (pathname.startsWith("/AdminDashboard/Batch")) setActiveIdx(1);
    else if (pathname.startsWith("/AdminDashboard")) setActiveIdx(0);
  }, [pathname]);

  const handlePick = (idx) => {
    setActiveIdx(idx);
    if (window.innerWidth <= 720) setIsOpen(false);
  };

  return (
    <>
        <span className="admin-title">FormualBI LABS</span>

      <button
        className="sidebar-toggle"
        aria-label="Toggle sidebar"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="25" height="25" viewBox="0 0 100 100" aria-hidden="true">
          <path
            className="line line1"
            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
          />
          <path className="line line2" d="M 20,50 H 80" />
          <path
            className="line line3"
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
          />
        </svg>
      </button>

      <ul className={`batch-nav ${isOpen ? "open" : ""}`}>
        <Link to="/AdminDashboard">
          <li
            className={`batch-nav-itmes ${activeIdx === 0 ? "active" : ""}`}
            onClick={() => handlePick(0)}
          >
            Dashboard
          </li>
        </Link>
        <Link to="/AdminDashboard/Batch">
          <li
            className={`batch-nav-itmes ${activeIdx === 1 ? "active" : ""}`}
            onClick={() => handlePick(1)}
          >
            Batches
          </li>
        </Link>
        <Link to="/AdminDashboard/SubAdmin">
          <li
            className={`batch-nav-itmes ${activeIdx === 2 ? "active" : ""}`}
            onClick={() => handlePick(2)}
          >
            Sub-Admin
          </li>
          </Link>
          <Link to="/AdminDashboard/ManageUser">

        <li
          className={`batch-nav-itmes ${activeIdx === 3 ? "active" : ""}`}
          onClick={() => handlePick(3)}
        >
          Manage user in Batch
        </li>
          </Link>

      </ul>
    </>
  );
}
