import { Link } from "react-router-dom"
import PlanGraph from "./assets/images/plan.svg"
//import Tick from "./assets/images/tick.svg"
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
                    <li>Training based on your authorized data.</li>
                    <li>Training based on industry lead tools.</li>
                    <li>Tailored and Flexible Live Training Programs.</li>
                    <li>Assess your {"team's"} capabilities to prioritize essential skill development.</li>
                    <li>Insights into user adoption, engagement, and behavior.</li>
                </ul>
            </div>
            <div className="list-box">
                <h3>For Firms</h3>
                <ul className="team-list">
                    <li>Training based on your authorized data.</li>
                    <li>Training based on industry lead tools.</li>
                    <li>Tailored and Flexible Live Training Programs base on {"firm's"} current infrastructure.</li>
                    <li>Assess your {"firm's"} requriments and vison to prioritize essential skill development.</li>
                    <li>Insights into user adoption, engagement, and behavior.</li>
                </ul>
            </div>
            <div className="list-box list-3">
                <h3>For Educational Institute</h3>
                <ul className="team-list">
                    <li>Training based on your authorized data.</li>
                    <li>Training based on industry lead tools.</li>
                    <li>Tailored and Flexible Live Training Programs base on your Curriculum.</li>
                    <li>Assess your requriments and  to prioritize essential skill development.</li>
                    <li>Insights into user adoption, engagement, and behavior.</li>
                </ul>
            </div>
            </div>
        </div>
    )
}