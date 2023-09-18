import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

function Responses() {
  const { status, data: session } = useSession();
  const requestData = session?.user?.email;
  const [resList, setResList] = useState({ itemList: [] });
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

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
        } else {
          console.log("ERROR!");
        }
      }
    } catch (error) {
      console.log("Item not loaded successfully!");
      return;
    }
  };

  useEffect(() => {
    loadList();
  }, []); // Load the list when the component mounts

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
      {resList.itemList.length > 0 ? (
        <div>
          <div>
            <p>Fever: {resList.itemList[currentItemIndex].Fever}</p>
            <p>Cough: {resList.itemList[currentItemIndex].Cough}</p>
          </div>
          <div>
            <button
              onClick={navigatePrevious}
              disabled={currentItemIndex === 0}
            >
              Previous
            </button>
            <button
              onClick={navigateNext}
              disabled={currentItemIndex === resList.itemList.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <button onClick={loadList}>Load</button>
      )}
      <div>{session?.user?.email}</div>
    </div>
  );
}

export default Responses;
