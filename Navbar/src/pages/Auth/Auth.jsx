import React, { useState } from "react";
import "./Auth.css";

import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Auth = () => {

  const navigate = useNavigate();

  const API =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5001/api/auth";

  

  const [isLogin, setIsLogin] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  

  const [showOTPLogin, setShowOTPLogin] = useState(false);

  const [otpStep, setOtpStep] = useState(false);

  const [otpLoading, setOtpLoading] = useState(false);

  const [otpEmail, setOtpEmail] = useState("");

  const [otp, setOtp] = useState("");

  

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  

  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  

const handleLoginChange = (e) => {

  setLoginData({
    ...loginData,
    [e.target.name]: e.target.value,
  });

};



const handleSignupChange = (e) => {

  setSignupData({
    ...signupData,
    [e.target.name]: e.target.value,
  });

  setErrors({
    ...errors,
    [e.target.name]: "",
  });

};


const validateSignup = () => {

  let err = {};

  if (!signupData.fullname.trim()) {
    err.fullname = "Full Name is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(signupData.email)) {
    err.email = "Enter a valid email";
  }

  if (
    signupData.mobile &&
    !/^[6-9]\d{9}$/.test(signupData.mobile)
  ) {
    err.mobile = "Enter a valid mobile number";
  }

  if (signupData.password.length < 8) {
    err.password = "Password must be at least 8 characters";
  }

  if (
    signupData.password !== signupData.confirmPassword
  ) {
    err.confirmPassword = "Passwords do not match";
  }

  return err;

};



const handleSignup = async (e) => {

  e.preventDefault();

  const validation = validateSignup();

  if (Object.keys(validation).length > 0) {

    setErrors(validation);

    return;

  }

  setIsSubmitting(true);

  try {

    const res = await axios.post(
      `${API}/register`,
      {
        name: signupData.fullname,
        email: signupData.email,
        password: signupData.password,
      }
    );

    toast.success(
      res.data.message || "Account Created Successfully"
    );

    setSignupData({
      fullname: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });

    setErrors({});

    setIsLogin(true);

    setLoginData({
      email: signupData.email,
      password: "",
    });

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Signup Failed"
    );

  } finally {

    setIsSubmitting(false);

  }

};



const handleLogin = async (e) => {

  e.preventDefault();

  if (!loginData.email || !loginData.password) {

    return toast.error("Please fill all fields");

  }

  setIsSubmitting(true);

  try {

    const res = await axios.post(
      `${API}/login`,
      loginData
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    toast.success(
      res.data.message || "Login Successful"
    );

    navigate("/");

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Login Failed"
    );

  } finally {

    setIsSubmitting(false);

  }

};

const handleSendOTP = async () => {

  if (!otpEmail.trim()) {
    return toast.error("Please enter your email");
  }

  try {

    setOtpLoading(true);

    const res = await axios.post(
      `${API}/send-email-otp`,
      {
        email: otpEmail,
      }
    );

    toast.success(
      res.data.message || "OTP Sent Successfully"
    );

    setOtpStep(true);

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Failed to send OTP"
    );

  } finally {

    setOtpLoading(false);

  }

};


