"use client"
import React from 'react'
function AltHero({notShowAltHero}) {

  
  return (
    <div>
      <button onClick={notShowAltHero}>Logout</button>
    </div>
  );
  
}

export default AltHero