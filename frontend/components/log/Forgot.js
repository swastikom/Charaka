"use client";

import React, { useState } from "react";
import styles from "@/styles/base.module.css";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BsFillKeyFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

function Forgot() {
  const [mailValue, setMailValue] = useState("");
    const [otpValue, setOtpValue] = useState("");
     const [passwordValue, setPasswordValue] = useState("");
     const [showPassword, setShowPassword] = useState(false);

     const [confirmPass, setConfirmPass] = useState("");
     const [showConPassword, setShowConPassword] = useState(false);
     const [error, setError] = useState("");

     const handlePasswordChange = (e) => {
       setPasswordValue(e.target.value);
     };

     const handleConPasswordChange = (e) => {
       setConfirmPass(e.target.value);
     };

     const handleTogglePasswordVisibility = () => {
       setShowPassword(!showPassword);
     };

     const handleToggleConPasswordVisibility = () => {
       setShowConPassword(!showConPassword);
     };

     const clearPasswordValue = () => {
       setPasswordValue("");
     };

     const clearConPasswordValue = () => {
       setConfirmPass("");
     };
  
  

 const [forgotToggle,setForgotToggle] = useState(1)

  
  const handleMailChange = (event) => {
    const value = event.target.value;
    setMailValue(value);
  };

  const handleOtpChange = (e) =>{
    const otpVal = e.target.value;
    setOtpValue(otpVal)
  }

  const clearMailValue = () => {
    setMailValue("");
  };

  const clearOtpValue = () => {
    setOtpValue("");
  };
  

  function isValidEmail(email) {
    const pattern = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return pattern.test(email);
  }

  const handleGetOTP = () => {
    if (mailValue == "") {
      setError("* Email Required");
      return;
    } else if (!isValidEmail(mailValue)) {
      setError("* Invalid email");
      return;
    } else {
      setMailValue("");
      setError("")
    }

    setForgotToggle(2)
  };

  const handleOtp = () =>{
    if(otpValue == ""){
        setError("* OTP is required!")
        return
    }
    else{
        setError("")
        setMailValue("")
        setOtpValue("")
        setForgotToggle(3)
    }
  }

  const handleGoback = () =>{
    
        setError("");
        setMailValue("");
        setOtpValue("");
    setForgotToggle(1)
  }

  const handleSignIn = () => {
    if (confirmPass == "" || passwordValue == "") {
      setError("* All fields are required!");
      return;}
    else if (passwordValue.length < 8) {
      setError("* Password is too small");
      return;
    } else if (passwordValue != confirmPass) {
      setError("*Confirm Password did'nt match!");
      return;
    } else {
      setMailValue("");
      setPasswordValue("");
      setConfirmPass("");
      setError("");
      setShowPassword(false);
      setShowConPassword(false);
    }
  };

  return (
    <>
      <div className={styles.base_authtype}>
        {forgotToggle === 1 ? (
          <div className={styles.base_login}>
            <h3>Forgot Password?</h3>
            <div className={styles.input_segment}>
              <MdOutlineAlternateEmail />
              <input
                type="text"
                value={mailValue}
                onChange={handleMailChange}
                placeholder="Enter your email" // Changed placeholder text
              />
              {mailValue && (
                <RxCross1 className={styles.cross} onClick={clearMailValue} />
              )}
            </div>

            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.signin} onClick={handleGetOTP}>
              Get OTP
            </button>
            <div className={styles.linkSegment}>
              <Link href="/Login">Go to Login</Link>
            </div>
          </div>
        ) : forgotToggle === 2 ? (
          <div className={styles.otp}>
            <h4>OTP sent to your Mail</h4>
            <div className={styles.input_segment}>
              <BsFillKeyFill />
              <input
                type="text"
                value={otpValue}
                onChange={handleOtpChange}
                placeholder="Enter OTP" // Changed placeholder text
              />
              {otpValue && (
                <RxCross1 className={styles.cross} onClick={clearOtpValue} />
              )}
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.signin} onClick={handleOtp}>
              Submit
            </button>
            <button className={styles.goback} onClick={handleGoback}>
              Go back
            </button>
          </div>
        ) : (
          <div className={styles.otp}>
            <h4>Set New Password</h4>
            <div className={styles.input_segment}>
              <input
                type={showPassword ? "text" : "password"}
                value={passwordValue}
                onChange={handlePasswordChange}
                placeholder="Create New Password"
              />
              {passwordValue && (
                <RxCross1
                  className={styles.cross}
                  onClick={clearPasswordValue}
                />
              )}
              {showPassword ? (
                <BsEyeSlashFill onClick={handleTogglePasswordVisibility} />
              ) : (
                <BsEyeFill onClick={handleTogglePasswordVisibility} />
              )}
            </div>
            <div className={styles.input_segment}>
              <input
                type={showConPassword ? "text" : "password"}
                value={confirmPass}
                onChange={handleConPasswordChange}
                placeholder="Confirm New Password"
              />
              {confirmPass && (
                <RxCross1
                  className={styles.cross}
                  onClick={clearConPasswordValue}
                />
              )}
              {showConPassword ? (
                <BsEyeSlashFill onClick={handleToggleConPasswordVisibility} />
              ) : (
                <BsEyeFill onClick={handleToggleConPasswordVisibility} />
              )}
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.signin} onClick={handleSignIn}>
              Sign in
            </button>
            <button className={styles.goback} onClick={handleGoback}>
              Go back
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Forgot;
