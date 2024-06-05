"use client"
import {useSearchParams, usePathname, redirect} from "next/navigation";
import Link from "next/link";
import {borrowItem} from '../../../actions'
import SubmitButton from "../buttons/SubmitButton";
import { useGetHardwareAndUser } from "@/get-client-data";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useFormState } from "react-dom";

interface ModalBorrowProps{
    isAdmin: boolean
    employeeid: string
}

export default function ModalBorrow({isAdmin,employeeid}: ModalBorrowProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const inputIdRef = useRef<HTMLInputElement | null>(null);
    const [state,formAction] = useFormState<any,FormData>(borrowItem,undefined)

    const modalBorrow = searchParams.get("borrowItem")
    const hardwareID = searchParams.get('hardwareID') || '' as string
    
   /*  const {data: hardware , isLoading, isError } = useGetDataById(hardwareID,'borrow'); */

   const getData = modalBorrow === 'true'

    const data = useGetHardwareAndUser(hardwareID,'borrow', getData, false)
    const hardware = data[0].data
    const userFullname = data[1].data

    const onMyself = () => {

        inputIdRef.current!.value = employeeid
    
    }

    //no queries yet
    if (hardware === undefined){
        return null
    }
    //redirect if harware is not existing or not in storage when modalBorrow is being pulled
if ((modalBorrow==='true')&&((hardware.hardwareid === '')||(hardware.status!=='IN STORAGE'))){
        router.replace(`${pathname}?notAvailable=true`)
    }

    return (
        <>
            {modalBorrow &&
                (
                
                <form action={formAction} //borrowItem 
                    className="fixed rounded border-solid left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center drop-shadow-md"
                    >
                    <input type='hidden' id="dataID" name="dataID" value={hardware.hardwareid} />
                    <input type='hidden' id="previousOwner" name="previousOwner" value={hardware?.owner} />
                    <input type='hidden' id="previousStatus" name="previousStatus" value={hardware?.status} />
                    <input type="hidden" name='user' value={userFullname} readOnly/>
                    <input type='hidden' name='isAdmin' value={String(isAdmin)} />
                    <div className="bg-white m-auto p-8 min-w-[500px] min-h-[550px] flex flex-col justify-items-center rounded-[20px] ">
                        <div className="flex justify-center">
                            <div><h2 className="text-[40px] font-bold">Borrowing Form</h2></div>
                        </div>
                        
                        <div className="grid grid-cols-[170px_400px] min-h-[450px]">
                            <div className=' flex items-center font-bold'>Hardware ID:</div>
                            <div className="flex items-center">{hardware?.hardwareid}</div>
                            <div className='flex items-center font-bold'>P-Specs:</div>
                            <div className="flex items-center">{hardware?.pspec}</div>
                            <div className='flex items-center font-bold'>Type:</div>
                            <div className="flex items-center">{hardware?.type}</div>
                            <div className='flex items-center font-bold items-center'>Description:</div>
                            <div className="flex text-xs text-wrap items-center">{hardware?.description}...</div>
                            <div className='flex items-center font-bold'>Status:</div>
                            <div className="flex items-center"><s>{hardware?.status}</s> ➠<span className="font-bold text-red-700"> IN USE</span></div>
                            <div className='flex items-center font-bold'>Comments on loc/act:</div> 
                            <input type='text' id="comments" name="comments" placeholder="ex. AD1234 YA at 80MFLEX" className="border-solid border-2 border-gray-300 p-1" maxLength={60} required />
                            {/* <div>{comments}</div> */}
                            <div className='flex items-center font-bold'>Last Date Modified:</div>
                            <div className="flex items-center">{String(hardware?.dateModified)}</div>
                            <div className='flex items-center font-bold'>Owner:</div>
                            <div className="flex items-center justify-items-stretch">
                                <div><span><s>{hardware?.owner}</s> ➠   </span></div>
                                <div>
                                    { isAdmin ? 
                                        <div className="relative">
                                            <div className="flex">
                                            <input type='password' name="id" placeholder="employee id" required
                                                className="border-solid border-2 border-gray-300 p-2 ml-2 w-[120px] mr-2" ref={inputIdRef}/> 
                                            <button type="button" onClick={onMyself} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700">myself</button>
                                        </div>
                                        
                                            {state?.error && <div className="absolute flex items-center justify-center text-red-500">{state.error}</div>}

                                        </div>
                                        
                                 
                                            :

                                        <input type='text' name="owner" id="newOwner" value={userFullname} readOnly
                                            className="border-solid border-2 border-gray-300 p-2 ml-2"/>
                                    }
                                           
                                </div>
                                
                            </div>
                            <div className='flex items-center font-bold'>In Use Duration:</div>
                            <div className="flex items-center justify-center">{hardware?.inUseDuration} days</div>
                        </div>
                        
                        
                        <div className="min-w-[520px] flex justify-center">
                             <SubmitButton buttonText="Borrow"/> 
                            <Link href={pathname} className="bg-red-500 text-white p-2 rounded ml-[200px]" scroll={false}>
                               cancel
                            </Link>
                            
                        </div>
                    </div>
                </form>
                )
               
            }
        </>
    );
}