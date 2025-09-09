import { Link } from "react-router-dom"
import PlanGraph from "./assets/images/plan.svg"
import Tick from "./assets/images/tickcrw.svg"
export default function Plan(){
    return(
        <div className="plan-box">
            <h3>Our Core Foundation</h3>
            <h1>Progress with Integrity and Adaptability</h1>
            <p className="plan-para"> As industries evolve, so must you—adapting to emerging technologies while remaining mindful of their limitations and challenges. Our training is built around the core of your key technologies, ensuring relevance and impact without compromising ethics or safety.</p>
            <img className="plan-img" src={PlanGraph} alt="Fbl-plan-graph"/>
            <h1>Get started with FormulaBI Labs today</h1>
            <Link className="btn price-btn" to="/sales">Contact for Pricing</Link>
            <div className="list-area">
            <div className="list-box">
                <h3>For Teams</h3>
                <ul className="team-list">
                    <li><img src={Tick} className="team-tick-icon"/>Training based on your authorized data.</li>
                    <li><img src={Tick} className="team-tick-icon"/>Training based on industry lead tools.</li>
                    <li><img src={Tick} className="team-tick-icon"/>Tailored and Flexible Live Training Programs.</li>
                    <li><img src={Tick} className="team-tick-icon"/>Assess your {"team's"} capabilities to prioritize essential skill development.</li>
                    <li><img src={Tick} className="team-tick-icon"/>Insights into user adoption, engagement, and behavior.</li>
                </ul>
            </div>
            <div className="list-box">
                <h3>For Institution</h3>
                <ul className="team-list">
                    <li><img src={Tick} className="team-tick-icon"/>Training based on your authorized data.</li>
                    <li><img src={Tick} className="team-tick-icon"/>Training based on industry lead tools.</li>
                    <li><img src={Tick} className="team-tick-icon"/>Tailored and Flexible Live Training Programs base on {"institution's"} current infrastructure.</li>
                    <li><img src={Tick} className="team-tick-icon"/>Assess your {"institution's"} requriments and vison to prioritize essential skill development.</li>
                    <li><img src={Tick} className="team-tick-icon"/>Insights into user adoption, engagement, and behavior.</li>
                </ul>
            </div>
            <div className="list-box list-3">
                <h3>For Educational Institute</h3>
                <ul className="team-list">
                    <li><img src={Tick} className="team-tick-icon"/>Training based on your authorized data.</li>
                    <li><img src={Tick} className="team-tick-icon"/>Training based on industry lead tools.</li>
                    <li><img src={Tick} className="team-tick-icon"/>Tailored and Flexible Live Training Programs base on your Curriculum.</li>
                    <li><img src={Tick} className="team-tick-icon"/>Assess your requriments and  to prioritize essential skill development.</li>
                    <li><img src={Tick} className="team-tick-icon"/>Insights into user adoption, engagement, and behavior.</li>
                </ul>
            </div>
            </div>
            <div className="elt-box">
                <h1>Try FormulaBI +Elite </h1>
                   <h4>Looking for something else, something more tailored? Check out our FormulaBI<span className="for-elite">+Elite</span> Plans.</h4>
          <Link to="/FormulaBIElite"><button className="elite-btn">FormulaBI<span className="for-elite">+Elite</span></button></Link>
          
            </div>
        </div>
    )
}