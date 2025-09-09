import { useState } from "react";
import "./userInfo.css";
import Dropdown from "./dropdown/dropdown";
// import btnarw from "./assets/images/bottm-arw.svg"

export default function UserInfo() {
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

  const [orgInfo, setOrgInfo] = useState({
    OrgType: "",
    GSTNumber: "",
    NumberOfEmp:""
  });

  const [eduInfo, setEduInfo] = useState({
    InstituteType: "",
    numberOfStudents:"",
  });

  const [firmInfo, setFirmInfo] = useState({
    FirmType: ""
  });

  const [othersInfo, setOthersInfo] = useState({
    Nature: ""
  });

  const handleCommonChange = (field, value) => {
    setCommonInfo({ ...commonInfo, [field]: value });
  };

  // 🔁 Submit Handlers
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    console.log("🎓 Student:", { ...commonInfo, ...studentInfo });
  };

  const handleOrgSubmit = (e) => {
    e.preventDefault();
    console.log("🏢 Organization:", { ...commonInfo, ...orgInfo });
  };

  const handleEduSubmit = (e) => {
    e.preventDefault();
    console.log("🏫 Education Institute:", { ...commonInfo, ...eduInfo });
  };

  const handleFirmSubmit = (e) => {
    e.preventDefault();
    console.log("🧾 Firm:", { ...commonInfo, ...firmInfo });
  };

  const handleOthersSubmit = (e) => {
    e.preventDefault();
    console.log("🌐 Others:", { ...commonInfo, ...othersInfo });
  };

  return (
    <div className="user-form-container">
      <div className="user-form-box">
        <div className="user-form-panel">
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
              placeholder="Enter your name or organization name"
            />
          </fieldset>
<legend className="lable-type">Type</legend>
          <label className="card-radio-group">
            
            {[
              { label: "Student", value: "Student", icon: "📄" },
              { label: "Organization", value: "Organization", icon: "🏢" },
              { label: "Firm", value: "Firm", icon: "🧾" },
              { label: "Education Institute", value: "Education Institute", icon: "🎓" },
              { label: "Others", value: "Others", icon: "🌐" }
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
            <div className="button-box">
            <button className="btn submit-btn" type="submit"> Next </button>
            <button className="btn sec-btn"> Go Back </button>
            </div>
            <button className="btn skip-text"> Skip the Setup</button>
          </form>
        )}

        {/* 🏢 Organization Form */}
        {userType === "Organization" && (
          <form onSubmit={handleOrgSubmit} className="org-form">
            <fieldset>
              <legend>Type of Organization</legend>
              <input
                type="text"
                value={orgInfo.OrgType}
                onChange={(e) => setOrgInfo({ ...orgInfo, OrgType: e.target.value })}
                placeholder="e.g., NGO, Startup"
              />
            </fieldset>
            <fieldset>
              <legend>GST Number</legend>
              <input
                type="text"
                value={orgInfo.GSTNumber}
                onChange={(e) => setOrgInfo({ ...orgInfo, GSTNumber: e.target.value })}
                placeholder="e.g., GSTIN123456789"
              />
            </fieldset>
            <fieldset>
              <legend>Number of Employee you want to Enroll</legend>
              <input
                type="text"
                value={orgInfo.NumberOfEmp}
                onChange={(e) => setOrgInfo({ ...orgInfo, NumberOfEmp: e.target.value })}
                placeholder="e.g.,10 ,20 ,50 ,75 ,100 or more"
              />
            </fieldset>
            

            <button className="btn submit-btn" type="submit">Submit</button>
          </form>
        )}

        {/* 🎓 Education Institute Form */}
        {userType === "Education Institute" && (
          <form onSubmit={handleEduSubmit} className="edu-form">
            <fieldset>
              <legend>Type of Education Institute</legend>
              <input
                type="text"
                value={eduInfo.InstituteType}
                onChange={(e) => setEduInfo({ ...eduInfo, InstituteType: e.target.value })}
                placeholder="e.g., School, College"
              />
            </fieldset>
                        <fieldset>
              <legend>Number of Students you want to enroll?</legend>
              <input
                type="text"
                value={eduInfo.numberOfStudents}
                onChange={(e) => setEduInfo({ ...eduInfo, numberOfStudents: e.target.value })}
                placeholder="e.g.,10 ,20 ,50 ,75 ,100 or more"
              />
            </fieldset>
            <button className="btn submit-btn" type="submit">Submit</button>
          </form>
        )}

        {/* 🧾 Firm Form */}
        {userType === "Firm" && (
          <form onSubmit={handleFirmSubmit} className="firm-form">
            <fieldset>
              <legend>Type of Firm</legend>
              <input
                type="text"
                value={firmInfo.FirmType}
                onChange={(e) => setFirmInfo({ ...firmInfo, FirmType: e.target.value })}
                placeholder="e.g., Law Firm"
              />
            </fieldset>
            <button className="btn submit-btn" type="submit">Submit</button>
          </form>
        )}

        {/* 🌐 Others Form */}
        {userType === "Others" && (
          <form onSubmit={handleOthersSubmit} className="others-form">
            <fieldset>
              <legend>Nature</legend>
              <input
                type="text"
                value={othersInfo.Nature}
                onChange={(e) => setOthersInfo({ ...othersInfo, Nature: e.target.value })}
                placeholder="Describe your background"
              />
            </fieldset>
            <button className="btn submit-btn" type="submit">Submit</button>
          </form>
        )}
        </div>
        </div>
      </div>
    </div>
  );
}
