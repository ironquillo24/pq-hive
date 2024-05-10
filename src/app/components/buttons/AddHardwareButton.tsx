"use client"
import { useRouter } from "next/navigation"

export default function AddHardwareButton(){

  const router = useRouter();

  const handleClick = () => {
    const path = `?addHardware=true`
    router.push(path)
  }


  return ( <div>
    <button className="flex items-center justify-center bg-green-500 text-white h-[40px] w-[90px] hover:bg-green-700 text-white font-medium py-[4px] px-[4px] rounded text-xs" onClick={handleClick}>Add Hardware</button>
   </div>)
}

