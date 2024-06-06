'use client'
import { useFormStatus } from "react-dom"

interface DbMaintenanceProps{
  isMaintaining: boolean
}
export default function DbMaintenanceButton({isMaintaining}:DbMaintenanceProps){

  const { pending } = useFormStatus();


  const buttonStyle = isMaintaining? 'bg-slate-500 hover:bg-slate-700' : 'bg-red-500 hover:bg-red-700'

  return(<>
    { pending? <div className="bg-gray-700 text-white p-2 rounded select-none">
      Configuring...</div> :
      <button type="submit" className={`${buttonStyle} text-white font-medium p-2 rounded text-xs`} >{isMaintaining? "End DB Maintenance" : "Start DB Maintenance" }</button>
    }
    
  </>
  )

}