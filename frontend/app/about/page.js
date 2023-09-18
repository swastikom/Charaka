import React from 'react'
import styles from "@/styles/page.module.css";
import Footer from '@/components/home/footer/Footer';
import About from '@/components/about/About';
function page() {
  return (
    <div className={styles.about_page}>
      <About />
    </div>
  );
}

export default page