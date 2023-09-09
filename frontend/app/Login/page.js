import React from 'react'
import styles from '@/styles/page.module.css'
import Footer from '@/components/home/Footer';
import Login from '@/components/log/Login';
function page() {
  return (
    <div className={styles.page}>
      <Login/>
      <Footer />
    </div>
  );
}

export default page