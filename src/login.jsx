import { useState } from "react";
import GoIcon from "./assets/images/GIcon.svg";
import OutIcon from "./assets/images/OutIcon.svg";
import {  useNavigate } from "react-router-dom";


import "./login.css";

export default function Login() {
    // State for login form
    const [formData, setFormData] = useState({
        email: "",
        contact: "",
        code: "",
    });

    const [errors, setErrors] = useState({});

    // State for query form
    const [queryFormData, setQueryFormData] = useState({
        QueryUserName: "",
        query: "",
    });

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
        if(formData.email===""){
            newErrors.email = "Email is Required"
        }else if(!/\S+@\S+\.\S+/.test(formData.email)){
            newErrors.email = "Incorrect Email";
        }
        // Simple email validation
        // if (!/\S+@\S+\.\S+/.test(formData.email)) {
        //     newErrors.email = "Incorrect Email";
        // }

        // Contact validation (basic numeric check)
        if(formData.contact === ""){
            newErrors.contact = "Contact is Required"
        }
        else if (!/^\d{3}\d{3}\d{4}$/.test(formData.contact)) {
            newErrors.contact = "Incorrect Contact (format: 00-0000-0000)";
        }

        // Code validation (should be 5 digits)
        if(formData.code === ""){
            newErrors.code = "Code is Required"
        }
        else if (!/^\d{5}$/.test(formData.code)) {
            newErrors.code = "Invalid Code";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // Validate query form
    function validateQueryForm() {
        let newErrors = {};
        if(queryFormData.QueryUserName === ""){
            newErrors.QueryUserName = "Email is Required"
        }
        // Email validation for query form
        else if (!/\S+@\S+\.\S+/.test(queryFormData.QueryUserName)) {
            newErrors.QueryUserName = "Incorrect Email";
        }

        // Query field must not be empty
        if (queryFormData.query.trim() === " " || (queryFormData.query.match(/\b\w+\b/g) || []).length > 5 ) {
            newErrors.query = "Please enter a query of mininum charactres";
        }

        setQueryErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (validate()) {
            console.log("Login Form submitted successfully", formData);
            navigate('/Dashboard')
        } else {
            console.log("Validation failed", errors);
        }
    }

    function handleQuerySubmit(event) {
        event.preventDefault();
        if (validateQueryForm()) {
            console.log("Query Form submitted successfully", queryFormData);
        } else {
            console.log("Query Validation failed", queryErrors);
        }
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="testinomial">
                    <h1>What our client say about us</h1>
                </div>
                <div className="log-box">
                    <h1>Welcome</h1>
                    <h3>Please Enter your Details for Log In.</h3>
                    <div className="auto-login">
                        <button className="log-btn go-login">
                            <img className="g-icon" src={GoIcon} alt="Google Icon" />
                        </button>
                        <button className="log-btn out-login">
                            <img className="g-icon" src={OutIcon} alt="Outlook Icon" />
                        </button>
                    </div>
                    <span className="center-box">OR</span>
                    <span className="line-l"></span>
                    <span className="line-r"></span>

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
                        <button className="sign-btn">Send Code</button>
                        <fieldset className={errors.contact ? "error" : ""}>
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
                        {errors.contact && <p className="error-email">{errors.contact}</p>}

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

                        <button className="sign-btn">Sign In</button>
                    </form>

                    {/* Query Form */}
                    <div className="query">
                        <h1>Talk with us</h1>
                        <div className="query-box">
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
                                <button className="send-btn">Get in Touch</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
