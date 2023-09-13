import React from 'react'
import styles from '@/styles/page.module.css'
import Footer from '@/components/home/Footer';
import Contact from '@/components/contact/contact'
function page() {
  return (
    <div className={styles.page}>
      <Contact/>
      <Footer />
    </div>
  );
}

export default page