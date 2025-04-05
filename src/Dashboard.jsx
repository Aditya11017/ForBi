import "./dashboard.css"
import profilePic from './assets/images/ForBi.svg'
import ToolTip from "./ToolTip"
import { Link } from "react-router-dom"

export default function Dashboard(){
    return(
        <div className="dash-container">
            <div className="dash-box"> 
                <div className="d-box">
                    <div className="dash-profile-box">
                <div className="back-cover-img">
                        <div className="profile-img-box">
                        <img className="dash-profile-img" src={profilePic} alt="profile-pic"/>
                        </div>
                        <button className="btn-profile">Manage your Profile</button>
                        <Link to="/profile"><button className="btn-profile">Preview Profile</button></Link>
                        <div className="user-profile-info">
                        <p>Hi, Aditya Sharma</p>
                        <p>AdityaShrama.Formula.bi.com</p>
                        </div>   
                        </div>                 
                    </div>

                    <div className="dash-plan-box">
                    <div className="plan-dashbox">
                            <h4>Order Plan</h4>
                            <div className="plan-info-dashbox">
                                <h2>Firm-Enterprise</h2>
                                <p className="plan-info-sh">Start Date : 12-05-2025 | End Date : 22-05-2025</p>
                                <p>Subtotal : XX,XXX.00</p>
                                <p>GST : X,XXX.00 </p>
                                <h2>Amount : XX,XXX.00</h2>
                                <h4>Plan Details</h4>
                                <button className="order-btn">Confirm Order</button>
                            </div>
                        </div>

                        <div className="plan-dashbox">
                            <h4>Current Plan</h4>
                            <div className="plan-info-dashbox">
                                <h2>Firm-Enterprise</h2>
                                <p className="plan-status">Active</p>
                                <p className="plan-info-sh">Start Date : 12-05-2025 | End Date : 22-05-2025</p>
                                <h2>Day - 5</h2>
                                <h2>Topic - Excel</h2>
                                <p>Training Progress : 20% </p>
                                <button className="curriculm-btn">View Details</button>
                            </div>
                        </div>

                        <div className="meet-dashbox">
                        <h4>Today - Meeting</h4>
                            <div className="meet-info-dashbox">
                                <h2>Day - 5</h2>
                                <p className="meet-info-sh">Meeting Date : 12-05-2025 | Meeting Time : 02:00 P.M. to 05:00 P.M.</p>
                                <h2>Topic - Excel</h2>
                                <p>Get deep understanding of Excel from ground up by spending your time to learn the fundamentals with real life projects.</p>
                                <p>Training Progress : 20% </p>
                                <div className="meet-link-box">
                                <h3>Meeting Link </h3>
                                <h2>https://erff.errs.dd.eeef12334</h2>
                                </div>
                                <p className="meet-notice">Please use Register Email ID to join the meeting</p>
                            </div>
                        </div>
                        <div className="badge-dashbox">
                            <h4>Achivements</h4>
                            
                            <div className="badge-box">
                                <ToolTip text="Click To view all Achivements">
                                <div className="badge-list">
                                <div className="badge-tag">Badge-1</div>
                                <div className="badge-tag">Badge-1</div>
                                <div className="badge-tag">Badge-1</div>
                                <div className="badge-tag">Badge-1</div>
                                <div className="badge-tag">Badge-1</div>

                                </div>
                                </ToolTip>
                            </div>
                        </div>
                       
                        </div>
                </div>
            </div>
        </div>
    )
}