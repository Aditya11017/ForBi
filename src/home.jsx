 import IntroVid from "./IntroVid"
 import TextCarousel from "./TextCarousel"
import {Link} from 'react-router-dom';
 import Marque from "./marque"
 import './aurora.css';

 import Plan from "./plan"
import Carousel from "./Carousel";


//import Tool from "./tool"
export default function Home() {
    return (
        <main className="main-box">
            <div className="video-container">
            <div className="aurora-container" >
        <div className="absolute inset-0 overflow-hidden">
          <div className="aurora-effect radial-gradient">
            
          </div>
          <div className="hero-section">
        <p className="main-title">Read.Research.Learn<br />
        <span className="sub-head">Find a training program that fits for your need.</span></p>
        <TextCarousel /> 
        <div className="link-section">
        <Link className="btn main-btn" to="/login">{"Let's"} Get Started</Link>
        <Link className="btn train-btn" to="/Training" >Explore Trainings</Link>
        </div>
        </div>
        </div>
      </div>
      
        
        </div>
        <h1 className="tool-head">Master the latest data tools you need to succeed.</h1>
        <Marque />
        <IntroVid />
        <Link className="btn cont-btn" to="/login">{ "Talk with us" }</Link>
        <h1 className="tool-head">Join to our Our Collaborative <span className="hg-word">{'"Symposium Learning"'}</span> Program </h1>
        <Carousel />
        <Link to="/Training"><button className="btn sym-btn">Symposium Learning</button></Link>
        <Plan /> 
        </main>
    )
  }