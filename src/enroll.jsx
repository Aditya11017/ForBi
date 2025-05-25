
import { useNavigate } from "react-router-dom";
import "./enroll.css";

export default function Enroll() {
  const navigate = useNavigate();

  const profileData = {
    name: "Aditya",
    lastName: "Sharma",
    email: "AdityaSharma@formulabilabs.com",
    gender: "MALE",
    age: 33,
    orgName: "ABC Org",
    orgType: "Eaucation",
    education: "MCA",
    otherQual: "CA",
    yearOfCompletion: 2024,
    avatarUrl: ""
  };

  return (
    <div className="enroll-container">
      <div className="enroll-box">
        <div className="en-box">
          <div className="form-header">
            <h1>Session Enrollment Details</h1>
            <button
              className="edit-button"
              onClick={() => navigate("/EditInfo")}
            >
              Edit Info
            </button>
          </div>
          <div className="en-form-box">
            <form className="fieldset-form">
              <fieldset className="profile-field">
                <legend>Session For</legend>
                <div className="profile-container">
                  <div
                    className="profile-img"
                    style={{
                      backgroundImage: `url(${profileData.avatarUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="profile-info">
                    <div className="profile-name">
                      {profileData.name} {profileData.lastName}
                    </div>
                    <div className="profile-email">{profileData.email}</div>
                  </div>
                </div>
              </fieldset>

              <div className="form-grid">
                <fieldset>
                  <legend>Name</legend>
                  <input type="text" value={profileData.name} readOnly />
                </fieldset>

                <fieldset>
                  <legend>Last Name</legend>
                  <input type="text" value={profileData.lastName} readOnly />
                </fieldset>
                

                <fieldset>
                  <legend>Gender</legend>
                  <input type="text" value={profileData.gender} readOnly />
                </fieldset>

                <fieldset>
                  <legend>Age</legend>
                  <input type="text" value={profileData.age} readOnly />
                </fieldset>

                <fieldset className="full">
                  <legend>Organisation Name <span className="note">(None if not associated with any organization)</span></legend>
                  <input type="text" value={profileData.orgName} readOnly />
                </fieldset>

                <fieldset>
                  <legend>Organisation Type</legend>
                  <input type="text" value={profileData.orgType} readOnly />
                </fieldset>

                <fieldset>
                  <legend>Education</legend>
                  <input type="text" value={profileData.education} readOnly />
                </fieldset>

                <fieldset>
                  <legend>Other Qualification</legend>
                  <input type="text" value={profileData.otherQual} readOnly />
                </fieldset>

                <fieldset>
                  <legend>Year of Completion of Degree</legend>
                  <input type="text" value={profileData.yearOfCompletion} readOnly />
                </fieldset>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
