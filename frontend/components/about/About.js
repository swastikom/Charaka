import React from 'react'
import Image from 'next/image';

import base from '@/styles/base.module.css';
// import styles from "@/styles/base.module.css";
import styles from "@/styles/cardHolder.module.css";

// import { loadDefaultErrorComponents } from 'next/dist/server/load-components';
 import Card from './Card';
import CardMiddle from './CardMiddle';
const cardInfo = [
  {
    title1: "About", title2: "Us",
    des: "Embrace our platform for cost-effective healthcare solutions. Accessible to all, it provides rapid, no-cost answers to everyday health concerns. With a user-friendly interface, easily assess symptoms for peace of mind. Our goal is to empower informed decisions and reserve professional advice for serious issues, reducing anxiety and inconvenience. Your well-being is our priority.", 
  },
  {
    title1: "Why", title2: "Charaka",
    des: "The website offers accessibility and ease of use, available 24/7 for users to assess their health from anywhere. This provide quick initial insights, especially helpful for preliminary information. User-friendly interfaces cater to diverse users, promoting proactive health awareness. However, this isn't a substitute for professional medical advice, despite a 91% accuracy rate in analysis.",
  },
  {
    title1: "Our" ,title2: "Mission",
    des: "Our website empowers users with reliable health information, prioritizing accuracy and privacy. Transparency and accessibility are key, with clear citations and commitment to all users. We continuously improve content, emphasizing professional consultation. Our community fosters sharing, and ethical advertising maintains trust. Globally relevant, we cater to diverse health needs.",
  },
]
function About() {
  
  return (
    
    <div className={base.base}>
      {/* <h1 className={styles.head}>About <span className={styles.h1_span}>Us</span></h1> */}
      
      <div className={styles.c0}><Image src="/conv_pic.png" height={450} width={450}></Image><Card title1 = {cardInfo[0].title1} title2 = {cardInfo[0].title2} des = {cardInfo[0].des} /> </div>
      <div className={styles.c1}><CardMiddle title1 = {cardInfo[1].title1} title2 = {cardInfo[1].title2} des = {cardInfo[1].des} /> <Image src="/AI_tree.png" height={450} width={450}/></div>
      <div className={styles.c2}><Image src="/AI_doctor.jpg" height={450} width={450}></Image><Card title1 = {cardInfo[2].title1} title2 = {cardInfo[2].title2} des = {cardInfo[2].des} /> </div>
    
      </div>
      
  )
}

export default About;