"use client"
import { useRouter } from "next/navigation"
import { Data } from "@/dbSchema"

interface TransferButtonProps{
  data: Data
}


export default function TransferButton({data}:TransferButtonProps){


  const router = useRouter();
  const handleClick = () => {
    const path = `?transferItem=true&hardwareID=${data.hardwareid}`
    router.push(path, {scroll: false})
  }


  return (<>
     <button className="flex items-center justify-center bg-slate-500 text-white h-[40px] w-16 hover:bg-slate-700 text-white font-medium py-[4px] px-[4px] rounded text-xs" onClick={handleClick}>Change Owner</button>
  </>)
}