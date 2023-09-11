"use client";
import React, { useState } from "react";
import styles from "@/styles/LeftForm.module.css";
import { ImCross } from "react-icons/im";
import {FaAngleLeft} from "react-icons/fa";
import Response from "./Response";

const validDiseases = [
  "Influenza",
  "Common Cold",
  "Eczema",
  "Asthma",
  "Hyperthyroidism",
  "Allergic Rhinitis",
  "Anxiety Disorders",
  "Diabetes",
  "Gastroenteritis",
  "Pancreatitis",
  "Rheumatoid Arthritis",
  "Depression",
  "Liver Cancer",
  "Stroke",
  "Urinary Tract Infection",
  "Dengue Fever",
  "Hepatitis",
  "Kidney Cancer",
  "Migraine",
  "Muscular Dystrophy",
  "Sinusitis",
  "Ulcerative Colitis",
  "Bipolar Disorder",
  "Bronchitis",
  "Cerebral Palsy",
  "Colorectal Cancer",
  "Hypertensive Heart Disease",
  "Multiple Sclerosis",
  "Myocardial Infarction (Heart...",
  "Urinary Tract Infection (UTI)",
  "Osteoporosis",
  "Pneumonia",
  "Atherosclerosis",
  "Chronic Obstructive Pulmonary...",
  "Epilepsy",
  "Hypertension",
  "Obsessive-Compulsive Disorde...",
  "Psoriasis",
  "Rubella",
  "Cirrhosis",
  "Conjunctivitis (Pink Eye)",
  "Liver Disease",
  "Malaria",
  "Spina Bifida",
  "Kidney Disease",
  "Osteoarthritis",
  "Klinefelter Syndrome",
  "Acne",
  "Brain Tumor",
  "Cystic Fibrosis",
  "Glaucoma",
  "Rabies",
  "Chickenpox",
  "Coronary Artery Disease",
  "Eating Disorders (Anorexia,...",
  "Fibromyalgia",
  "Hemophilia",
  "Hypoglycemia",
  "Lymphoma",
  "Tuberculosis",
  "Lung Cancer",
  "Hypothyroidism",
  "Autism Spectrum Disorder (ASD)",
  "Crohn's Disease",
  "Hyperglycemia",
  "Melanoma",
  "Ovarian Cancer",
  "Turner Syndrome",
  "Zika Virus",
  "Cataracts",
  "Pneumocystis Pneumonia (PCP)",
  "Scoliosis",
  "Sickle Cell Anemia",
  "Tetanus",
  "Anemia",
  "Cholera",
  "Endometriosis",
  "Sepsis",
  "Sleep Apnea",
  "Down Syndrome",
  "Ebola Virus",
  "Lyme Disease",
  "Pancreatic Cancer",
  "Pneumothorax",
  "Appendicitis",
  "Esophageal Cancer",
  "HIV/AIDS",
  "Marfan Syndrome",
  "Parkinson's Disease",
  "Hemorrhoids",
  "Polycystic Ovary Syndrome (PCOS)",
  "Systemic Lupus Erythematosus...",
  "Typhoid Fever",
  "Breast Cancer",
  "Measles",
  "Osteomyelitis",
  "Polio",
  "Chronic Kidney Disease",
  "Hepatitis B",
  "Prader-Willi Syndrome",
  "Thyroid Cancer",
  "Bladder Cancer",
  "Otitis Media (Ear Infection)",
  "Tourette Syndrome",
  "Alzheimer's Disease",
  "Chronic Obstructive Pulmonary Disease (COPD)",
  "Dementia",
  "Diverticulitis",
  "Mumps",
  "Cholecystitis",
  "Prostate Cancer",
  "Schizophrenia",
  "Gout",
  "Testicular Cancer",
  "Tonsillitis",
  "Williams Syndrome",
];

const Fever = ["Yes","No"];
const Cough = ["Yes", "No"];
const Fatigue = ["Yes", "No"];
const Difficulty_Breathing = ["Yes", "No"];
const Gender = ["Male", "Female"];
const Blood_Pressure = ["High", "Normal","Low"];
const Cholesterol_Level = ["High", "Normal", "Low"];

