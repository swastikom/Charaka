"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import React from "react";
import styles from "@/styles/response.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { signIn, signOut } from "next-auth/react";

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

  const { status, data: session } = useSession();
  const email = session?.user?.email;
  const newItemData = {
    email: email,
    item:
    {
    Fever: Fever,
    Cough: Cough,
    Fatigue: Fatigue,
    Difficulty_Breathing: Difficulty_Breathing,
    Age: Age,
    Gender: Gender,
    Blood_Pressure: Blood_Pressure,
    Cholesterol_Level: Cholesterol_Level,
    Disease_freq: Disease_freq,
    Outcome: Outcome
  }
    // ... (populate the rest of the fields)
  };

  const saveResponse = () => {
    // Define the user's email
    

    // Make a POST request to add the item to the user's itemList
    fetch(`/api/postItem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItemData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Item added successfully:", data);
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });



  } 

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
          <div
            className={
              Outcome === "Positive"
                ? `${styles.redprediction}`
                : styles.prediction
            }
          >
            {Outcome}
          </div>
        </div>
      </div>
      <button onClick={handleResponse}>
        <AiOutlineArrowLeft />
        Go back
      </button>{
        status==='authenticated'?
      <button className={styles.save}onClick={saveResponse}>
        Save
      </button>:<div></div>
      }
    </div>
  );
}

export default Response;
