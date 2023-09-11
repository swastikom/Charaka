import React from "react";
import styles from "@/styles/page.module.css";
import Footer from "@/components/home/Footer";
import Forgot from "@/components/log/Forgot";
function page() {
  return (
    <div className={styles.page}>
      <Forgot />
      <Footer />
    </div>
  );
}

export default page;
