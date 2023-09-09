import React from 'react'
import styles from "@/styles/page.module.css";
import Footer from '@/components/home/Footer';
import About from '@/components/about/About';
function page() {
  return (
    <div className={styles.page}>
      <About/>
      <Footer />
    </div>
  );
}

export default page