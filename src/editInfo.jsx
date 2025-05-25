import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./enroll.css";

export default function EditInfo() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate save
    setSuccess(true);

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/enroll");
    }, 2000);
  };

  return (
    <div className="enroll-container">
      <div className="enroll-box">
        <div className="en-box">
          <div className="form-header">
            <h1>Edit Session Info</h1>
            <button className="edit-button" onClick={() => navigate("/enroll")}>
              Cancel
            </button>
          </div>

          {success ? (
            <div className="success-message">
              ✅ Your information has been successfully updated. Redirecting…
            </div>
          ) : (
            <form className="fieldset-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <fieldset>
                  <legend>Name</legend>
                  <input type="text" defaultValue="Aditya" />
                </fieldset>
                <fieldset>
                  <legend>Last Name</legend>
                  <input type="text" defaultValue="Sharma" />
                </fieldset>
                <fieldset>
                  <legend>E-mail</legend>
                  <input type="text" defaultValue="adityasharma@formulabilabs.com"/>
                </fieldset>
                <fieldset>
                  <legend>Gender</legend>
                  <input type="text" defaultValue="MALE" />
                </fieldset>
                <fieldset>
                  <legend>Age</legend>
                  <input type="number" defaultValue="33" />
                </fieldset>
                <fieldset className="full">
                  <legend>Organisation Name</legend>
                  <input type="text" defaultValue="ABC Org" />
                </fieldset>
                <fieldset>
                  <legend>Organisation Type</legend>
                  <input type="text" defaultValue="Eaucation" />
                </fieldset>
                <fieldset>
                  <legend>Education</legend>
                  <input type="text" defaultValue="MCA" />
                </fieldset>
                <fieldset>
                  <legend>Other Qualification</legend>
                  <input type="text" defaultValue="CA" />
                </fieldset>
                <fieldset>
                  <legend>Year of Completion</legend>
                  <input type="text" defaultValue="2024" />
                </fieldset>
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <button type="submit" className="edit-button">
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
