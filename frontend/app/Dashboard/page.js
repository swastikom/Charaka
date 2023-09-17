'use client'
import { signIn, signOut } from "next-auth/react";
import React from 'react'
import styles from '@/styles/page.module.css'
import Menu from '@/components/dashboard/Menu'
import LeftForm from '@/components/home/hero/LeftForm';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import SavedItems from "@/components/dashboard/SavedItems";
import { useState } from "react";
import { useSession } from "next-auth/react";
function page() {

  const [position,setPosition] = useState(true)

  const handleLeft =()=>{
    setPosition(true)
  }
  const handleRight =()=>{
    setPosition(false)
  }
  return (
    <div className={styles.about_page}>
      <Menu />
      <div className={styles.dash_body}>
        <LeftForm />
        <FaAngleLeft className={styles.leftright} onClick={handleLeft} />
        {position ? <LeftForm /> : <div>Hallo</div>}
        <FaAngleRight className={styles.leftright} onClick={handleRight} />
      </div>
    </div>
  );
}

export default page