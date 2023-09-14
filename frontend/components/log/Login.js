"use client";


import React, { useState } from "react";
import styles from "@/styles/base.module.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {FcGoogle} from "react-icons/fc"
import Link from "next/link";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";


function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  
  const router = useRouter();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleMailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const clearemail = () => {
    setEmail("");
  };

  const clearpassword = () => {
    setPassword("");
  };

  function isValidEmail(email) {
    const pattern = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return pattern.test(email);
  }

  const handleSignIn = async () => {
    if (email == "" || password == "") {
      setError("* All fields are required!");
      return;
    } else if (!isValidEmail(email)) {
      setError("* Invalid email");
      return;
    } else if (password.length < 8) {
      setError("* Password is too small");
    } else {

       try {
         const res = await signIn("credentials", {
           email,
           password,
           redirect: false,
         });
         setEmail("");
         setPassword("");
         console.log(res)
         if (res.error) {
           setError("* Invalid Credentials");
           return;
         }
         else{
          router.push("/")
         }

       } catch (error) {
         console.log(error);
       }
      
      
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
              value={email}
              onChange={handleMailChange}
              placeholder="Enter your email" // Changed placeholder text
            />
            {email && (
              <RxCross1 className={styles.cross} onClick={clearemail} />
            )}
            <MdOutlineAlternateEmail />
          </div>
          <div className={styles.input_segment}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your Password"
            />
            {password && (
              <RxCross1 className={styles.cross} onClick={clearpassword} />
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
          <button className={styles.Google} onClick={() => signIn("google")}>
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
