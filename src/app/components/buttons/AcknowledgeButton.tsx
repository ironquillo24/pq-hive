"use client"
import { useRouter } from "next/navigation"
import {Data} from "@/dbSchema"

interface AcknowledgeButtonProps{
  data: Data
}

export default function AcknowledgeButton({data}: AcknowledgeButtonProps){

  const hardwareID = data.hardwareid

  const router = useRouter();
  const handleClick = () => {
    const path = `?acknowledge=true&hardwareID=${hardwareID}`
    router.push(path)
  }

  return (<>
    <button type="button"
      className="flex items-center justify-center bg-yellow-500 text-white hover:bg-yellow-700 text-white font-medium px-[3px] py-[6px] rounded text-xs" onClick={handleClick}
    >Acknowledge</button>
  </>
)}