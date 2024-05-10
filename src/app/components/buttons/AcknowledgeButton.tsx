"use client"
import { useRouter } from "next/navigation"

interface AcknowledgeButtonComponents{
  data: string[]
  user: string
}

export default function AcknowledgeButton({data,user}: AcknowledgeButtonComponents){

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

  const router = useRouter();
  const handleClick = () => {
    const path1 = `?acknowledge=true&dataID=${dataID}&hardwareID=${hardwareID}&pSpecs=${pSpecs}&type=${type}&`
    const path2 = `description=${description}&status=${status}&comments=${comments}&user=${user}&`
    const path3 = `lastDateModified=${lastDateModified}&owner=${owner}&inUseDuration=${inUseDuration}`
    const path = path1+path2+path3
    router.push(path)
  }

  return (<>
    <button type="button"
      className="flex items-center justify-center bg-yellow-500 text-white hover:bg-yellow-700 text-white font-medium px-[3px] py-[6px] rounded text-xs" onClick={handleClick}
    >Acknowledge</button>
  </>
)}