function LeftForm() {
  const [formData, setFormData] = useState({
    Fever: "",
    Cough: "",
    Fatigue: "",
    Difficulty_Breathing: "",
    Age: 0,
    Gender: "",
    Blood_Pressure: "",
    Cholesterol_Level: "",
    Disease_freq: "",
  });

  const [responseComponent, setResponseComponent] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [ageError, setAgeError] = useState(""); // Add state for age error
  const [diseaseError, setDiseaseError] = useState("");
  const [formChanged, setFormChanged] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
   const [apiResponse, setApiResponse] = useState(null);
   const [apiError, setApiError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setDiseaseError("");
    setFormChanged(true);
  };

  const handleAgeChange = (event) => {
    const value = event.target.value;
    setAgeValue(value);
    setFormChanged(true);
    // Validate age as an integer within the range [1, 100]
    if (Number(value) < 1 || Number(value) > 100) {
      setAgeError("*Age must be between 1 and 100");
    } else if (!Number.isInteger(Number(value))) {
      setAgeError("*Age must be a decimal Number");
    } else {
      setAgeError(""); // Clear the error message if age is valid
    }
  };


 const handleButtonSelect = (fieldName, selectedValue) => {
   setFormData({ ...formData, [fieldName]: selectedValue });
   setButtonClicked(true);
   setFormChanged(true);
  
 };

  const handleClearInput = () => {
    setInputValue("");
    setDiseaseError("");
     if (buttonClicked) {
       setFormChanged(true); // Reset formChanged only if a button has been clicked
     }
     else if(ageValue!=""){
      setFormChanged(true); 
     }
     else{
      setFormChanged(false);
     }
  };

  const handleClearAge = () => {
    setAgeValue("");
    setAgeError(""); // Clear the error message when clearing age
    // setFormChanged(false);

    if (buttonClicked) {
      setFormChanged(true); // Reset formChanged only if a button has been clicked
    } else if (inputValue != "") {
      setFormChanged(true);
    } else {
      setFormChanged(false);
    }
  };

  const handleResetForm = () => {
    // Set default values for the form fields and clear errors
    setFormData({
      Fever: "",
      Cough: "",
      Fatigue: "",
      Difficulty_Breathing: "",
      Age: 0,
      Gender: "",
      Blood_Pressure: "",
      Cholesterol_Level: "",
      Disease_freq: "",
    });

    // Clear age and disease errors
    setAgeError("");
    setDiseaseError("");

    // Reset age and inputValue state
    setAgeValue("");
    setInputValue("");

    
    setFormChanged(false);
    // Reset the formChanged state to false
    
  };

  const handleResponse = () =>{
    setFormData({
      Fever: "",
      Cough: "",
      Fatigue: "",
      Difficulty_Breathing: "",
      Age: 0,
      Gender: "",
      Blood_Pressure: "",
      Cholesterol_Level: "",
      Disease_freq: "",
    });

    setAgeValue("");
    setInputValue("");
    setResponseComponent(false);
  }

  const handleCheckReport = async () => {
    // Check if the entered disease is in the validDiseases array
    if (!validDiseases.includes(inputValue)) {
      setDiseaseError("* Disease does not exist, Please Check About section!");
      return;
    } else {
      setDiseaseError("");
    }

    if (
      formData.Fever === "" ||
      formData.Cough === "" ||
      formData.Fatigue === "" ||
      formData.Difficulty_Breathing === "" ||
      ageValue === "" ||
      formData.Gender === "" ||
      formData.Blood_Pressure === "" ||
      formData.Cholesterol_Level === "" ||
      inputValue === ""
    ) {
      setDiseaseError("* All values required");
      return; // Exit the function without further processing
    }

     const requestData = {
       Fever: formData.Fever || "",
       Cough: formData.Cough || "",
       Fatigue: formData.Fatigue || "",
       Difficulty_Breathing: formData.Difficulty_Breathing || "",
       Age: parseInt(ageValue) || 0, // Convert ageValue to an integer
       Gender: formData.Gender || "",
       Blood_Pressure: formData.Blood_Pressure || "",
       Cholesterol_Level: formData.Cholesterol_Level || "",
       Disease_freq: inputValue || "",
     };

      try {
      const response = await fetch(
        "https://charakaserver.onrender.com/predict_outcome",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      // Handle the response or any necessary logic here
      // For example:
      if (response.ok) {
        setApiResponse(responseData);
        setApiError(null);
      } else {
        setApiResponse(null);
        setApiError(responseData.error);
      }
    } catch (error) {
      setApiResponse(null);
      setApiError("An error occurred while making the API request.");
    }

     

     setFormChanged(false);
     setResponseComponent(true)

     

     setAgeError("");
     setDiseaseError("");

     
  };

  return (
    <>
      {responseComponent ? (
        <Response
          Fever={formData.Fever}
          handleResponse={handleResponse}
          Cough={formData.Cough}
          Fatigue={formData.Fatigue}
          Difficulty_Breathing={formData.Difficulty_Breathing}
          Age={ageValue}
          Gender={formData.Gender}
          Blood_Pressure={formData.Blood_Pressure}
          Cholesterol_Level={formData.Cholesterol_Level}
          Disease_freq={inputValue}
        />
      ) : (
        <div className={styles.LeftForm}>
          <div>
            <div>
              <h3>Do you have Fever?</h3>
              <div>
                {/* <button>Yes</button>
    <button>No</button> */}
                {Fever.map((Fever) => (
                  <button
                    key={Fever}
                    onClick={() => handleButtonSelect("Fever", Fever)}
                    className={
                      formData.Fever === Fever
                        ? `${styles.active}`
                        : styles.formButton
                    }
                  >
                    {Fever}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3>Do you have Cough?</h3>
              <div>
                {Cough.map((Cough) => (
                  <button
                    key={Cough}
                    onClick={() => handleButtonSelect("Cough", Cough)}
                    className={
                      formData.Cough === Cough
                        ? `${styles.active}`
                        : styles.formButton
                    }
                  >
                    {Cough}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3>Do you have Fatigue?</h3>
              <div>
                {Fatigue.map((Fatigue) => (
                  <button
                    key={Fatigue}
                    onClick={() => handleButtonSelect("Fatigue", Fatigue)}
                    className={
                      formData.Fatigue === Fatigue
                        ? `${styles.active}`
                        : styles.formButton
                    }
                  >
                    {Fatigue}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3>Feeling difficulty in breathing?</h3>
              <div>
                {Difficulty_Breathing.map((Difficulty_Breathing) => (
                  <button
                    key={Difficulty_Breathing}
                    onClick={() =>
                      handleButtonSelect(
                        "Difficulty_Breathing",
                        Difficulty_Breathing
                      )
                    }
                    className={
                      formData.Difficulty_Breathing === Difficulty_Breathing
                        ? `${styles.active}`
                        : styles.formButton
                    }
                  >
                    {Difficulty_Breathing}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3>Your age?</h3>
              <div className={styles.input}>
                <input
                  type="text"
                  value={ageValue}
                  onChange={handleAgeChange}
                  placeholder="Enter your age"
                />
                {ageValue && (
                  <div className={styles.clearInput} onClick={handleClearAge}>
                    <ImCross />
                  </div>
                )}
              </div>
              {/* Display the age error message */}
              {ageError && <p className={styles.error}>{ageError}</p>}
            </div>
          </div>
          <div>
            <div>
              <h3>What is your Gender?</h3>
              <div>
                {Gender.map((Gender) => (
                  <button
                    key={Gender}
                    onClick={() => handleButtonSelect("Gender", Gender)}
                    className={
                      formData.Gender === Gender
                        ? ` ${styles.active}`
                        : styles.formButton
                    }
                  >
                    {Gender}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3>What is your Blood Pressure?</h3>
              <div>
                {Blood_Pressure.map((Blood_Pressure) => (
                  <button
                    key={Blood_Pressure}
                    onClick={() =>
                      handleButtonSelect("Blood_Pressure", Blood_Pressure)
                    }
                    className={
                      formData.Blood_Pressure === Blood_Pressure
                        ? `${styles.active}`
                        : styles.formButton
                    }
                  >
                    {Blood_Pressure}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3>What is your Colesterol level?</h3>
              <div>
                {Cholesterol_Level.map((Cholesterol_Level) => (
                  <button
                    key={Cholesterol_Level}
                    onClick={() =>
                      handleButtonSelect("Cholesterol_Level", Cholesterol_Level)
                    }
                    className={
                      formData.Cholesterol_Level === Cholesterol_Level
                        ? ` ${styles.active}`
                        : styles.formButton
                    }
                  >
                    {Cholesterol_Level}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3>Disease you're suspecting?</h3>
              <div className={styles.input}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Enter disease name"
                />
                {inputValue && ( // Only show the clear button if inputValue is not empty
                  <div className={styles.clearInput} onClick={handleClearInput}>
                    <ImCross />
                  </div>
                )}
              </div>
              {diseaseError && <p className={styles.error}>{diseaseError}</p>}
            </div>
            <div className={styles.submitButtonGroup}>
              <button className={styles.report} onClick={handleCheckReport}>
                Check Report
              </button>
              {formChanged && ( // Display the reset button if the form has changed
                <button className={styles.reset} onClick={handleResetForm}>
                  <FaAngleLeft />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LeftForm;
