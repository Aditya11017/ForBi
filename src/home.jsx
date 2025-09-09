 import IntroVid from "./IntroVid"
 import TextCarousel from "./TextCarousel"
import {Link} from 'react-router-dom';
 import Marque from "./marque"
//  import './aurora.css';
import OptionBarSpl from "./OptionBarSpl"
 import Plan from "./plan"

import AnimeBtn from "./AnimeBtn";


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
            
        <p className="main-title"><span className="gradient-text">Read.Research.Learn</span><br />
        <span className="sub-head  gradient-text">Find a training program that fits for your need.</span></p>
        <TextCarousel /> 
        <div className="hero-btn">
              <Link to="/Login"><AnimeBtn>
        Let's Get Started with <strong>FORMULABI LABS →</strong>
      </AnimeBtn></Link>
            </div>
        
        </div>
        </div>
      </div>
      
        
        </div>
        <h1 className="tool-head">Master the latest data tools you need to succeed.</h1>
        <Marque />
        <IntroVid />
        <Link className="btn cont-btn" to="/login">{ "Talk with us" }</Link>
        <h1 className="tool-head">Join to our Our Collaborative <span className="hg-word">{'"Symposium Learning"'}</span> Program For</h1>

          
      <OptionBarSpl/>
    
        <Plan /> 
        </main>
    )
  }