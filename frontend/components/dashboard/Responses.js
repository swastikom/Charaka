"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
function Responses() {
  const {status, data:session} = useSession()
  
  return (
    <div>{session.user.itemList}</div>
  )
}

export default Responses