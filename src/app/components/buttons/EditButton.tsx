"use client"
import { useRouter } from "next/navigation"
import { Data } from "@/dbSchema"

interface EditButtonComponents{
  data: Data
}


export default function EditButton({data}: EditButtonComponents){


  const router = useRouter();
  const handleClick = () => {
    const path = `?editHardware=true&hardwareid=${data.hardwareid}`
    router.push(path)
  }

  return (<>
     <button className="flex items-center justify-center bg-green-500 text-white h-6 w-16 hover:bg-green-700 text-white font-medium py-2 px-4 rounded" onClick={handleClick}>Edit</button>
  </>)
}