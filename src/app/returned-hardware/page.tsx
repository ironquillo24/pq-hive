import { getSheetsData } from '../../utils'
import AcknowledgeButton  from '../components/AcknowledgeButton'
import ModalAcknowledge from '../components/ModalAcknowledge'
import { getSession } from '@/logActions'
import { redirect } from "next/navigation"

export default async function ReturnedHardware(){


  const session = await getSession()

   //redirect user if not loggedin
   if (!session.isLoggedIn){
    redirect('/login')
  }

  const data:any = await getSheetsData("MasterList!A1:M", false)


   if((data[1][0][0]==='Maintenance')&&!session.isSuperAdmin){
    return (
      <>
        <div>Ongoing Maintenance</div>
      </>
    )
  }

  const user = session.fullName!

  const filteredData: string[][] = filterData(data,'RETURNED')
  
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
                filteredData.map((row)=>{

                  return(
                    <li key={row[0]}>
                      <div className={`grid grid-cols-[130px_100px_150px_100px_250px_170px_150px_200px] border-2 border-gray-200 max-w-[1500px] hover:bg-slate-200`}>
                        <div className='flex justify-center items-center min-h-[35px]'><AcknowledgeButton data={row} user={user} /></div>
                        <div className='flex justify-center items-center min-h-[35px] text-xs text-center'>{row[8]}</div>
                        <div className='flex justify-center items-center min-h-[35px] text-xs text-center'>{row[1]}</div>
                        <div className='flex justify-center items-center min-h-[35px] text-xs text-center'>{row[2]}</div>
                        <div className='flex justify-center items-center min-h-[35px] text-xs text-center'>{row[7].slice(0,50)}</div>
                        <div className='flex justify-center items-center min-h-[35px] text-xs text-center'>{row[10]}</div>
                        <div className='flex justify-center items-center min-h-[35px] text-xs text-center'>{row[9].slice(0,50)}</div>
                        <div className='flex justify-center items-center min-h-[35px] text-xs text-center'>{row[11]}</div>
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

const filterData = (data: any, searchWord: string) => {

  let searchedData = [];

  searchWord = searchWord.toLowerCase();

  for (const row of data[1]){
    
    const status = row[8].toLowerCase();

    if (status.includes(searchWord)){
      
      searchedData.push(data[1][Number(row[0])])
    }
  }
  return searchedData;
}