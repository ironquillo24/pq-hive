import { getData, getMaintenanceData } from '@/mysqlutils'
import DbMaintenance from "../components/DbMaintenance"
import AcknowledgeButton  from '../components/buttons/AcknowledgeButton'
import ModalAcknowledge from '../components/modals/ModalAcknowledge'
import { getSession } from '@/logActions'
import { redirect } from "next/navigation"
import { Data } from '@/dbSchema'

export default async function ReturnedHardware(){


  const session = await getSession()

   //redirect user if not loggedin
   if (!session.isLoggedIn){
    redirect('/login')
  }

  const data = await getData(true);
  
  const maintenanceData = await getMaintenanceData();


  if ('error' in data || 'error' in maintenanceData){
    return <div className="h-screen w-screen grid place-items-center"><h2>Error retrieving data. Please try again later.</h2></div>
  }
  // check if ongoing maintenance and if user is superAdmin
  const showMaintenance = (maintenanceData[0].flag&&!session.isSuperAdmin)



  if(showMaintenance){
    return (
      <>
        <DbMaintenance/>
      </>
    )
  }
  const user = session.fullName!

  const filteredData = filterData(data,'RETURNED')

  
  
  let isDataAvail = true
  if (filteredData.length === 0){
    isDataAvail = false
  }

  return (<div className='flex justify-center inline-block resize pl-2 border border border-gray-200 rounded-lg'>

    

    {isDataAvail?

        <div className='pt-4 min-w-auto'>
        <div className={`grid grid-cols-[130px_100px_150px_100px_250px_170px_150px_200px] border-2 border-gray-200 max-w-[1500px] min-w-[1250px]`}>
          <div className='flex justify-center items-center font-bold min-h-[35px]'>Action</div>
          <div className='flex justify-center items-center font-bold min-h-[35px]'>Status</div>
          <div className='flex justify-center items-center font-bold min-h-[35px]'>HardwareID</div>
          <div className='flex justify-center items-center font-bold min-h-[35px]'>Pspecs</div>
          <div className='flex justify-center items-center font-bold min-h-[35px]'>Description</div>
          <div className='flex justify-center items-center font-bold min-h-[35px]'>Owner</div>
          <div className='flex justify-center items-center font-bold min-h-[35px]'>Comments</div>
          <div className='flex justify-center items-center font-bold min-h-[35px]'>Date Returned</div>
        </div>
        <ul>
              {
                filteredData.map((hardware)=>{

                  return(
                    <li key={hardware.id}>
                      <div className={`grid grid-cols-[130px_100px_150px_100px_250px_170px_150px_200px] border-2 border-gray-200 max-w-[1500px] hover:bg-slate-200`}>
                        <div className='flex justify-center items-center min-h-[35px]'><AcknowledgeButton data={hardware}/></div>
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
        <p>There&apos;s no returned hardware at the moment...</p>
    }
    
    <ModalAcknowledge/>

  </div>)
}

const filterData = (data: Data[], searchWord: string) => {

  let searchedData = [];

  searchWord = searchWord.toLowerCase();

  let index = 0;
  for (const hardware of data){
    
    const status = hardware.status.toLowerCase();

    if (status.includes(searchWord)){
      
      searchedData.push(data[index])
    }
    index++;
  }
  return searchedData;
}