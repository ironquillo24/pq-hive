import LoginForm from "@/app/components/LoginForm"
import { getSession } from "@/logActions"
import { redirect } from "next/navigation"
import Image from "next/image"

export default async function Login(){
  const session = await getSession()

  if (session.isLoggedIn){
    redirect('/')
  }
 
  return (
    <div className=" flex min-h-[500px] w-42 items-center justify-center relative z-20">
      
        <LoginForm/>

      <div className="-rotate-90 fixed -bottom-6 right-0 select-none -z-40 opacity-35">
        <Image
            src="/assets/Circuit-PNG-Background.png"
            width={550}
            height={550}
            alt="PQ Hive"
            className="p-0"
          />
      </div>

    </div>
      
  
  )
}