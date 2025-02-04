"use client"
import { useRouter } from "next/navigation"
import { Data } from "@/dbSchema"

interface BorrowButtonProps{
  data: Data
}

export default function BorrowButton({data}: BorrowButtonProps){

  const router = useRouter();
  const handleClick = () => {
    const path = `?borrowItem=true&hardwareID=${data.hardwareid}`

    router.push(path, { scroll: false })
  }

  return (<>
    <button type="button"
      className="flex items-center justify-center bg-green-500 text-white h-[35px] w-16 hover:bg-green-700 text-white font-medium py-2 px-4 rounded" onClick={handleClick}
    >Borrow</button>
  </>
)}