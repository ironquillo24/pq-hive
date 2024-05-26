"use client"
import { useRouter } from "next/navigation"
import { Data } from "@/dbSchema"

interface ReturnButtonProps{
  data: Data
}


export default function ReturnButton({data}:ReturnButtonProps){

  const router = useRouter();
  const handleClick = () => {
    const path = `?returnItem=true&hardwareID=${data.hardwareid}`
    router.push(path, {scroll: false})
  }


  return (<>
     <button className="flex items-center justify-center bg-orange-500 text-white h-[40px] w-16 hover:bg-orange-700 text-white font-medium py-[4px] px-[4px] rounded text-xs" onClick={handleClick}>Return</button>
  </>)
}