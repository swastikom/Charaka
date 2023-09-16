"use client";

import React, { useState } from "react";
import styles from "@/styles/base.module.css";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BsFillKeyFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

function Forgot() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpmail, setOtpmail] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showConPassword, setShowConPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter()

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

  const [forgotToggle, setForgotToggle] = useState(1);

  const handleMailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleOtpChange = (e) => {
    const otpVal = e.target.value;
    setOtp(otpVal);
  };

  const clearemail = () => {
    setEmail("");
  };

  const clearotp = () => {
    setOtp("");
  };

  function isValidEmail(email) {
    const pattern = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return pattern.test(email);
  }

  const handleGmail = async () => {
    if (email == "") {
      setError("* Email Required");
      return;
    } else if (!isValidEmail(email)) {
      setError("* Invalid email");
      return;
    } else {
      try {
        const resUserExists = await fetch("api/userExists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const { user } = await resUserExists.json();
        
        if (!user) {
          setError("* User does not exist!");
          return;
        } else {
          try {
            const requestData = {
              email: email,
            };
            const response = await fetch(
              "https://charakaserver.onrender.com/password_reset/request",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
              }
            );
            if (response.ok) {
              // Request was successful, continue with your logic
              console.log("Password reset request sent successfully.");
              // You can clear the email input and error here if needed
              setOtpmail(email);
              setEmail("");
              setError("");
            } else {
              // Handle server error or other issues here
              console.error("Server error occurred. Please try again.");
            }
          } catch (error) {
            console.error("Error occurred. Please try again.");
          }
        }
      } catch (error) {
        console.log("Error Occured. Please Try again!");
        return;
      }
    }

    setForgotToggle(2);
  };

  const handleOtp = async () => {
    function isValidOtp(otpcheck) {
      const pattern = /^\d{4}$/;

      return pattern.test(otpcheck);
    }
    if (otp == "") {
      setOtpError("* OTP is required!");
      return;
    } else if(otp.length>4){
      setOtpError("* OTP must be of 4 digits");
      return;
    }
    else if (!isValidOtp(otp)) {
      setOtpError("* OTP is Invalid!");
    } else {
      const otpVerifyData = {
        email: otpmail,
        otp: otp,
      };

      try {
        const response = await fetch(
          "https://charakaserver.onrender.com/password_reset/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(otpVerifyData),
          }
        );
        if (response.ok) {
          console.log(response);
        } else {
          // Handle server error or other issues here
          setOtpError("* Wrong OTP Entered");
          return;
        }
      } catch (error) {
        console.error(error);
      }

      setError("");
      setEmail("");
      setOtp("");
      setOtpError("");
      setForgotToggle(3);
    }
  };

  const handleGoback = () => {
    setError("");
    setEmail("");
    setOtp("");
    setOtpError("");
    setForgotToggle(1);
  };

  const handleSignIn = async () => {
    if (confirmPass == "" || passwordValue == "") {
      setError("* All fields are required!");
      return;
    } else if (passwordValue.length < 8) {
      setError("* Password is too small");
      return;
    } else if (passwordValue != confirmPass) {
      setError("*Confirm Password did'nt match!");
      return;
    } else {

const passResetData = {
  email: otpmail,
  newPassword: passwordValue,
  confirmNewPassword: confirmPass,
};

      try {
        const response = await fetch(
          "https://charakaserver.onrender.com/password_reset",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(passResetData),
          }
        );
        if (response.ok) {
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }

      setEmail("");
      setPasswordValue("");
      setConfirmPass("");
      setError("");
      setShowPassword(false);
      setShowConPassword(false);

      router.push("/Login")
    }
  };

  return (
    <>
      <div className={styles.base_authtype}>
        {forgotToggle === 1 ? (
          <div className={styles.base_login}>
            <h3>Forgot Password?</h3>
            <div className={styles.input_segment}>
              <input
                type="text"
                value={email}
                onChange={handleMailChange}
                placeholder="Enter your email" // Changed placeholder text
              />
              <MdOutlineAlternateEmail />
              {email && (
                <RxCross1 className={styles.cross} onClick={clearemail} />
              )}
            </div>

            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.signin} onClick={handleGmail}>
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
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter OTP" // Changed placeholder text
              />
              {otp && <RxCross1 className={styles.cross} onClick={clearotp} />}
            </div>
            {otpError && <p className={styles.error}>{otpError}</p>}
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
              Set Password
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
