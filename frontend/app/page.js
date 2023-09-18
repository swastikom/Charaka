'use client'

import { useSession } from 'next-auth/react'
import styles from '@/styles/page.module.css'
import Hero from '@/components/home/hero/Hero'
import Footer from '@/components/home/footer/Footer'
import AltHero from '@/components/home/hero/AltHero'

import { signIn, signOut } from "next-auth/react";

export default function Home() {
  const { status, data: session } = useSession();
  // () => signOut()

  
  const notShowAltHero = () =>{
    signOut()
  }


  return (
    <div className={styles.page}>
      {status === "authenticated" ? (
        <AltHero notShowAltHero={notShowAltHero} />
      ) : (
        <Hero />
      )}
    </div>
  );
}
