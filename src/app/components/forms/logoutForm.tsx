'use client'
import { logout } from "@/logActions"
import { useFormStatus } from "react-dom"
import { useQueryClient } from "@tanstack/react-query"

export default function LogoutForm(){
  
  const { pending } = useFormStatus()
  const queryClient = useQueryClient()

  return (
    <form action={logout} onSubmit={() => queryClient.clear()}
    className=" p-[4px] text-sm bg-slate-200 text-black hover:font-bold hover:bg-slate-500 hover:text-white text-sm border-solid border-2 border-black rounded">

      {pending?
        <div>
          logging out
        </div> 
      :
      <button type="submit" >Log Out</button>
      }
        
    </form>
  )

}