"use client"
import { useRouter } from "next/navigation"
import Data from "@/dbSchema"

interface BorrowButtonComponents{
  data: Data
  user: string
}


export default function ReturnButton({data,user}:BorrowButtonComponents){


  const router = useRouter();
  const handleClick = () => {
    const path1 = `?returnItem=true&dataID=${data.id}&hardwareID=${data.hardwareid}&pSpecs=${data.pspec}&type=${data.type}&`
    const path2 = `description=${data.description}&status=${data.status}&comments=${data.comments}&user=${user}&`
    const path3 = `lastDateModified=${data.dateModified}&owner=${data.owner}&inUseDuration=${data.inUseDuration}`
    const path = path1+path2+path3
    router.push(path)
  }


  return (<>
     <button className="flex items-center justify-center bg-orange-500 text-white h-[40px] w-16 hover:bg-orange-700 text-white font-medium py-[4px] px-[4px] rounded text-xs" onClick={handleClick}>Return</button>
  </>)
}