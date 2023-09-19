"use client"

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import {TfiReload} from "react-icons/tfi"
import { FaTrashAlt } from "react-icons/fa";
import styles from "@/styles/responseCard.module.css";
import Image from "next/image";

function Responses() {
  const { status, data: session } = useSession();
  const requestData = session?.user?.email;
  const [resList, setResList] = useState({ itemList: [] });
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [delSure, setDelsure] = useState(false)

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



 const handleDelete = async () => {
   try {
     const response = await fetch(
       "https://charakaserver.onrender.com/delete_item",
       {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ email: requestData, index: currentItemIndex }),
       }
     );

     if (response.ok) {
       console.log("Item deleted successfully!");
       // Update the UI or perform any other actions you need
       setToggle(false)

     } else {
       console.log("ERROR!");
     }
   } catch (error) {
     console.log("Item not deleted successfully!");
     return;
   }
 };





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
          <div className={styles.cardHolder}>
            <button
              onClick={navigatePrevious}
              disabled={currentItemIndex === 0}
            >
              <FaAngleLeft />
            </button>

            <div>
              {delSure ? (
                <div className={styles.sure}>
                  <h3>
                    Do you want to delete this Report?
                  </h3>
                  <div className={styles.sureButton}>
                    <button className={styles.choose} onClick={handleDelete}>
                      Yes
                    </button>
                    <button className={styles.choose} onClick={()=>setDelsure(false)}>
                      No
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.repHeading}>
                  <h3>Report #{currentItemIndex + 1}</h3>
                  <div>
                    <button onClick={() => setDelsure(true)}>
                      <FaTrashAlt />
                    </button>
                    <button onClick={() => setToggle(false)}>
                      <RxCross2 />
                    </button>
                  </div>
                </div>
              )}

              <div className={styles.container}>
                <div className={styles.cleft}>
                  <div>
                    <div>Fever:</div>
                    <h3>{resList.itemList[currentItemIndex]?.Fever}</h3>
                  </div>
                  <div>
                    <div>Cough:</div>
                    <h3>{resList.itemList[currentItemIndex]?.Cough}</h3>
                  </div>
                  <div>
                    <div>Fatigue: </div>
                    <h3>{resList.itemList[currentItemIndex]?.Fatigue}</h3>
                  </div>
                  <div>
                    <div>Breathing Difficulty: </div>
                    <h3>
                      {resList.itemList[currentItemIndex]?.Difficulty_Breathing}
                    </h3>
                  </div>
                  <div>
                    <div>Age:</div>
                    <h3>{resList.itemList[currentItemIndex]?.Age}</h3>
                  </div>
                </div>
                <div className={styles.cright}>
                  <div>
                    <div>Gender: </div>
                    <h3> {resList.itemList[currentItemIndex]?.Gender}</h3>
                  </div>
                  <div>
                    <div>Blood Pressure: </div>
                    <h3>
                      {resList.itemList[currentItemIndex]?.Blood_Pressure}
                    </h3>
                  </div>
                  <div>
                    <div>Cholesterol Level: </div>
                    <h3>
                      {resList.itemList[currentItemIndex]?.Cholesterol_Level}
                    </h3>
                  </div>
                  <div>
                    <div>Disease: </div>
                    <h3>{resList.itemList[currentItemIndex]?.Disease_freq}</h3>
                  </div>
                  <div>
                    <div>Report: </div>
                    <h3>{resList.itemList[currentItemIndex]?.outcome}</h3>
                  </div>
                </div>
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
          <div>or</div>
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