const handleVerifyOTP = async () => {

  if (!otp.trim()) {
    return toast.error("Please enter OTP");
  }

  try {

    setOtpLoading(true);

    const res = await axios.post(
      `${API}/verify-email-otp`,
      {
        email: otpEmail,
        otp,
      }
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    toast.success(
      res.data.message || "Login Successful"
    );

    navigate("/");

  } catch (err) {

    toast.error(
      err.response?.data?.message ||
      "Invalid OTP"
    );

  } finally {

    setOtpLoading(false);

  }

};
return (
  <div className="mh-auth-page">

    <div className="mh-auth-card">


      <div className="mh-auth-logo">
        MovieHunt
      </div>

      <h2>
        {showOTPLogin
          ? "Email Verification"
          : isLogin
          ? "Welcome Back"
          : "Create Account"}
      </h2>

      <p className="mh-auth-subtitle">

        {showOTPLogin
          ? "Login securely using Email OTP"
          : isLogin
          ? "Login to continue your movie journey"
          : "Join MovieHunt and book movies instantly"}

      </p>

      {!showOTPLogin && (

        <div className="mh-auth-toggle">

          <button
            className={isLogin ? "mh-auth-active" : ""}
            onClick={() => {
              setIsLogin(true);
              setErrors({});
            }}
          >
            Login
          </button>

          <button
            className={!isLogin ? "mh-auth-active" : ""}
            onClick={() => {
              setIsLogin(false);
              setErrors({});
            }}
          >
            Sign Up
          </button>

        </div>

      )}

      
      {!showOTPLogin && isLogin && (

        <form onSubmit={handleLogin}>

          <div className="mh-auth-input-box">

            <FaEnvelope className="mh-auth-icon" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />

          </div>

          <div className="mh-auth-input-box">

            <FaLock className="mh-auth-icon" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />

            <span
              className="mh-auth-eye"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>

          </div>

          <button
            type="submit"
            className="mh-auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Please wait..."
              : "Login"}
          </button>

          <div className="mh-auth-divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="mh-auth-submit-btn"
            onClick={() => {
              setShowOTPLogin(true);
              setOtpStep(false);
            }}
          >
            Continue with Email OTP
          </button>

        </form>

      )}
            

      {!showOTPLogin && !isLogin && (

        <form onSubmit={handleSignup}>

          <div className="mh-auth-input-box">
            <FaUser className="mh-auth-icon" />

            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={signupData.fullname}
              onChange={handleSignupChange}
            />
          </div>

          {errors.fullname && (
            <small className="mh-auth-error">
              {errors.fullname}
            </small>
          )}

          <div className="mh-auth-input-box">
            <FaEnvelope className="mh-auth-icon" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={signupData.email}
              onChange={handleSignupChange}
            />
          </div>

          {errors.email && (
            <small className="mh-auth-error">
              {errors.email}
            </small>
          )}

          <div className="mh-auth-input-box">
            <FaPhone className="mh-auth-icon" />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={signupData.mobile}
              onChange={handleSignupChange}
            />
          </div>

          {errors.mobile && (
            <small className="mh-auth-error">
              {errors.mobile}
            </small>
          )}

          <div className="mh-auth-input-box">
            <FaLock className="mh-auth-icon" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
            />

            <span
              className="mh-auth-eye"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>

          </div>

          {errors.password && (
            <small className="mh-auth-error">
              {errors.password}
            </small>
          )}

          <div className="mh-auth-input-box">
            <FaLock className="mh-auth-icon" />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
            />
          </div>

          {errors.confirmPassword && (
            <small className="mh-auth-error">
              {errors.confirmPassword}
            </small>
          )}

          <button
            type="submit"
            className="mh-auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Please wait..."
              : "Create Account"}
          </button>

        </form>

      )}

      

      {showOTPLogin && (

        <div>

          {!otpStep ? (

            <>

              <div className="mh-auth-input-box">

                <FaEnvelope className="mh-auth-icon" />

                <input
                  type="email"
                  placeholder="Enter Email"
                  value={otpEmail}
                  onChange={(e) =>
                    setOtpEmail(e.target.value)
                  }
                />

              </div>

              <button
                className="mh-auth-submit-btn"
                onClick={handleSendOTP}
                disabled={otpLoading}
              >
                {otpLoading
                  ? "Sending..."
                  : "Send OTP"}
              </button>

            </>

          ) : (

            <>

              <div className="mh-auth-input-box">

                <FaLock className="mh-auth-icon" />

                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value)
                  }
                />

              </div>

              <button
                className="mh-auth-submit-btn"
                onClick={handleVerifyOTP}
                disabled={otpLoading}
              >
                {otpLoading
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>

            </>

          )}

          <div className="mh-auth-link">

            <span
              onClick={() => {

                setShowOTPLogin(false);
                setOtpStep(false);
                setOtp("");
                setOtpEmail("");

              }}
            >
              ← Back to Login
            </span>

          </div>

        </div>

      )}

    </div>

  </div>

);

};

export default Auth;