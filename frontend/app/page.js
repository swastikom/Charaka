'use client'
import Testimonials from '@/components/testimonials/Testimonials'
import { useSession } from 'next-auth/react'
import styles from '@/styles/page.module.css'
import Hero from '@/components/home/hero/Hero'
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
    <div>
        <div className={styles.page}>
          <Hero />
        </div>
        <Testimonials/>
    </div>

  );
}
