import './components.css'
import ButtonSelector from './ButtonSelector'

interface DataComponents{
  data: string[],
  isButton: boolean,
  user: string,
  isAdminActivated: boolean
}

export default function HardwareList({ data, isButton, user, isAdminActivated }: DataComponents){
  
  const dataID: string = data[0]
  const hardwareID: string = data[1]
  const pSpecs: string = data[2]
  const type: string = data[3]
  const description: string = data[7].slice(0,60)
  const status: string = data[8]
  const comments: string = data[9].slice(0,60)
  const lastDateModified: string = data[11]
  const owner: string = data[10]
  const inUseDuration: string = data[12]
   
  const bgColor = isButton? "bg-slate-200 h-14 hover:bg-slate-200" : "bg-slate-800 text-white h-10"
  const statusColorCondition = (status.includes("IN STORAGE"))? "bg-green-300" : "bg-purple-300 text-red-700"
  const statusColor = isButton? statusColorCondition: "bg-slate-800 text-white"
  const textSizeDesc = (description.includes("Description"))? "" : "text-xs"

  return(
    <>
      {
        isButton? (
          <div className={`grid-cell ${bgColor} ml-4 gap-px`}>
            <ButtonSelector data={data} user={user} isAdminActivated={isAdminActivated}/>
          </div>
        ):
        <div className={`grid-cell ml-4 ${bgColor}`}>Action</div>
      }
      <div className={`grid-cell ${statusColor}`}>{status}</div>
      <div className={`grid-cell ${bgColor}`} >{hardwareID}</div>
      <div className={`grid-cell ${bgColor}`}>{pSpecs}</div>
      <div className={`grid-cell ${bgColor}`}>{type}</div>
      <div className={`grid-cell ${bgColor} ${textSizeDesc}`}>{description}</div>
      <div className={`grid-cell ${bgColor}  ${textSizeDesc}`}>{comments}</div>
      <div className={`grid-cell ${bgColor}`}>{owner}</div>
      <div className={`grid-cell ${bgColor}`}>{lastDateModified}</div>
      <div className={`grid-cell ${bgColor} mr-4`}>{inUseDuration}</div>
    </>
  )

}

