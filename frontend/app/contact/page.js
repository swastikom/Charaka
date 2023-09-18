import React from 'react'
import styles from '@/styles/page.module.css'

import Contact from '@/components/contact/Contact'
function page() {
  return (
    <div className={styles.page}>
      <Contact/>
    </div>
  );
}

export default page