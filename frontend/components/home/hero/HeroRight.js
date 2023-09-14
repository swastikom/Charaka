import React from 'react'
import LeftForm from './LeftForm'
// import {FaAngleLeft,FaAngleRight} from 'react-icons/fa';
import styles from '@/styles/HeroRight.module.css'
function HeroRight() {
  return (
    <div className={styles.HeroRight}>
      <LeftForm  />
    </div>
  );
}

export default HeroRight