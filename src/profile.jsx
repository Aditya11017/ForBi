import "./profile.css"
import profilePic from './assets/images/ForBi.svg'
import ToolTip from "./ToolTip"
import { Link } from "react-router-dom"
export default function Profile(){
    return(
        <div className="dash-container">
            <div className="dash-box"> 
                <div className="d-box">
                    <div className="dash-profile-box">
                    <div className="back-cover-img">
                        <div className="profile-img-box">
                        <img className="dash-profile-img" src={profilePic} alt="profile-pic"/>
                        </div>
                        {/* <button className="btn-profile">Manage your Profile</button> */}
                        <div className="user-profile-info">
                        <p>Aditya Sharma</p>
                        <p>AdityaShrama.Formula.bi.com</p>
                        <p>Data Secintist</p>
                        <p>FormulaBi LABS</p>
                        <p>India</p>
                        <div className="contact-box">
                            <Link>LinkedIN</Link>
                            <Link>Instagarm</Link>
                            <Link>X</Link>
                        </div>
                        </div>
                        </div>                    
                    </div>

                    <div className="user-info-dashbox">
                    <div className="user-info">
                        <h4>About {`Aditya Sharma`}</h4>
                        <div className="user-desc">
                            <p>Hello everyone! I have been a Power BI enthusiast ever since I started working with it in 2020. What I like the most about it is that I can combine my data knowledge with my design hobby and create beautiful and functional reports!</p>
                            <h3>Working Experince</h3>
                            <p>+7 year</p>
                            <h3>Eduction</h3>
                            <p>MCA</p>
                            <h3>Additional links</h3>
                            <p>Aditya.linkedin</p>
                        </div>
                        
                    </div>

                        

                        
                        <div className="profile-badge-dashbox">
                            <h4>Achivements</h4>
                            <div className="profile-badge-box">
                                <ToolTip text="Click To view all Achivements">
                                <div className="profile-badge-list">
                                <div className="profile-badge-tag">Badge-1</div>
                                <div className="profile-badge-tag">Badge-1</div>
                                <div className="profile-badge-tag">Badge-1</div>
                                <div className="profile-badge-tag">Badge-1</div>
                                <div className="profile-badge-tag">Badge-1</div>
                                </div>
                                </ToolTip>
                            </div>
                        </div>
                       
                       <div className="project-box">
                       <h4>Projects</h4>
                       <div className="project-list">
                        <div className="project-tag">Project-1</div>
                        <div className="project-tag">Project-1</div>
                        <div className="project-tag">Project-1</div>
                        <div className="project-tag">Project-1</div>
                        <div className="project-tag">Project-1</div>
                        <div className="project-tag">Project-1</div>

                       </div>
                       </div>
                        </div>
                </div>
            </div>
        </div>
    )
}