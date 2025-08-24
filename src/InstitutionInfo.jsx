
import { useState } from "react";
import "./userInfo.css";
import Dropdown from "./dropdown/dropdown"; // ✅ Added import
import NumberStepper from "./components/NumberStepper";

export default function InstitutionInfo() {
 const ageGroup = ["13-18", "19-25", "25+"];
  const [userType, setUserType] = useState("edu_institute");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(ageGroup[0]);

  const [commonInfo, setCommonInfo] = useState({
    UserEmail: "",
    UserName: "",
    UserType: "edu_institute",
  });

  const [eduInfo, setEduInfo] = useState({
    NumberOfMembers: 5,
    TypeOfInstitute:"",
    TeamName: "",
    TeamLead: "",
    AgeGroup: ageGroup[0],
  });

  const [mediumTeamInfo, setMediumTeamInfo] = useState({
    NumberOfMembers: 11,
    TeamName: "",
    TeamLead: "",
    AgeGroup: ageGroup[0],
  });

  const [enterpriseTeamInfo, setEnterpriseTeamInfo] = useState({
    NumberOfMembers: 26,
    TeamName: "",
    TeamLead: "",
    AgeGroup: ageGroup[0],
  });

  const handleCommonChange = (field, value) => {
    setCommonInfo({ ...commonInfo, [field]: value });
  };

  // Submit Handlers
  const handleEduInstituteSubmit = (e) => {
    e.preventDefault();
    console.log("👥 Small Team:", { ...commonInfo, ...e });
  };

  const handleMediumTeamSubmit = (e) => {
    e.preventDefault();
    console.log("🏢 Medium Team:", { ...commonInfo, ...mediumTeamInfo });
  };

  const handleEnterpriseTeamSubmit = (e) => {
    e.preventDefault();
    console.log("🌐 Enterprise Team:", { ...commonInfo, ...enterpriseTeamInfo });
  };

  return (
    <div className="user-form-container">
      <div className="user-form-box">
        <div className="user-form-panel">
             <div className="button-box">
                  <button className="btn sec-btn" type="button">
                    Go Back
                  </button>
                <button className="btn skip-text" type="button">
                  Skip the Setup
                </button>
            </div>
          <h1>Institution Details</h1>

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
                <legend>Institute Name</legend>
                <input
                  type="text"
                  value={commonInfo.UserName}
                  onChange={(e) => handleCommonChange("UserName", e.target.value)}
                  placeholder="Enter your name"
                />
              </fieldset>

              <legend className="lable-type">Type</legend>
              <div className="card-radio-group">
                {[
                  { label: "Eduaction Institute", value: "edu_institute", icon: "👥" },
                  { label: "Firm", value: "firm", icon: "🏢 " },
                  { label: "Corporate", value: "corporate", icon: "🏢 " },
                  { label: "Other", value: "other", icon: "🌐" },
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
              </div>
            </form>

            {/* Small Team Form */}
            {userType === "edu_institute" && (
              <form onSubmit={handleEduInstituteSubmit} className="student-form">
                <Dropdown
                  label="Age Group"
                  options={ageGroup}
                  selected={selectedAgeGroup}
                  onSelect={(val) => {
                    setSelectedAgeGroup(val);
                    setEduInfo({ ...eduInfo, AgeGroup: val }); // ✅ Fixed
                  }}
                />
                <fieldset>
                  <legend>Batch Name</legend>
                  <input
                    type="text"
                    value={eduInfo.TeamLead}
                    onChange={(e) =>
                      setEduInfo({ ...eduInfo, TeamLead: e.target.value })
                    }
                    placeholder="e.g., John Doe"
                  />
                </fieldset>
                <fieldset>
                  <legend>Team Name</legend>
                  <input
                    type="text"
                    value={eduInfo.TeamName}
                    onChange={(e) =>
                      setEduInfo({ ...eduInfo, TeamName: e.target.value })
                    }
                    placeholder="e.g., Dream Coders"
                  />
                </fieldset>
                <fieldset>
                  <legend>Number of Members</legend>
      <NumberStepper
  value={eduInfo.NumberOfMembers}
  onChange={(val) =>
    setEduInfo((p) => ({ ...p, NumberOfMembers: val }))
  }
  min={5}
  max={10}
  size="lg"
/>
                </fieldset>
               
                  <button className="btn submit-btn" type="submit">
                    Next
                  </button>
              </form>
            )}

            {/* Medium Team Form */}
            {userType === "medium_team" && (
              <form onSubmit={handleMediumTeamSubmit} className="org-form">
                <Dropdown
                  label="Age Group"
                  options={ageGroup}
                  selected={selectedAgeGroup}
                  onSelect={(val) => {
                    setSelectedAgeGroup(val);
                    setMediumTeamInfo({ ...mediumTeamInfo, AgeGroup: val }); // ✅ Fixed
                  }}
                />
                <fieldset>
                  <legend>Team Lead Name</legend>
                  <input
                    type="text"
                    value={mediumTeamInfo.TeamLead}
                    onChange={(e) =>
                      setMediumTeamInfo({ ...mediumTeamInfo, TeamLead: e.target.value })
                    }
                    placeholder="e.g., John Doe"
                  />
                </fieldset>
                <fieldset>
                  <legend>Team Name</legend>
                  <input
                    type="text"
                    value={mediumTeamInfo.TeamName}
                    onChange={(e) =>
                      setMediumTeamInfo({ ...mediumTeamInfo, TeamName: e.target.value })
                    }
                    placeholder="e.g., Tech Ninjas"
                  />
                </fieldset>
                <fieldset>
                  <legend>Number of Members</legend>
        <NumberStepper
  value={eduInfo.NumberOfMembers}
  onChange={(val) =>
    setEduInfo((p) => ({ ...p, NumberOfMembers: val }))
  }
  min={11}
  max={25}
  size="lg"
/>
                </fieldset>
                  <button className="btn submit-btn" type="submit">
                    Next
                  </button>                
              </form>
            )}

            {/* Enterprise Team Form */}
            {userType === "enterprise_team" && (
              <form onSubmit={handleEnterpriseTeamSubmit} className="edu-form">
                <Dropdown
                  label="Age Group"
                  options={ageGroup}
                  selected={selectedAgeGroup}
                  onSelect={(val) => {
                    setSelectedAgeGroup(val);
                    setEnterpriseTeamInfo({ ...enterpriseTeamInfo, AgeGroup: val }); // ✅ Fixed
                  }}
                />
                <fieldset>
                  <legend>Team Lead Name</legend>
                  <input
                    type="text"
                    value={enterpriseTeamInfo.TeamLead}
                    onChange={(e) =>
                      setEnterpriseTeamInfo({
                        ...enterpriseTeamInfo,
                        TeamLead: e.target.value,
                      })
                    }
                    placeholder="e.g., John Doe"
                  />
                </fieldset>
                <fieldset>
                  <legend>Team Name</legend>
                  <input
                    type="text"
                    value={enterpriseTeamInfo.TeamName}
                    onChange={(e) =>
                      setEnterpriseTeamInfo({
                        ...enterpriseTeamInfo,
                        TeamName: e.target.value,
                      })
                    }
                    placeholder="e.g., Global Innovators"
                  />
                </fieldset>
                <fieldset>
                  <legend>Number of Members</legend>
       <NumberStepper
  value={eduInfo.NumberOfMembers}
  onChange={(val) =>
    setEduInfo((p) => ({ ...p, NumberOfMembers: val }))
  }
  min={26}
  max={40}
  size="lg"
/>
                </fieldset>
                  <button className="btn submit-btn" type="submit">
                    Continue 
                  </button>
                      

              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


