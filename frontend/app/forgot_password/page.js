"use client";

import React from "react";
import styles from "@/styles/page.module.css";
import Footer from "@/components/home/Footer";
import Forgot from "@/components/log/Forgot";


import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


function page() {

  const { status, data: session } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    router.replace("/");
  }

  
  return (
    <div className={styles.page}>
      <Forgot />
      <Footer />
    </div>
  );
}

export default page;
