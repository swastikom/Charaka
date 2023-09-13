import React from 'react'
import styles from '@/styles/HeroLeft.module.css'
import {GiAlliedStar} from 'react-icons/gi'


function HeroLeft() {
  return (
    <div className={styles.HeroLeft}>
      <h1>Diseases? Verify!</h1>
      <h2>Check out any disease whether it is positive or negative, with Charaka!</h2>
      <button><GiAlliedStar/>Contribute</button>
    </div>
  );
}

export default HeroLeft