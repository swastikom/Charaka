'use client'

import { useSession } from 'next-auth/react'
import styles from '@/styles/page.module.css'
import Hero from '@/components/home/hero/Hero'
import Footer from '@/components/home/Footer'
import AltHero from '@/components/home/hero/AltHero'
import { useRouter } from 'next/navigation'

import { signIn, signOut } from "next-auth/react";

export default function Home() {
  const { status, data: session } = useSession();
  const router = useRouter();
  // () => signOut()
if (status === "authenticated") {
  router.replace("/Dashboard");
}


  return (
    <div className={styles.page}>
        <Hero />
    </div>
  );
}
