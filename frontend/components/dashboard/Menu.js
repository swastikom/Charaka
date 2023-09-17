"use client"
import React from 'react'
import styles from '@/styles/dashmenu.module.css'
import {BiLogOut} from 'react-icons/bi'
import {FaTrashAlt} from 'react-icons/fa'
import {MdOutlineLockReset} from 'react-icons/md'
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
function Menu() {

  
  const { status, data: session } = useSession();
  
  const [sureLogout,setSureLogout] = useState("")
  const [sureDelete,setSureDelete] = useState("")
  const [sureResetPass,setSureResetPass] = useState("")

  const router = useRouter()

  const handleYes = () =>{
    if (sureLogout === "Logout") {
      signOut();
      router.push('/')
    } else if (sureDelete === "Delete Your Account") {

    }
    else if (sureResetPass === "Reset Password") {
      router.push("/forgot_password")
    }
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
        <h1>Welcome</h1> <h2>{session?.user?.name}</h2>
      </div>
      {sureLogout || sureDelete || sureResetPass ? (
        <div className={styles.sure}>
          <h3>Do you want to {sureLogout || sureDelete || sureResetPass}?</h3>
          <div className={styles.sureButton}>
            <button className={styles.choose} onClick={handleYes}>
              Yes
            </button>
            <button className={styles.choose} onClick={handleNo}>
              No
            </button>
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