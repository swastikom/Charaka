'use client'
import { signIn, signOut } from "next-auth/react";
import React from 'react'
import styles from '@/styles/page.module.css'
import Menu from '@/components/dashboard/Menu'
import LeftForm from '@/components/home/hero/LeftForm';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import SavedItems from "@/components/dashboard/SavedItems";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
function page() {
  const { status, data: session } = useSession();

  const router = useRouter()

  if(status==='unauthenticated'){
    router.push("/")
  }

  
  return (
    <div className={styles.about_page}>
      <Menu />
      <div className={styles.dash_body}>
        <LeftForm />
        <SavedItems/> 
      </div>
    </div>
  );
}

export default page