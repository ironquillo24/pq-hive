"use client"
import { useRouter } from "next/navigation"
import { Data } from "@/dbSchema"

interface EditButtonComponents{
  data: Data
}


export default function EditButton({data}: EditButtonComponents){


  const router = useRouter();
  const handleClick = () => {
    const path1 = `?editHardware=true&dataID=${data.id}`//&hardwareID=${hardwareID}&pSpecs=${pSpecs}&type=${type}&`
/*     const path2 = `description=${description}&status=${status}&comments=${comments}&user=${user}&`
    const path3 = `lastDateModified=${lastDateModified}&owner=${owner}&inUseDuration=${inUseDuration}` */
    const path = path1 //+path2+path3
    router.push(path)
  }

  return (<>
     <button className="flex items-center justify-center bg-green-500 text-white h-6 w-16 hover:bg-green-700 text-white font-medium py-2 px-4 rounded" onClick={handleClick}>Edit</button>
  </>)
}