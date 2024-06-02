'use client'
import { Data } from "@/dbSchema"

interface ReturnAllButtonProps{
  data: Data[]
}
const ReturnAllButton = ({data}: ReturnAllButtonProps) => {


  return <button type="button" className="flex items-center justify-center bg-slate-200 text-black hover:bg-yellow-700 font-medium px-4 py-2 rounded text-sm border-solid border-2 border-slate-400">
            Return all
         </button>
      }

export default ReturnAllButton;