import Hardware from "./components/Hardware"
import { getData, getMaintenanceData } from '@/mysqlutils'
import {getSession} from '@/logActions'
import DbMaintenance from "./components/DbMaintenance"
import { redirect } from "next/navigation"
import { getCartDataByUserid } from "@/mysqlutils"

export const dynamic = 'force-dynamic'

export default async function Home()
 {
  
  //get session details
  const session = await getSession()
 

  //redirect user if not loggedin
  if (!session.isLoggedIn){
    redirect('/login')
  }
  
  
 //get data from masterlist with tags
  const data = await getData(true);
  const maintenanceData = await getMaintenanceData();
  
  // check if ongoing maintenance and if user is superAdmin
  const showMaintenance = (maintenanceData[0].flag&&!session.isSuperAdmin)

   
  //show maintenance if maintenance is ongoing and user is not super Admin
   if(showMaintenance){
    return (
      <>
        <DbMaintenance/>
      </>
    )
  }       

  //get cartData
  const cartData = await getCartDataByUserid(session.userID!)
  
  //get user and admin info from session
  const user: string = session.fullName!
  const userID = session.userID!
  const isAdmin: boolean = session.isAdmin!

  return (
    <>
      <div className="flex relative justify-center">
        { data? <Hardware hardwareData={data} user={user} userID={userID} isAdmin={isAdmin} cartData={cartData} /> : <p>no data</p> }
        
{/*         <ModalEditHardware data={data} user={user}/>
        <ModalAddHardware user={user}/> */}
        
      </div>
       
    </>
     
  );
}
