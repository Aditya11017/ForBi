import { useState } from "react";
import "./userInfo.css";
import Dropdown from "./dropdown/dropdown";
// import btnarw from "./assets/images/bottm-arw.svg"

export default function IndividualUser() {
  const ageGroup = ["13-18", "19-25", "25+"];
  const [userType, setUserType] = useState("Student");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(ageGroup[0]);

  const [commonInfo, setCommonInfo] = useState({
    UserEmail: "",
    UserName: "",
    UserType: "Student"
  });

  const [studentInfo, setStudentInfo] = useState({
    EduInName: "",
    Degree: "",
    GradYear: "",
    AgeGroup: ageGroup[0]
  });

  const [proInfo, setProInfo] = useState({
    JobType: "",
    ComapnyName:""
  });

  
  const [otherInfo, setOtherInfo] = useState({
    JobType: "",
    ComapnyName:""
  });

  const handleCommonChange = (field, value) => {
    setCommonInfo({ ...commonInfo, [field]: value });
  };

  // 🔁 Submit Handlers
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    console.log("🎓 Student:", { ...commonInfo, ...studentInfo });
  };

  const handleProSubmit = (e) => {
    e.preventDefault();
    console.log("🏢 Proffisonal:", { ...commonInfo, ...proInfo });
  };

  const handleOtherSubmit = (e) => {
    e.preventDefault();
    console.log("🏢 Other:", { ...commonInfo, ...otherInfo });
  };

  return (
    <div className="user-form-container">
      <div className="user-form-box">
        <div className="user-form-panel">
            <div className="button-box">
            <button className="btn sec-btn"> Go Back </button>
            <button className="btn skip-text"> Skip the Setup</button>
            </div>
        <h1>User Basic Details</h1>
<div className="form-div">
        {/* Common Fields */}
        <form className="user-form-common">
          <fieldset>
            <legend>Email</legend>
            <input
              type="email"
              value={commonInfo.UserEmail}
              onChange={(e) => handleCommonChange("UserEmail", e.target.value)}
              placeholder="Enter your email"
            />
          </fieldset>

          <fieldset>
            <legend>Name</legend>
            <input
              type="text"
              value={commonInfo.UserName}
              onChange={(e) => handleCommonChange("UserName", e.target.value)}
              placeholder="Enter your name "
            />
          </fieldset>
<legend className="lable-type">Type</legend>
          <label className="card-radio-group">
            
            {[
              { label: "Student", value: "Student", icon: "👨🏻‍🎓" },
              { label: "Professional", value: "professional", icon: "👨🏻‍💼" },
              { label: "Other", value: "Other", icon: "🌐" }
            ].map(({ label, value, icon }) => (
              <label className="card-radio" key={value}>
                <input
                  type="radio"
                  name="userType"
                  value={value}
                  checked={userType === value}
                  onChange={(e) => {
                    setUserType(e.target.value);
                    handleCommonChange("UserType", e.target.value);
                  }}
                />
                <div className="card-content">
                  <div className="icon">{icon}</div>
                  <p>{label}</p>
                  <span className="custom-radio" />
                </div>
              </label>
            ))}
          </label>
          
        </form>

        {/* 🧑‍🎓 Student Form */}

        {userType === "Student" && (
          <form onSubmit={handleStudentSubmit} className="student-form">
                    <Dropdown
              label="Age Group"
              options={ageGroup}
              selected={selectedAgeGroup}
              onSelect={(val) => {
                setSelectedAgeGroup(val);
                setStudentInfo({ ...studentInfo, AgeGroup: val });
              }}
            />
            <fieldset>
              <legend>Institute/College Name</legend>
              <input
                type="text"
                value={studentInfo.EduInName}
                onChange={(e) => setStudentInfo({ ...studentInfo, EduInName: e.target.value })}
                placeholder="e.g., Delhi University"
              />
            </fieldset>
            <fieldset>
              <legend>Degree</legend>
              <input
                type="text"
                value={studentInfo.Degree}
                onChange={(e) => setStudentInfo({ ...studentInfo, Degree: e.target.value })}
                placeholder="e.g., B.Tech"
              />
            </fieldset>
            <fieldset>
              <legend>Year of Graduation</legend>
              <input
                type="text"
                value={studentInfo.GradYear}
                onChange={(e) => setStudentInfo({ ...studentInfo, GradYear: e.target.value })}
                placeholder="e.g., 2025"
              />
            </fieldset>
            <button className="btn submit-btn" type="submit"> Countinue </button>
            
          </form>
        )}

        {/* 🏢 Organization Form */}
        {userType === "professional" && (
          <form onSubmit={handleProSubmit} className="org-form">
            <fieldset>
              <legend>What is your current job titile?</legend>
              <input
                type="text"
                value={proInfo.OrgType}
                onChange={(e) => setProInfo({ ...proInfo, JobType: e.target.value })}
                placeholder="e.g., NGO, Startup"
              />
            </fieldset>
            <fieldset>
              <legend>What company you work for?</legend>
              <input
                type="text"
                value={proInfo.GSTNumber}
                onChange={(e) => setProInfo({ ...proInfo, ComapnyName: e.target.value })}
                placeholder="e.g., Comapny Name"
              />
            </fieldset>
            <button className="btn submit-btn" type="submit"> Continue </button>
          </form>
        )}

        {/* 🎓 Education Institute Form */}
        {userType === "Other" && (
          <form onSubmit={handleOtherSubmit} className="edu-form">
            <fieldset>
              <legend>Type of job</legend>
              <input
                type="text"
                value={otherInfo.InstituteType}
                onChange={(e) => setOtherInfo({ ...otherInfo, JobType: e.target.value })}
                placeholder="e.g., Freelancer, Consultant"
              />
            </fieldset>
                        <fieldset>
              <legend>Name of your Orgnaization?</legend>
              <input
                type="text"
                value={otherInfo.numberOfStudents}
                onChange={(e) => setOtherInfo({ ...otherInfo, ComapnyName: e.target.value })}
                placeholder="e.g., Abc Consulting "
              />
            </fieldset>
            <button className="btn submit-btn" type="submit"> Continue </button>
          </form>
        )}
        </div>
        </div>
      </div>
    </div>
  );
}
