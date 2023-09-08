import React from 'react'
import HeroLeft from "@/components/home/hero/HeroLeft";
import HeroRight from "@/components/home/hero/HeroRight";
import styles from '@/styles/hero.module.css'
function Hero() {
  return (
    <div className={styles.hero}>
      <HeroLeft />
      <HeroRight />
    </div>
  );
}

export default Hero