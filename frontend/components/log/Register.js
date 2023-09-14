"use client";

import React, { useState } from "react";
import styles from "@/styles/base.module.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Register() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPass, setConfirmPass] = useState("");
  const [showConPassword, setShowConPassword] = useState(false);

  const [error, setError] = useState("");

   const router = useRouter();
   
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
    setEmail(value);
  };

  const clearMailValue = () => {
    setEmail("");
  };

  const clearPasswordValue = () => {
    setPassword("");
  };

  const clearConPasswordValue = () => {
    setConfirmPass("");
  };

  function isValidEmail(email) {
    const pattern = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return pattern.test(email);
  }

  const handleRegister = async () => {
    if (email == "" || password == "") {
      setError("* All fields are required!");
      return;
    } else if (!isValidEmail(email)) {
      setError("* Invalid email");
      return;
    } else if (password.length < 8) {
      setError("* Password is too small");
      return
    }
    else if(password!=confirmPass){
        setError("*Confirm Password did'nt match!");
        return
    }
    else {

      try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("* User already exists.");
        return;
      }
       const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        console.log(res);
        router.push("/Login");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
      setEmail("");
      setPassword("");
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
              value={email}
              onChange={handleMailChange}
              placeholder="Enter your email" // Changed placeholder text
            />
            {email && (
              <RxCross1 className={styles.cross} onClick={clearMailValue} />
            )}
            <MdOutlineAlternateEmail />
          </div>
          <div className={styles.input_segment}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Create Password"
            />
            {password && (
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
          <button className={styles.signin} onClick={handleRegister}>
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
