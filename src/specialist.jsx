//Specialist.jsx
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import LiveTable from './LiveTable';
import "./specl.css"
import './TrainLive.css';
import  forbi from './assets/images/forbi.svg';
import SessionSpl from './SessionSpl';

export default function Specialist() {
    const tagRef = useRef(null); 

  function scrollClick() {
    
    tagRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); 
}
    return (
        <div className="spl-container">
            <div className="spl-box">
                <div className="sl-box">
                     <h1 className="rt-p">Specialist Symposium</h1>
          <h1 className="head-bg">Online Collaborative Learning</h1>
           <p>Our Collaborative <span className="hg-word">{'"Symposium Specialist Learning"'}</span> method transforms online training into an engaging experience by blending expert-led presentations with interactive group discussions. It promotes peer-to-peer collaboration, encourages diverse viewpoints, and fosters deeper insights within a dynamic virtual environment.</p>
           <p className="sl-note"><span className="sl-qt" ><img src={forbi}/></span>Note: If you're just getting started, please check out our <Link to="/Training">Core Symposium.</Link></p>
          <div className="rt-tarin-container">
            <h2 className="head-bg">Become Master in your chosen Skills within 7 weeks.</h2>
          <button onClick={scrollClick} className="elite-btn">Join Now</button>
          <h1>Why to Choose Online Collaborative Learning?</h1>
          <h4>Learn from real experts, anywhere you choose.</h4>
          <div className="table-box">
          <LiveTable />
          </div>
          <Link to="/LiveSessions"><button className="btn batch-btn" ref={tagRef} >Explore Available Sessions</button></Link>
          </div>
          <SessionSpl showButtons={true}>
            </SessionSpl>
          <div className="elt-container">
          <h2>Looking for something else, something more tailored? Check out our FormulaBI<span className="for-elite">+Elite</span> Plans.</h2>
          <Link to="/FormulaBIElite"><button className="elite-btn">Go to FormulaBI<span className="for-elite">+Elite</span></button></Link>
          </div>
                </div>
            </div>
        </div>
    )
}