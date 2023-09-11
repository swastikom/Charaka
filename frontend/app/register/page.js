import React from "react";
import styles from "@/styles/page.module.css";
import Footer from "@/components/home/Footer";
import Register from "@/components/log/Register";
function page() {
  return (
    <div className={styles.page}>
      <Register />
      <Footer />
    </div>
  );
}

export default page;
