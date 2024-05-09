import Hardware from "./components/Hardware"
import { getData, getMaintenanceData } from '@/mysqlutils'
import ModalEditHardware from "./components/ModalEditHardware"
import ModalAddHardware from "./components/ModalAddHardware"
import {getSession} from '@/logActions'
import DbMaintenance from "./components/DbMaintenance"
import { redirect } from "next/navigation"
import ModalChangeOwner from "./components/ModalChangeOwner"
import Cart from "./components/Cart"

export const dynamic = 'force-dynamic'

export default async function Home()
 {
  
  //get session details
  const session = await getSession()
 

  //redirect user if not loggedin
  if (!session.isLoggedIn){
    redirect('/login')
  }
  
  //get all user list
  const fullNameArr = session.fullnameArr!.filter((fullname) => fullname !== session.fullName)
  
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
  
  //get user and admin info from session
  const user: string = session.fullName!
  const isAdmin: boolean = session.isAdmin!

  return (
    <>
      <div className="flex relative">
        { data? <Hardware hardwareData={data} user={user} isAdmin={isAdmin} /> : <p>no data</p> }
        <div  className="fixed right-4 bottom-4 border-solid border-2 p-4 bg-white rounded-full
          hover:bg-slate-100 hover:shadow-md hover:cursor-pointer" >
          <Cart cartItemCount="4"/>
        </div>
        
        <ModalEditHardware data={data} user={user}/>
        <ModalAddHardware user={user}/>
        <ModalChangeOwner fullNameArr={fullNameArr} />
        
      </div>
       
    </>
     
  );
}
