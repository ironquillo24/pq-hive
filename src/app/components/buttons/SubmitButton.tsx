"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonComponents{
  buttonText: string
}
export default function SubmitButton({buttonText}:SubmitButtonComponents) {
  const { pending } = useFormStatus();

  let loadingText = ''
  switch (buttonText){
    case 'Borrow': loadingText = 'Borrowing'
      break;
    case 'Return': loadingText = 'Returning'
      break;
    case 'Acknowledge': loadingText = 'Acknowledging'
      break;
    case 'Add Item': loadingText = 'Adding Item'
      break;
    case 'Transfer': loadingText = 'Transferring'
      break;
    case 'Edit': loadingText = 'Editting'
      break;
    default: loadingText = 'loading'
      
  }

  return (<>
    
    {pending ? <div className="bg-gray-700 text-white p-2 rounded select-none ml-[100px]">
      <p>{loadingText}</p>
    </div> :
    <button type="submit" className="bg-green-500 text-white p-2 ml-[100px] rounded hover:bg-green-700"
    >{buttonText}</button> }
  </>)
    }
    
