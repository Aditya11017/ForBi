import { Link } from "react-router-dom"
import "./sales.css"
export default function Sales(){
    return(
        <div className="sales-container">
            <div className="sales-box">
                <div className="s-box">
                    <div className="pln-center">
                    <h1 className="bg-head">Work better together</h1>
                    <h4>Not Sure what plan you need?</h4>
                    <Link to="/CustomPlan"><button className="compare-btn">Check Plans</button></Link>
                    </div>
                    <div className="sales-form-box">
                        <form className="sales-form">
                        <fieldset>
           <legend>Name<span className="req"> *</span></legend>
           <input
        type="text"
        placeholder="John"
        aria-label="First Name"
        name="FirstName"
    />
    </fieldset>
    <fieldset>
           <legend>Last Name <span className="req"> *</span></legend>
           
           <input
        type="text"
        placeholder="Deo"
        aria-label="Last Name"
        name="LastName"
    />
    </fieldset>
    <fieldset>
           <legend>Contact<span className="req"> *</span></legend>
           <input
        type="text"
        placeholder="00-000-0000"
        aria-label="Last Name"
        name="LastName"
    />
    </fieldset>
    <fieldset>
           <legend>Email<span className="req"> *</span></legend>
           <input
        type="text"
        placeholder="e.g. aditya@formulabilabs.com"
        aria-label="Email id"
        name="userName"
    />
    </fieldset>
    
    <fieldset>
           <legend>Organization Name<span className="req"> *</span></legend>
           <input
        type="text"
        placeholder='"None", If not affiliated with any organization' 
        aria-label="Email id"
        name="userName"
    />
    </fieldset>

    <fieldset>
        <legend>What Plan You Select<span className="req"> *</span></legend>
    <label htmlFor="userPlan"></label>
        <select id="Plan" name="userPlan" defaultValue="" required>
        <option value="" disabled>-- Choose a Plan --</option>
          <option value="Team-Small">Team-Small</option>
          <option value="Team-Medium">Team-Medium</option>
          <option value="Team-Enterprise">Team-Enterprise</option>
          <option value="Firm-Standerd">Firm-Standerd Plan</option>
          <option value="Firm-Pro">Firm-Pro Plan</option>
          <option value="Firm-Enterprise">Firm-Enterprise-Plan</option>
          <option value="EduSchool">School</option>
          <option value="EduCollage">Collage</option>
          <option value="EduInstitute">Institute</option>
          <option value="Custom">Custom</option>
        </select>
    </fieldset>
    <fieldset>
        <legend>Do You want Add-On?<span className="req"> *</span></legend>
    <label htmlFor="AddOn"></label>
        <select id="Addon" name="userAddon" defaultValue="" required>
        <option value="" disabled>-- Need Add-on --</option>
          <option value="yes">Yes</option>
          <option value="No">No</option>
          </select>
          </fieldset>
          <fieldset className="check">
        <legend>Tech</legend>
        <lable className="check-box">
        <input type="checkbox" value="Excel" />
        Excel
        </lable>
        <lable className="check-box">
        <input type="checkbox" value="PowerBI" />
        PowerBi
        </lable>
        <lable className="check-box">
        <input type="checkbox" value="Python" />
        Python
        </lable>
        <lable className="check-box">
        <input type="checkbox" value="SQL" />
        SQL
        </lable>
    </fieldset>

                        </form>
                    </div>
                    <div className="query">
            <h1>Talk with us</h1>
            <div className="query-box">
            <fieldset>
           <legend>{"What's"} in your mind?</legend>
            <textarea
        type="text"
        placeholder="have an idea please tell"
        aria-label="query"
        name="query"
        ></textarea>        
    </fieldset>
            </div>
            <button className="send-btn">Get in Touch</button>
           </div>
                </div>
            </div>
        </div>
    )
}