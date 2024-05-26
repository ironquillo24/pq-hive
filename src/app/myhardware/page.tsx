'use server'
import { getSession } from "@/logActions"
import { getData, getMaintenanceData } from '@/mysqlutils'
import DbMaintenance from "../components/DbMaintenance"
import ButtonSelector from "../components/ButtonSelector"
import { redirect } from 'next/navigation'
import { Data } from "@/dbSchema"

export default async function MyHardware(){

  const session = await getSession()

  //redirect user if not loggedin
  if (!session.isLoggedIn){
  redirect('/login')
  }

  const data = await getData(true);
  const maintenanceData = await getMaintenanceData();

  // check if ongoing maintenance and if user is superAdmin
  const showMaintenance = (maintenanceData[0].flag&&!session.isSuperAdmin)

  if(showMaintenance){
    return (
      <>
        <DbMaintenance/>
      </>
    )
  }

  const myData= filterData(data, session.fullName! )

  let isDataAvail = true
  if (myData.length === 0){
    isDataAvail = false
  }
  
  return (<div className='flex justify-center inline-block resize pl-2  border border border-gray-200 rounded-lg'>
    { isDataAvail? 
      <div className='pt-4 min-w-auto'>
      <div className={`grid grid-cols-[130px_100px_150px_100px_250px_170px_150px_200px] border-2 border-gray-200 max-w-[1500px] min-w-[1250px]`}>
        <div className='flex justify-center items-center font-bold min-h-[35px]'>Action</div>
        <div className='flex justify-center items-center font-bold min-h-[35px]'>Status</div>
        <div className='flex justify-center items-center font-bold min-h-[35px]'>HardwareID</div>
        <div className='flex justify-center items-center font-bold min-h-[35px]'>Pspecs</div>
        <div className='flex justify-center items-center font-bold min-h-[35px]'>Description</div>
        <div className='flex justify-center items-center font-bold min-h-[35px]'>Owner</div>
        <div className='flex justify-center items-center font-bold min-h-[35px]'>Comments</div>
        <div className='flex justify-center items-center font-bold min-h-[35px]'>Date Borrowed</div>
      </div>
      <ul>
            {
              myData.map((hardware)=>{

                return(
                  <li key={hardware.id}>
                    <div className={`grid grid-cols-[130px_100px_150px_100px_250px_170px_150px_200px] border-2 border-gray-200 max-w-[1500px] py-[5px] hover:bg-slate-200`}>
                      <div className='flex justify-center items-center min-h-[35px]'><ButtonSelector data={hardware} user={session.fullName!} isAdminActivated={false}/></div>
                      <div className='flex justify-center items-center min-h-[35px] text-xs text-center'>{hardware.status}</div>
                      <div className='flex justify-center items-center min-h-[35px] text-xs text-center'>{hardware.hardwareid}</div>
                      <div className='flex justify-center items-center min-h-[35px] text-xs text-center'>{hardware.pspec}</div>
                      <div className='flex justify-center items-center min-h-[35px] text-xs text-center'>{hardware.description.slice(0,50)}</div>
                      <div className='flex justify-center items-center min-h-[35px] text-xs text-center'>{hardware.owner}</div>
                      <div className='flex justify-center items-center min-h-[35px] text-xs text-center'>{hardware.comments.slice(0,50)}</div>
                      <div className='flex justify-center items-center min-h-[35px] text-xs text-center'>{String(hardware.dateModified)}</div>
                    </div>
                  </li>
                )
              })
            }
      </ul>

    </div>
    
      :
          <p>you have no borrowed hardware...</p>

    }
    
</div>)
}

const filterData = (data: Data[], user: string) => {

  let filteredData = [];

  let index = 0;
  for (const hardware of data){

    const isMyItem = ((hardware.owner === user) && ((hardware.status === 'IN USE')||(hardware.status === 'RETURNED')))
      
      if(isMyItem){
        filteredData.push(data[index])
    }
    index++;
  }
  return filteredData;
}
