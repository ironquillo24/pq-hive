'use client'
import { useFormStatus } from "react-dom"

const ChangePasswordButton = () => {

  const {pending} = useFormStatus()
  
  const buttonText = pending? 'changing' : 'change'

  return <button type='submit' disabled={pending} className=" items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">{buttonText}</button>
}

export default ChangePasswordButton;
