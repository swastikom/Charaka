"use client";
import React from "react";
import styles from "@/styles/response.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

function Response({
  Fever,
  handleResponse,
  Cough,
  Fatigue,
  Difficulty_Breathing,
  Age,
  Gender,
  Blood_Pressure,
  Cholesterol_Level,
  Disease_freq,
  Outcome,
}) {
  return (
    <div className={styles.Container}>
      <h1>Report Details</h1>
      <div>
        <h3>
          Always remember, if you are still feeling uncomfortable always visit
          to the healthcare professional!
        </h3>
      </div>
      <div className={styles.details}>
        <div className={styles.details1}>
          <div className={styles.segment}>
            Fever : <div>{Fever}</div>
          </div>
          <div className={styles.segment}>
            Cough : <div>{Cough}</div>
          </div>
          <div className={styles.segment}>
            Fatigue : <div>{Fatigue}</div>
          </div>
          <div className={styles.segment}>
            Breathing Problem : <div>{Difficulty_Breathing}</div>
          </div>
          <div className={styles.segment}>
            Age : <div>{Age}</div>
          </div>
        </div>
        <div className={styles.details2}>
          <div className={styles.segment}>
            Gender : <div>{Gender}</div>
          </div>
          <div className={styles.segment}>
            Blood Pressure : <div>{Blood_Pressure}</div>
          </div>
          <div className={styles.segment}>
            Cholesterol Level : <div>{Cholesterol_Level}</div>
          </div>
          <div className={styles.segment}>
            Disease : <div>{Disease_freq}</div>
          </div>
          <div className={
            Outcome==='Positive'
            ?`${styles.redprediction}`
            :styles.prediction
          }>{Outcome}</div>
        </div>
      </div>
      <button onClick={handleResponse}>
        <AiOutlineArrowLeft />
        Go back
      </button>
    </div>
  );
}

export default Response;
