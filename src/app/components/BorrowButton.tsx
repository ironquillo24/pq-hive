"use client"
import { useRouter } from "next/navigation"
import Data from "@/dbSchema"

interface BorrowButtonComponents{
  data: Data
  user: string
}

export default function BorrowButton({data,user}: BorrowButtonComponents){



  const router = useRouter();
  const handleClick = () => {
    const path1 = `?borrowItem=true&dataID=${data.id}&hardwareID=${data.hardwareid}&pSpecs=${data.pspec}&type=${data.type}&`
    const path2 = `description=${data.description}&status=${data.status}&comments=${data.comments}&user=${user}&`
    const path3 = `lastDateModified=${data.dateModified}&owner=${data.owner}&inUseDuration=${data.inUseDuration}`
    const path = path1+path2+path3
    //router.push(`?borrowItem=true&hardwareID=${data.hardwareid}`)
    router.push(`borrow/${data.hardwareid}`)
  }

  return (<>
    <button type="button"
      className="flex items-center justify-center bg-green-500 text-white h-[35px] w-16 hover:bg-green-700 text-white font-medium py-2 px-4 rounded" onClick={handleClick}
    >Borrow</button>
  </>
)}