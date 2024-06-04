'use client'
import { returnAllItems } from "@/actions"

interface ReturnAllFormProps {
  user: string
}
const ReturnAllForm = ({user}: ReturnAllFormProps) => {

  return(
    <form action={returnAllItems} className=" border-solid border-[1px] border-slate-200 p-2 h-[200px] mt-4">

      <input type="hidden" name="user" value={user} readOnly/>
      
      <div className="max-w-[100px] text-xs mb-2 font-medium">Comment on location for returning all items at once:</div>
      <textarea name='comments' maxLength={60} className="w-[100px] mb-2 border-2 border-solid border-slate-300 text-sm resize-none" required/>
      <button type="submit" className="flex items-center justify-center bg-slate-200 text-black hover:bg-slate-700 hover:text-white font-medium px-4 py-2 rounded text-sm border-solid border-2 border-slate-400">
          Return all
      </button>

    </form> 
  )
}

export default ReturnAllForm;