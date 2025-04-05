import logo from "./assets/images/forBI.svg";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./header.css";

export default function Header() {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setIsOpened(true);  // Ensure menu stays open on large screens
      } else {
        setIsOpened(false); // Hide menu for smaller screens until toggled
      }
    };

    window.addEventListener("resize", handleResize);
    
    // Call once initially to set the correct state based on current width
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  return (
    <header>
      <div className="header">
        <div className="title-box">
          <img className="logo" src={logo} alt="logo"/>
          <Link className="title" to="/">FormulaBI LABS</Link>
        </div>
        <Link to="/login"><button className="user-profile-m">Sign In</button></Link>
        <div className="menu-box">
          <button
            className={`menu menu-icon ${isOpened ? 'opened' : ''}`}
            onClick={handleClick}
            aria-label="Main Menu"
            aria-expanded={isOpened}
          >
            <svg width="40" height="40" viewBox="0 0 100 100">
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
        </div>
        <nav className={`navbar ${isOpened ? 'show' : 'hide'}`}>
          <Link className="link" to="/" onClick={handleClick}>Home</Link>  
          <Link className="link" to="/Training" onClick={handleClick}>Training</Link> 
          <Link className="link" to="/spotlight" onClick={handleClick}>Spotlight</Link>
          <Link className="link" to="/FormulaBIElite" onClick={handleClick}>FormulaBI<span className="for-elite">+Elite</span></Link>
          <Link to="/login"><button className="user-profile">Sign In</button></Link>
        </nav>
      </div>
    </header>
  );
}
