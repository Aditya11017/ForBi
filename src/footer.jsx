import './footer.css';
import footem from './assets/images/footem.png';
import forbi from './assets/images/forbi.svg';
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
    const location = useLocation();

    // Hide footer on "/login" route
    if (location.pathname.startsWith("/login") || location.pathname.startsWith("/Dashboard") || location.pathname.startsWith("/Admin")|| location.pathname.startsWith("/BatchInfo")) {
        return null;
    }
const currentYear = new Date().getFullYear();
    return (
        <div className="footer">
            <div className="foot-back-img">
                <img src={footem} alt="footer image" className="foot-img" />
            </div> 
            <div className="footer-box">
                <div className="foot-head">
                    <img src={forbi} alt="Logo Img" className="footer-logo" />
                    <span className="foot-logo-head">FormulaBI LABS</span>
                </div>
                    <p className="org-text">FormulaBI Labs is an online training platform built to help users learn new skills, sharpen existing ones, and access tailored programs for individuals, teams, or organizations delivering real, measurable results.</p>
                   
                    <div className="foot-link-box">
                        <ul className="foot-link">
                            <h4 className="foot-l-head">Useful Links</h4>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/training">Core Training</Link></li>
                            <li><Link to="/Specialist">Specialist Training</Link></li>
                            <li><Link to="/FormulaBIElite">FormulaBI+Elite</Link></li>

                        </ul>
                        <ul className="foot-link">
                            <h4 className="foot-l-head">Support</h4>
                            <li><Link to="/Sales">Contact Us</Link></li>
                            <li><Link to="/login">Feature Requests</Link></li>

                        </ul>
                        <ul className="foot-link">
                            <h4 className="foot-l-head">Legal</h4>
                            <li><Link to="/Privacy">Security Policy</Link></li>
                            <li><Link to="/Privacy">Privacy Policy</Link></li>
                            <li><Link to="/Terms">Terms of Service</Link></li>
                        </ul>
                    </div>

            <div className="footer-logo-text"><h1>FORMULABI LABS</h1></div>
                        <h5 className="rights-header">© {currentYear} FORMULA BI LABS. All Rights Reserved.</h5>

            </div>
        </div>
    );
}
