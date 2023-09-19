"use client"

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import {TfiReload} from "react-icons/tfi"
import styles from "@/styles/responseCard.module.css";
import Image from "next/image";

function Responses() {
  const { status, data: session } = useSession();
  const requestData = session?.user?.email;
  const [resList, setResList] = useState({ itemList: [] });
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [toggle, setToggle] = useState(false);

  // Load the component's state from local storage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("responsesState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setResList(parsedState.resList);
      setCurrentItemIndex(parsedState.currentItemIndex);
      setToggle(parsedState.toggle);
    } else {
      loadList(); // If no saved state exists, load the data
    }
  }, []); // Load the list when the component mounts

  // Save the component's state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "responsesState",
      JSON.stringify({
        resList,
        currentItemIndex,
        toggle,
      })
    );
  }, [resList, currentItemIndex, toggle]);

  const loadList = async () => {
    try {
      if (status === "authenticated") {
        const response = await fetch(
          "https://charakaserver.onrender.com/fetch_itemlist",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: requestData }),
          }
        );

        const responseData = await response.json();
        if (response.ok) {
          console.log("Item loaded successfully!");

          setResList(responseData);
          setToggle(true);
        } else {
          console.log("ERROR!");
        }
      }
    } catch (error) {
      console.log("Item not loaded successfully!");
      return;
    }
  };

  const navigateNext = () => {
    if (currentItemIndex < resList.itemList.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    }
  };

  const navigatePrevious = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
    }
  };


  return (
    <div>
      {resList.itemList.length > 0 && toggle === true ? (
        <div className={styles.res}>
          <h1>
            Your saved Reports{" "}
            <button onClick={() => setToggle(false)}>
              <RxCross2 />
            </button>
          </h1>
          <div className={styles.cardHolder}>
            <button
              onClick={navigatePrevious}
              disabled={currentItemIndex === 0}
            >
              <FaAngleLeft />
            </button>
            <div className={styles.container}>
              <div>
                <p>Fever: {resList.itemList[currentItemIndex]?.Fever}</p>
                <p>Cough: {resList.itemList[currentItemIndex]?.Cough}</p>
                <p>Fatigue: {resList.itemList[currentItemIndex]?.Fatigue}</p>
                <p>
                  Breathing Difficulty:{" "}
                  {resList.itemList[currentItemIndex]?.Difficulty_Breathing}
                </p>
                <p>Age: {resList.itemList[currentItemIndex]?.Age}</p>
              </div>
              <div>
                <p>Gender: {resList.itemList[currentItemIndex]?.Gender}</p>
                <p>
                  Blood Pressure:{" "}
                  {resList.itemList[currentItemIndex]?.Blood_Pressure}
                </p>
                <p>
                  Cholesterol Level:{" "}
                  {resList.itemList[currentItemIndex]?.Cholesterol_Level}
                </p>
                <p>
                  Disease: {resList.itemList[currentItemIndex]?.Disease_freq}
                </p>
                <p>Report: {resList.itemList[currentItemIndex]?.outcome}</p>
              </div>
            </div>

            <button
              onClick={navigateNext}
              disabled={currentItemIndex === resList.itemList.length - 1}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.beforeLoading}>
          <Image
            className={styles.image}
            src="/confused.png"
            width={300}
            height={300}
          />
          <h2>Check if you're really having</h2>
          <h1>any Disease</h1>
          <p>or</p>
          <button onClick={loadList}>
            <TfiReload />
            Your Reports
          </button>
        </div>
      )}
    </div>
  );
}

export default Responses;
