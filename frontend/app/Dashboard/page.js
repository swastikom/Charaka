import React from 'react'
import styles from '@/styles/page.module.css'
import Menu from '@/components/dashboard/Menu'
import LeftForm from '@/components/home/hero/LeftForm';
function page() {
  return (
    <div className={styles.about_page}>
        <Menu />

        <LeftForm/>
    </div>
  );
}

export default page