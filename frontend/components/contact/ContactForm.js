import React from 'react'
import styles from '@/styles/contact.module.css'
function ContactForm() {
  return (
    <div className={styles.parent}>

      
      <h1>
        Let's Keep in Touch
      </h1>
      <input
      placeholder="Enter your name"
      type='text'
      required
      />
      <input
      placeholder='Enter your email address'
      type='email'
      required
      />
      <input
      placeholder='Enter your Subject'
      type='text'
      required
      />
      <textarea
      placeholder='Enter your message'
      required 
      />
      <button>Submit</button>
    </div>
    
  )
}

export default ContactForm
