'use client'
import CardWithImage from "../components/CardWithImage"
import Image from "next/image"
import CardNoImage from "../components/CardNoImage"
import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { changePassword } from "@/logActions"
import ChangePasswordButton from "../components/buttons/ChangePasswordButton"

export default function ProfilePage(){

  const [resetClicked, setResetClicked] = useState(false)

  const [state,formAction] = useFormState<any,FormData>(changePassword,undefined)

  const { pending } = useFormStatus()

  const onReset = () => {
   
      setResetClicked(!resetClicked)
    
  }
  

  return (<>
  
    <div  className="grid grid-cols-[40%_60%] min-h-[700px]">
      <div className="flex min-w-[600px] justify-center">
        <div className="mt-[100px] min-w-[600px] max-w-[610px] max-h-[500px] p-0">
          <CardWithImage>
            <div className="relative min-w-[300px] min-h-[300px]">
            <Image
              src='/assets/default-profile-pic.jpg'
              fill={true}
              alt='profile-pic'
              className="rounded-t-lg "
            />
          </div>
          </CardWithImage>
        </div>
      </div>
      
      <div className="min-w-[800px]">
        <div className="w-[500px] justify-self-center mt-[200px] ">
          <CardNoImage>
            <div className="grid grid-cols-[30%_70%] py-[50px] text-lg text-white text-center pl-[20px]">
              <div>Nickname:</div><div>Ian</div>
              <div>Type:</div><div>User</div>
              <div>Username:</div><div>cronqui</div>
              {!resetClicked &&
                <button type='button' className=" items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4" onClick={onReset}>reset password</button>
              }
            </div>
            
            {resetClicked ?
              <form action={formAction} >
                <div className="grid grid-cols-[30%_70%] text-white text-left">
                  <div>new password:</div>
                  <input type="password" name="newPassword" required className="text-black mt-2"></input>
                  <div>repeat password:</div>
                  <input type="password" name="repeatPassword" required className="text-black mt-2"></input>
                </div>
                
                {state?.success ? <p className="py-2 text-green-500">{state.success}</p> : null} <div></div>
                {state?.error ? <p className="py-2 text-red-500">{state.error}</p> : null} <div></div>
                 <ChangePasswordButton />
              </form>
              : null
            }
          </CardNoImage>
        </div>
      </div>
      

    </div>    
  </>)
}