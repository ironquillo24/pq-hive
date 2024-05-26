import './components.css'
import ButtonSelector from './ButtonSelector'
import {Data} from '@/dbSchema'

interface HardwareListProps{
  data: Data,
  isButton: boolean,
  user: string,
  isAdminActivated: boolean
}

export default function HardwareList({ data, isButton, user, isAdminActivated }: HardwareListProps){
     
  const bgColor = isButton? "h-14" : "bg-slate-800 text-white h-10"
  const statusColorCondition = (data.status.includes("IN STORAGE"))? "bg-green-300" : "bg-purple-300 text-red-700"
  const statusColor = isButton? statusColorCondition : "bg-slate-800 text-white"
  const textSizeDesc = (data.description.includes("Description"))? "" : "text-xs"

  const dateModified = String(data.dateModified)

  return(
    <>
      {
        isButton? (
          <div className={`grid-cell ${bgColor} ml-4 gap-px`}>
            <ButtonSelector data={data} user={user} isAdminActivated={isAdminActivated}/>
          </div>
        ):
        <div className={`grid-cell ${bgColor}`}>Action</div>
      }
      <div className={`grid-cell ${statusColor}`}>{data.status}</div>
      <div className={`grid-cell ${bgColor}`} >{data.hardwareid}</div>
      <div className={`grid-cell ${bgColor}`}>{data.pspec}</div>
      <div className={`grid-cell ${bgColor}`}>{data.type}</div>
      <div className={`grid-cell ${bgColor} ${textSizeDesc}`}>{data.description}</div>
      <div className={`grid-cell ${bgColor}  ${textSizeDesc}`}>{data.comments}</div>
      <div className={`grid-cell ${bgColor}`}>{data.owner}</div>
      <div className={`grid-cell ${bgColor}`}>{dateModified}</div>
      <div className={`grid-cell ${bgColor}`}>{data.inUseDuration}</div>
    </>
  )

}

