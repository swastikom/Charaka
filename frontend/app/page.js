import Image from 'next/image'
import styles from '@/styles/page.module.css'
import Hero from '@/components/home/hero/Hero'
import Footer from '@/components/home/Footer'

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero/>
      <Footer/>
    </div>
  )
}
