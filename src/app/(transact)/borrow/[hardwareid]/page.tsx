import { borrowItem } from "@/actions";
import SubmitButton from "@/app/components/SubmitButton";
import Link from "next/link";


export default async function BorrowPage({ params }: { params: { hardwareid: string } }){
    
  const hardwareID = 's'
  const owner = 'ii'
  const status = 'ii'
  const pSpecs = 'i'
  const  type = 'ii'
  const description = 'ii'
  const lastDateModified = 'ii'
  const user = 'i'
  const inUseDuration = 'i'
  const pathname ='/'
  

  return(
      <form action={borrowItem} //borrowItem 
        className="flex justify-center items-center border-solid border-2 border-slate-200"
        >
        <input type='hidden' id="dataID" name="dataID" value={hardwareID} />
        <input type='hidden' id="hardwareID" name="hardwareID" value={hardwareID} />
        <input type='hidden' id="previousOwner" name="previousOwner" value={owner} />
        <input type='hidden' id="previousStatus" name="previousStatus" value={status} />
        <div className="bg-white m-auto p-8 min-w-[500px] min-h-[550px] flex flex-col justify-items-center ">
            <div className="flex justify-center">
                <div><h2 className="text-[40px] font-bold">Borrowing Form</h2></div>
            </div>
            
            <div className="grid grid-cols-[170px_350px] min-h-[450px]">
                <div className=' flex items-center font-bold'>Hardware ID:</div>
                <div className="flex items-center">{hardwareID}</div>
                <div className='flex items-center font-bold'>P-Specs:</div>
                <div className="flex items-center">{pSpecs}</div>
                <div className='flex items-center font-bold'>Type:</div>
                <div className="flex items-center">{type}</div>
                <div className='flex items-center font-bold items-center'>Description:</div>
                <div className="flex text-xs text-wrap items-center">{description}...</div>
                <div className='flex items-center font-bold'>Status:</div>
                <div className="flex items-center"><s>{status}</s> ➠<span className="font-bold text-red-700"> IN USE</span></div>
                <div className='flex items-center font-bold'>Comments on loc/act:</div> 
                <input type='text' id="comments" name="comments" placeholder="ex. AD1234 YA at 80MFLEX" className="border-solid border-2 border-gray-300 p-1" maxLength={60} required />
                {/* <div>{comments}</div> */}
                <div className='flex items-center font-bold'>Last Date Modified:</div>
                <div className="flex items-center">{lastDateModified}</div>
                <div className='flex items-center font-bold'>Owner:</div>
                <div className="flex items-center justify-items-stretch">
                    <div><span><s>{owner}</s> ➠   </span></div>
                    <div><input type='text' name="owner" id="owner" value={user} readOnly
                    className="border-solid border-2 border-gray-300 p-2 ml-2"/></div>
                    
                </div>
                <div className='flex items-center font-bold'>In Use Duration(days):</div>
                <div className="flex items-center">{inUseDuration}</div>
            </div>
            
            <div className="flex flex-row justify-items-stretch ">
                  <SubmitButton buttonText="Borrow"/> 
                <Link href={pathname}>
                    <button type="button" className="bg-red-500 text-white p-2 ml-[100px] rounded">Cancel</button>
                </Link>
                
            </div>
        </div>
    </form>
  );
}