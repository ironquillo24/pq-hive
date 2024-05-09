'use server'
import ModalTransact from "../modal"
import { borrowItem } from "@/actions"
import SubmitButton from "@/app/components/SubmitButton"
import { getByHardwareid } from "@/mysqlutils"
import BackButton from "@/app/components/BackButton"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import NotAvailable from "@/app/components/NotAvailable"

export default async function BorrowModal({ params }: { params: { hardwareid: string } }){


  const hardware = await getByHardwareid(params.hardwareid)

  const user = 'Christian Oliver Ronquillo'

  if (!hardware.status.toLowerCase().includes('storage'))
    {
      revalidatePath('/')
      return <ModalTransact>
                <NotAvailable />
             </ModalTransact>
    }

  console.log('borrowmodal on')

  return (
    <ModalTransact>
      <form action={borrowItem} >
        <input type='hidden' id="hardwareID" name="hardwareID" value={hardware.hardwareid} />
        <input type='hidden' id="previousOwner" name="previousOwner" value={hardware.owner} />
        <input type='hidden' id="previousStatus" name="previousStatus" value={hardware.status} />
        <div className="bg-white m-auto p-8 min-w-[500px] min-h-[550px] flex flex-col justify-items-center rounded">
            <div className="flex justify-center">
                <div><h2 className="text-[40px] font-bold">Borrowing Form</h2></div>
            </div>
            
            <div className="grid grid-cols-[170px_350px] min-h-[450px]">
                <div className=' flex items-center font-bold'>Hardware ID:</div>
                <div className="flex items-center">{hardware.hardwareid}</div>
                <div className='flex items-center font-bold'>P-Specs:</div>
                <div className="flex items-center">{hardware.pspec}</div>
                <div className='flex items-center font-bold'>Type:</div>
                <div className="flex items-center">{hardware.type}</div>
                <div className='flex items-center font-bold items-center'>Description:</div>
                <div className="flex text-xs text-wrap items-center">{hardware.description}...</div>
                <div className='flex items-center font-bold'>Status:</div>
                <div className="flex items-center"><s>{hardware.status}</s> ➠<span className="font-bold text-red-700"> IN USE</span></div>
                <div className='flex items-center font-bold'>Comments on loc/act:</div> 
                <input type='text' id="comments" name="comments" placeholder="ex. AD1234 YA at 80MFLEX" className="border-solid border-2 border-gray-300 p-1" maxLength={60} required />
                {/* <div>{comments}</div> */}
                <div className='flex items-center font-bold'>Last Date Modified:</div>
                <div className="flex items-center">{String(hardware.dateModified)}</div>
                <div className='flex items-center font-bold'>Owner:</div>
                <div className="flex items-center justify-items-stretch">
                    <div><span><s>{hardware.owner}</s> ➠   </span></div>
                    <div><input type='text' name="owner" id="owner" value={user} readOnly
                    className="border-solid border-2 border-gray-300 p-2 ml-2"/></div>
                    
                </div>
                <div className='flex items-center font-bold'>In Use Duration(days):</div>
                <div className="flex items-center">{hardware.inUseDuration}</div>
            </div>
            
            <div className="flex flex-row justify-items-stretch">
                  <SubmitButton buttonText="Borrow"/> 
                  <BackButton />
                
            </div>
        </div>
      </form>
   </ModalTransact>
  )
}