"use client";

import React, { useState } from "react";
import styles from "@/styles/base.module.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";

function Register() {
  const [mailValue, setMailValue] = useState("");

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
  const handleMailChange = (event) => {
    const value = event.target.value;
    setMailValue(value);
  };

  const clearMailValue = () => {
    setMailValue("");
  };

  const clearPasswordValue = () => {
    setPasswordValue("");
  };

  const clearConPasswordValue = () => {
    setConfirmPass("");
  };

  function isValidEmail(email) {
    const pattern = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return pattern.test(email);
  }

  const handleSignIn = () => {
    if (mailValue == "" || passwordValue == "") {
      setError("* All fields are required!");
      return;
    } else if (!isValidEmail(mailValue)) {
      setError("* Invalid email");
      return;
    } else if (passwordValue.length < 8) {
      setError("* Password is too small");
      return
    }
    else if(passwordValue!=confirmPass){
        setError("*Confirm Password did'nt match!");
        return
    }
    else {
      setMailValue("");
      setPasswordValue("");
      setConfirmPass("")
      setError("");
      setShowPassword(false);
      setShowConPassword(false);
    }
  };

  return (
    <>
      <div className={styles.base_authtype}>
        <div className={styles.base_login}>
          <h2>Register</h2>
          <div className={styles.input_segment}>
            <input
              type="text"
              value={mailValue}
              onChange={handleMailChange}
              placeholder="Enter your email" // Changed placeholder text
            />
            {mailValue && (
              <RxCross1 className={styles.cross} onClick={clearMailValue} />
            )}
            <MdOutlineAlternateEmail />
          </div>
          <div className={styles.input_segment}>
            <input
              type={showPassword ? "text" : "password"}
              value={passwordValue}
              onChange={handlePasswordChange}
              placeholder="Create Password"
            />
            {passwordValue && (
              <RxCross1 className={styles.cross} onClick={clearPasswordValue} />
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
              placeholder="Confirm Password"
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
          <div className={styles.linkSegment}>
            <Link href="/Login">Go to Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
