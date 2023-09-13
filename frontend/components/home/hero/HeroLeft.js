'use client'

import React from 'react';
import styles from '@/styles/HeroLeft.module.css';
import { GiAlliedStar } from 'react-icons/gi';
import { useRouter } from "next/navigation"; // Import the useRouter hook

function HeroLeft() {
  const router = useRouter(); // Initialize the router

  // Handle navigation to "/Login" when the button is clicked
  const handleNavigateToLogin = () => {
    router.push('/Login');
  };

  return (
    <div className={styles.HeroLeft}>
      <h1>Diseases? Verify!</h1>
      <h2>Check out any disease whether it is positive or negative, with Charaka!</h2>
      <button onClick={handleNavigateToLogin}>
        <GiAlliedStar /> Contribute
      </button>
    </div>
  );
}

export default HeroLeft;

