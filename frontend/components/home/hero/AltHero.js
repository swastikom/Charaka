"use client"
import React from 'react'
import Menu from '@/components/dashboard/Menu';

function AltHero({notShowAltHero}) {

  
  return (
    <div>
      <Menu/>
      <button onClick={notShowAltHero}>Logout</button>
    </div>
  );
  
}

export default AltHero