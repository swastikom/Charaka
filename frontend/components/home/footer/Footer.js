import React from 'react'
import styles from '@/styles/footer.module.css'
import Link from 'next/link'
import FooterLeftNav from './FooterLeftNav'
import FooterRightNav from './FooterRightNav'
import {BsHeartPulseFill} from 'react-icons/bs'

function Footer() {
  return (
    <div>
      <div className={styles.main_foot}>
      <Link href={'/'} className={styles.a}><BsHeartPulseFill/><h2 className={styles.h2}> Charaka</h2></Link>
      <FooterLeftNav></FooterLeftNav>
      <FooterRightNav></FooterRightNav>
    </div>
    <Link href={"https://github.com/swastikom/Charaka"} target='_blank'><p className={styles.p}>© 2023 by HackOn</p></Link>
    </div>
    
  )
}

export default Footer;