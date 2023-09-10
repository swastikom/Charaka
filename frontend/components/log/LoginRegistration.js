"use client";

import React, { useState } from "react";
import styles from "@/styles/base.module.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

function Login() {
  const [mailValue, setMailValue] = useState("");
  const [authType, setAuthType] = useState("login"); // Changed to string

  const handleMailChange = (event) => {
    const value = event.target.value;
    setMailValue(value);
  };

  const clearMailValue = () => {
    setMailValue("");
  };

  return (
    <>
      {authType === "login" ? ( // Changed to string comparison
        <div className={styles.base_authtype}>
          <h2>Login</h2>
          <div className={styles.input_segment}>
            <input
              type="text"
              value={mailValue}
              onChange={handleMailChange}
              placeholder="Enter your email" // Changed placeholder text
            />
            {mailValue && <RxCross1 onClick={clearMailValue} />}
            <MdOutlineAlternateEmail />
          </div>
        </div>
      ) : (
        <div className={styles.base_authtype}>Registration</div>
      )}
    </>
  );
}

export default Login;
