 import { useState } from "react";
 import axios from "axios";
 import GoIcon from "./assets/images/GIcon.svg";
 import OutIcon from "./assets/images/OutIcon.svg";
 import {  Link, useNavigate } from "react-router-dom"; 
 import "./login.css";
 import { useToast } from "./toast/useToast";
import SignButton from "./components/SignButton";

export default function Login() {
    // You need to define the state and handlers here, as in your commented code above.
    // For brevity, you can uncomment and move the logic from your commented-out code.

    // Example: (Uncomment and move the logic from above)
    // import { useState } from "react";
    // import { useNavigate } from "react-router-dom";
    // ... (define formData, errors, handlers, etc.)
    //     // State for login form
     const [formData, setFormData] = useState({
         email: "",
         code: "",
     })
      const toast = useToast();
     const [errors, setErrors] = useState({})
       // 1) OAuth redirect
  const handleGoogleLogin = () =>
    (window.location.href = '/auth/google');
  const handleMicrosoftLogin = () =>
    (window.location.href = '/auth/microsoft');

     // State for query form
     const [queryFormData, setQueryFormData] = useState({
         QueryUserName: "",
         query: "",
     })
     const [queryErrors, setQueryErrors] = useState({});
     const navigate = useNavigate();
     // Handle input change for login form
function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
}

// Handle input change for query form
function handleQueryChange(event) {
    setQueryFormData({ ...queryFormData, [event.target.name]: event.target.value });
}

// Validate login form
function validate() {
    let newErrors = {};
    if (formData.email === "") {
        newErrors.email = "Email is Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Incorrect Email";
    }
    // Code validation (should be 5 digits)
    if (formData.code === "") {
        newErrors.code = "Code is Required";
    } else if (!/^\d{5}$/.test(formData.code)) {
        newErrors.code = "Invalid Code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
}

// Validate query form
function validateQueryForm() {
    let newErrors = {};
    if (queryFormData.QueryUserName === "") {
        newErrors.QueryUserName = "Email is Required";
    }
    // Email validation for query form
    else if (!/\S+@\S+\.\S+/.test(queryFormData.QueryUserName)) {
        newErrors.QueryUserName = "Incorrect Email";
    }

    // Query field must not be empty
    if (
        queryFormData.query.trim() === "" ||
        (queryFormData.query.match(/\b\w+\b/g) || []).length > 5
    ) {
        newErrors.query = "Please enter a query of mininum charactres";
    }

    setQueryErrors(newErrors);
    return Object.keys(newErrors).length === 0;
}

function handleSubmit(event) {
    event.preventDefault();
    if( formData.email === "admin" && formData.code === "admin") {
            navigate("/AdminDashboard");
        }
        else if( formData.email === "subadmin" && formData.code === "subadmin") {
            navigate("/Sub_Admin_Dashboard");
        }
         else if (validate()) {
        console.log("Login Form submitted successfully", formData);
        navigate("/UserType")
        // navigate("/Dashboard");
        
    } else {
        console.log("Validation failed", errors);
    }
}
const API_BASE = import.meta.env.VITE_API_URL;
const handleQuerySubmit = async e => {
    e.preventDefault();
    if (!validateQueryForm()) return;
    try {
      const response = await axios.post(`${API_BASE}contactus`,
        queryFormData, {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        
      );
        console.log("Response from backend:", response.data);
       toast({ message: 'Thank you for your input, we’ll be in touch shortly', type: 'success' });
               setQueryFormData({
      QueryUserName: "",
      query: "",
    });
      
    } catch (err) {
      setQueryErrors({
        api: err.response?.data?.message || "Submission failed",
      });
    }
  };
    return(
        <div className="login-container">
            <div className="login-box">
                <div className="log-box">
                    <h3>Login</h3>
                    <h5>Use one of the following options to register.</h5>
                    <h1>Welocme</h1>
                    <div className="auto-login">
                        <button
                        type="button"
                         className="log-btn go-login"
                         onClick={handleGoogleLogin}>
                            <img className="g-icon" src={GoIcon} alt="Google Icon" />
                        </button>
                        <button 
                        type="button"
                        className="log-btn out-login"
                        onClick={handleMicrosoftLogin}>
                            <img className="g-icon" src={OutIcon} alt="Outlook Icon" />
                        </button>
                    </div>
                    <div className="separator">OR</div>

                    <form className="log-form" onSubmit={handleSubmit}>
                        <fieldset className={errors.email ? "error" : ""}>
                            <legend>Email<span className="req"> *</span></legend>
                            <input
                                type="text"
                                placeholder="e.g. aditya@formulabilabs.com"
                                aria-label="Email id"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </fieldset>
                        {errors.email && <p className="error-email">{errors.email}</p>}
                        <SignButton>Send Code</SignButton>
                        {/* <fieldset className={errors.contact ? "error" : ""}>
                            <legend>Contact<span className="req"> *</span> </legend>
                            <input
                                type="text"
                                placeholder="00-000-0000"
                                aria-label="contact"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                            />
                        </fieldset> 
                        {errors.contact && <p className="error-email">{errors.contact}</p>}*/}
                        <fieldset className={errors.code ? "error" : ""}>
                            <legend>Code<span className="req"> *</span></legend>
                            <input
                                type="text"
                                placeholder="e.g. 12345"
                                aria-label="code"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                            />
                        </fieldset>
                        {errors.code && <p className="error-email">{errors.code}</p>}
                              <SignButton>
        Sign Up
      </SignButton>
                        {/* <button className="sign-btn">Sign In</button> */}
                    </form>
                   <p className="sign-poilcy"> By clicking Sign In, you agree to our <Link>Terms of Service</Link> and acknowledge that our <Link>Privacy Policy</Link> applies.</p>
                    {/* Query Form */}
                    <div className="query">
                        <h1>Talk with us</h1>
                        <div className="q-box">
                            <form onSubmit={handleQuerySubmit}>
                                <fieldset className={queryErrors.QueryUserName ? "error" : "q-email"}>
                                    <legend>Email<span className="req"> *</span></legend>
                                    <input
                                        type="text"
                                        placeholder="e.g. aditya@formulabilabs.com"
                                        aria-label="Email id"
                                        name="QueryUserName"
                                        value={queryFormData.QueryUserName}
                                        onChange={handleQueryChange}
                                    />
                                </fieldset>
                                {queryErrors.QueryUserName && <p className="error-text">{queryErrors.QueryUserName}</p>}
                                <br />
                                <fieldset className={queryErrors.query ? "error" : ""}>
                                    <legend>{"What's"} in your mind?</legend>
                                    <textarea
                                        type="text"
                                        placeholder="Have an idea? Please tell us."
                                        aria-label="query"
                                        name="query"
                                        value={queryFormData.query}
                                        onChange={handleQueryChange}
                                    ></textarea>
                                </fieldset>
                                {queryErrors.query && <p className="error-text">{queryErrors.query}</p>}
                                <SignButton onClick={handleQuerySubmit}>Get in Touch</SignButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}