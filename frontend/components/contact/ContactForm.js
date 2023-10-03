"use client";
import React, { useState } from "react";
import styles from "@/styles/contact.module.css";
function ContactForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setErrorMessage("Please fill all the fields!");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid Gmail address.");
      return;
    }

    // Define the mailOptions object
    const mailOptions = {
      from: "your@gmail.com", // Your Gmail address
      to: "swastikdhar18@gmail.com", // The recipient email address
      subject: `New Contact Form Submission - ${formData.subject}`,
      text: `
        Name: ${formData.name}
        Email: ${formData.email}
        Message: ${formData.message}
      `,
    };

    try {
      const email = "swastikom18@gmail.com";
      const subject = `${formData.subject}`;
      const body = `${formData.message}%0D%0A`; 
      const emailUrl = `mailto:${email}?subject=${subject}&body=${body}`;


      window.open(emailUrl);

    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage("* An error occurred while sending the email");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };



  return (
    <form onSubmit={handleSubmit} className={styles.parent}>
      <h1>Let's Talk !</h1>
      <input
        placeholder="Enter your name"
        type="text"
        required
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        placeholder="Enter your email address"
        type="email"
        required
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        placeholder="Enter your Subject"
        type="text"
        required
        id="subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
      />
      <textarea
        placeholder="Enter your message"
        required
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
      />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;
