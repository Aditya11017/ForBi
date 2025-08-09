
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import LiveTable from './LiveTable';
import Session from './session';
import './TrainLive.css';
export default function CoreTraining() {
  const tagRef = useRef(null); 

  function scrollClick() {
    
    tagRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); 
}

  return (
    <div className="round-table-container">
      <div className="round-table-box">
        <div className="rt-box">
          <h1 className="rt-p">Core Symposium</h1>
          <h1 className="head-bg">Online Collaborative Learning</h1>
          <p>Our Collaborative <span className="hg-word">{'"Symposium Learning"'}</span> approach brings online training to life by combining focused presentations with open, interactive discussions. It encourages peer-to-peer learning, diverse perspectives, and deeper understanding in a virtual setting.</p>
          <div className="rt-tarin-container">
            <h2 className="head-bg">Become Proficient in your chosen Skills within 7 weeks.</h2>
          <button onClick={scrollClick} className="elite-btn">Join Now</button>
          <h1>Why to Choose Online Collaborative Learning?</h1>
          <h4>Learn from real experts, anywhere you choose.</h4>
          <div className="table-box">
          <LiveTable />
          </div>
          <Link to="/LiveSessions"><button className="btn batch-btn" ref={tagRef} >Explore Available Sessions</button></Link>
          </div>
          <Session showButtons={true}>
            
            </Session>
            
          <div className="elt-container">
          <h2>Looking for something else, something more tailored? Check out our FormulaBI<span className="for-elite">+Elite</span> Plans.</h2>
          <Link to="/FormulaBIElite"><button className="elite-btn">Go to FormulaBI<span className="for-elite">+Elite</span></button></Link>
          </div>
        </div>
      </div>
    </div>
   
  )
  }