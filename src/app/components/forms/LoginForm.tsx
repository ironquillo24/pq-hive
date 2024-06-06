'use client'
import { login } from "@/logActions"
import { useFormState } from "react-dom"
import LoginButton from "../buttons/LoginButton"

export default function LoginForm(){

  const [state,formAction] = useFormState<any,FormData>(login,undefined)
  
  const isDark = false
  const bgColorForm =  isDark? 'bg-slate-800 text-white' : 'bg-white'
  const bgColorInput = isDark? 'bg-slate-700 text-white' : ''

  return(
    <form action={formAction}
      className={`font-sans border-2 border-solid border-black ${bgColorForm} min-w-[300px] border-slate-50 rounded drop-shadow-xl`}
    >
      <h2 className="flex justify-center p-10 font-bold text-4xl">
        Login
      </h2>
      <p className="p-3 pl-6 text-sm">Username</p>

      <input className={`${bgColorInput} p-1 ml-6 w-[230px] border-0 border-b-2`} type='text' name='username' required />

      <p className="p-3 pl-6 text-sm">Password</p>
      <input className={`${bgColorInput} border-0 border-b-2 p-1 ml-6 w-[230px]`} type='password' name="password" required/>

      <br/>
      {state?.error ?
        <p className="text-center h-[5px] text-sm ">
          {state.error}
        </p>
        : <div className="h-[5px]"></div>
      }

      <div className="text-center pb-10 pt-6">
       <LoginButton />
      </div>
    
      
    </form>
  )
}