"use client"

import React from 'react'
import styles from '@/styles/page.module.css'
import Footer from '@/components/home/Footer';
import Login from '@/components/log/Login';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
function page() {
  const { status, data: session } = useSession();
  const router = useRouter()
  if(status === "authenticated"){
    router.replace("/");
  }
return (
  <div className={styles.page}>
    <Login />
    <Footer />
  </div>
);
  
  
}

export default page