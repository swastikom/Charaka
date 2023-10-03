import React from 'react'
import styles from "@/styles/contact.module.css";
import ContactForm from './ContactForm';
import Image from 'next/image';

function contact() {
  return (<div className={styles.base}>
  <Image
  src="/contact.png"
  width={650}
  height={600}/>

  <ContactForm/>
  </div>)
}

export default contact