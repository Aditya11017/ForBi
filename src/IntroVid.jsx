 import { useState, useRef } from "react"
 import Fintro from "./assets/video/intro.mp4"
 import thumbnailImage from "./assets/images/FBL.png"  // Replace with your thumbnail image path
 export default function IntroVid() {
     const [showThumbnail, setShowThumbnail] = useState(true);
     const videoRef = useRef(null);
     const handlePlay = () => {
         setShowThumbnail(false);
         videoRef.current.play();
     };
     return (
         <div className="intro-box">
            <div className="intro-text">
             <h1>Why FormulaBI Labs?</h1>
             <p className="intro">
                 At FormulaBI LABS, we design training programs that fit your organization’s unique needs and goals. 
                 We take the time to understand your challenges, priorities, and vision to create solutions that make a real difference.
             </p>
             </div>
             <div className="vid-box relative">
                 {showThumbnail && (
                    <div>
                     <img
                         src={thumbnailImage}
                         alt="Video Thumbnail"
                         className="thumbnail"
                         onClick={handlePlay}
                     />
                      <button
                            className="thumb-btn"
                            onClick={handlePlay}
                        >
                            <span className="play-btn">▶</span>
                        </button>
                     </div>
                 )}
                 <video
                     className="fbl-intro"
                     controls
                     src={Fintro}
                     ref={videoRef}
                     onPlay={() => setShowThumbnail(false)}
                 ></video>
             </div>
         </div>
     );
 }
