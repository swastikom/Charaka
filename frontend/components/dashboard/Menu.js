"use client"
import { useState } from 'react'
import React from 'react'
import styles from '@/styles/dashmenu.module.css'
import {BiLogOut} from 'react-icons/bi'
import {FaTrashAlt} from 'react-icons/fa'
import {MdOutlineLockReset} from 'react-icons/md'
function Menu() {

  
  const [sureLogout,setSureLogout] = useState("")
  const [sureDelete,setSureDelete] = useState("")
  const [sureResetPass,setSureResetPass] = useState("")

  const handleYes = () =>{
  }

  const handleNo = () => {
    
    setSureLogout("");
    
    setSureDelete("");
    
    setSureResetPass("");
  };

  const handleLogout = () =>{
    setSureLogout("Logout");
  }
  const handleDelete = () => {
    setSureDelete("Delete Your Account")
  };
  const handleResetPass = () => {
    setSureResetPass("Reset Password")
  };
  return (
    <div className={styles.top}>
      <div className={styles.welcome}>
        <h1>Welcome</h1> <h2>Swastik</h2>
      </div>
      {sureLogout || sureDelete || sureResetPass ? (
        <div className={styles.sure}>
          <h3>Do you want to {sureLogout || sureDelete || sureResetPass}?</h3>
          <div className={styles.sureButton}>
            <button onClick={handleYes}>Yes</button>
            <button onClick={handleNo}>No</button>
          </div>
        </div>
      ) : (
        <div className={styles.menu}>
          <button className={styles.report} onClick={handleLogout}>
            <BiLogOut />
            Logout
          </button>
          <button className={styles.report} onClick={handleDelete}>
            <FaTrashAlt />
            Delete User
          </button>
          <button className={styles.report} onClick={handleResetPass}>
            <MdOutlineLockReset /> Reset Password
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu