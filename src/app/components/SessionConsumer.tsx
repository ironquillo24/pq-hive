'use client'
import SessionContext from "./SessionContext"
import { useContext } from "react"

const SessionConsumer = () =>{

  const data = useContext(SessionContext)
  
  console.log(data)

  return (
    <>
      <p>{data}</p>
    </>
  )

}

export default SessionConsumer;

