'use server'
import CardWithImage from "../components/CardWithImage"
import Image from "next/image"
import CardNoImage from "../components/CardNoImage"
import ChangePasswordForm from "../components/forms/ChangePasswordForm"
import { getSession } from "@/logActions"

export default async function ProfilePage(){
 
  const session = await getSession()

  let accessType  = ''

  if (session?.isSuperAdmin){
    accessType = 'Admin'
  } else {
    if (session?.isAdmin){
      accessType = 'Custodian'
    } else {
      accessType = 'User'
    }
  }

  return (<>
  
    <div  className="grid grid-cols-[50%_50%] min-h-[700px] w-full bg-slate-900">
      
      <div className="max-h-[500px] justify-self-center mt-[40px]"> 
        <CardWithImage userInfo={session}>
          <div className="relative min-w-[300px] min-h-[300px] ">
            <Image
              src='/assets/default-profile-pic.jpg' 
              fill={true}
              //style={{objectFit: "cover"}}
              alt='profile-pic'
              className="rounded-t-lg bg-cover"
            />
          </div>
        </CardWithImage>
      </div>
      
      <div className="min-w-[800px]">
        <div className="w-[500px] justify-self-center mt-[150px] ">
          <CardNoImage>
            <div className="grid grid-cols-[30%_70%] text-lg text-white pl-[20px]">
              <div className="text-right">Nickname:</div><div className="text-center">{session?.nickName}</div>
              <div className="text-right">Access:</div><div className="text-center">{accessType}</div>
              <div className="text-right">Username:</div><div className="text-center">{session?.userName}</div>
            </div>
          
          <ChangePasswordForm />
          </CardNoImage>
        </div>
      </div>
      

    </div>    
  </>)
}