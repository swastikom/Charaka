"use client";


import React, { useState } from "react";
import styles from "@/styles/base.module.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {FcGoogle} from "react-icons/fc"
import Link from "next/link";
import axios from "axios";

function Login() {
  const [mailValue, setMailValue] = useState("");

  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  // Google Handler function
 

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
    } else {




      setMailValue("");
      setPasswordValue("");
      setError("");
    }
  };

  return (
    <>
      <div className={styles.base_authtype}>
        <div className={styles.base_login}>
          <h2>Login</h2>
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
              placeholder="Enter your Password"
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
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.signin} onClick={handleSignIn}>
            Sign in
          </button>
          <p>or</p>
          <button className={styles.Google} >
            <FcGoogle />
            Sign in with Google
          </button>
          <div className={styles.linkSegment}>
            <Link href="/register">Register</Link>
            <Link href="/forgot_password">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
