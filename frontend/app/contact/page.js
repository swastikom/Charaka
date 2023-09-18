import React from 'react'
import styles from '@/styles/contact.module.css'

import Contact from '@/components/contact/Contact'
function page() {
  return (
    <div className={styles.contact}>
      <Contact/>
    </div>
  );
}

export default page