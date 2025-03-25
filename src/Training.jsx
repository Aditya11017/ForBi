
import Carousel from './Carousel';
import LiveTable from './LiveTable';
import Session from './session';
import './TrainLive.css';
export default function Training() {


  return (
    <div className="round-table-container">
      <div className="round-table-box">
        <div className="rt-box">
          <h1 className="rt-p">Symposium</h1>
          <h1 className="head-bg">Online Collaborative Learning</h1>
          <p>Our Collaborative <span className="hg-word">{'"Symposium Learning"'}</span> approach brings online training to life by combining focused presentations with open, interactive discussions. It encourages peer-to-peer learning, diverse perspectives, and deeper understanding in a virtual setting.</p>
          <div className="rt-tarin-container">
            <h2 className="head-bg">Become Master in your chosen Skills within 7 weeks.</h2>
          <button className="">Join Now</button>
          <h3 className="rt-p">Our Symposium Learning Programs</h3>
          <Carousel />
          <h1>Why to Choose Online Collaborative Learning?</h1>
          <h4>Learn from real experts, anywhere you choose.</h4>
          <div className="table-box">
          <LiveTable/>
          </div>
          <button className="btn batch-btn">Explore Available Sessions</button>
          </div>
          <Session />
        </div>
      </div>
    </div>
   
  )
  }