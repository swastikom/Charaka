import React from 'react'
import styles from '@/styles/HeroLeft.module.css'
import {GiAlliedStar} from 'react-icons/gi'
import Link from 'next/link';


function HeroLeft() {
  return (
    <div className={styles.HeroLeft}>
      <h1>Diseases? Verify!</h1>
      <h2>
        Check out any disease whether it is positive or negative, with Charaka!
      </h2>
      <Link href='/Login'>
        <button>
          <GiAlliedStar />
          Save Report
        </button>
      </Link>
    </div>
  );
}

export default HeroLeft