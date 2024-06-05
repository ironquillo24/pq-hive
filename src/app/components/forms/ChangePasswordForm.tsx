"use client"
import ChangePasswordButton from "../buttons/ChangePasswordButton";
import { useFormState } from "react-dom";
import { changePassword } from "@/logActions";
import { useState } from "react";

const ChangePasswordForm = () => {

  const [state,formAction] = useFormState<any,FormData>(changePassword,undefined)

  const [resetClicked, setResetClicked] = useState(false)
  
  const onReset = () => {
   
    setResetClicked(!resetClicked)
  
  }

  return ( <>
            {!resetClicked &&
              <button type='button' className=" items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4" onClick={onReset}>reset password</button>
            }
            {resetClicked &&

              <form action={formAction} >
                <div className="grid grid-cols-[30%_70%] text-white text-left">
                  <div className="flex items-center">new password:</div>
                  <input type="password" name="newPassword" required className="text-black mt-2"></input>
                  <div className="flex items-center">repeat password:</div>
                  <input type="password" name="repeatPassword" required className="text-black mt-2"></input>
                </div>
                
                {state?.success ? <p className="py-2 text-green-500">{state.success}</p> : null} <div></div>
                {state?.error ? <p className="py-2 text-red-500">{state.error}</p> : null} <div></div>
                <ChangePasswordButton />

              </form>
            }
          </>)
}

export default ChangePasswordForm;