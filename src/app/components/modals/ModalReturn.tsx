"use client"
import {useSearchParams, usePathname} from "next/navigation";
import Link from "next/link";
import { returnItem } from '../../../actions'
import SubmitButton from "../buttons/SubmitButton";
import { useRouter } from "next/navigation";
import { useGetHardwareAndUser } from "@/app/data/get-data";
import Data from "@/dbSchema";
import { SessionData } from "@/lib";

export default function ModalReturn() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const modalReturn= searchParams.get("returnItem");
    const hardwareID = searchParams.get('hardwareID') || '' as string

    const data = useGetHardwareAndUser(hardwareID,'borrow', false)
    const hardware = data[0].data as Data
    const user = data[1].data as SessionData
    const userFullname = user?.fullName

    //no queries yet
    if (hardware === undefined){
        return null
    }
    //redirect if harware is not existing or not in (change to not =user) when modalBorrow is being pulled
if ((modalReturn==='true')&&((hardware.hardwareid === '')||(hardware.status!=='IN USE'))){
        router.replace(`${pathname}?notAvailable=true`)
    }
        
    return (
        <>
            {modalReturn &&
                (
                
                <form action={returnItem} 
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center drop-shadow-md"
                    >
                    <input type='hidden' id="dataID" name="dataID" value={hardware.hardwareid} />
                    <input type='hidden' id="previousOwner" name="previousOwner" value={hardware.owner} />
                    <input type='hidden' id="previousStatus" name="previousStatus" value={hardware.status} />
                    <input type='hidden' name='pathname' value={pathname} />
                    <div className="bg-white m-auto p-8 min-w-[550px] min-h-[550px] flex flex-col justify-items-center ">
                        <div className="flex justify-center">
                            <div><h2 className="text-[40px] font-bold">Returning Form</h2></div>
                        </div>
                        
                        <div className="grid grid-cols-[180px_350px] min-h-[450px]">
                            <div className=' flex items-center font-bold'>Hardware ID:</div>
                            <div className="flex items-center">{hardware.hardwareid}</div>
                            <div className='flex items-center font-bold'>P-Specs:</div>
                            <div className="flex items-center">{hardware.pspec}</div>
                            <div className='flex items-center font-bold'>Type:</div>
                            <div className="flex items-center">{hardware.type}</div>
                            <div className='flex items-center font-bold items-center'>Description:</div>
                            <div className="flex text-xs text-wrap items-center">{hardware.description}...</div>
                            <div className='flex items-center font-bold'>Status:</div>
                            <div className="flex items-center"><s>{hardware.status}</s> ➠<span className="font-bold text-red-700">RETURNED</span></div>
                            <div className='flex items-center font-bold'>Comments on location:</div> 
                            <input type='text' id="comments" name="comments" placeholder="ex. At PQ Hive drawer" className="border-solid border-2 border-gray-300 p-1" maxLength={60} required/>
                            {/* <div>{comments}</div> */}
                            <div className='flex items-center font-bold'>Last Date Modified:</div>
                            <div className="flex items-center">{String(hardware.dateModified)}</div>
                            <div className='flex items-center font-bold'>Owner:</div>
                            <div className="flex items-center justify-items-stretch">
                                <div><span><s>{hardware.owner}</s> ➠   </span></div>
                                <div><input type='text' name="owner" id="owner" value={userFullname} readOnly
                                className="border-solid border-2 border-gray-300 p-2 ml-2"/></div>
                                
                            </div>
                            <div className='flex items-center font-bold'>In Use Duration(days):</div>
                            <div className="flex items-center">{hardware.inUseDuration} days</div>
                        </div>
                        
                        <div className="flex flex-row justify-items-stretch ">
                             <SubmitButton buttonText="Return" /> 
                            <Link href={pathname}>
                                <button type="button" className="bg-red-500 text-white p-2 ml-[100px] rounded">Cancel</button>
                            </Link>
                            
                        </div>
                    </div>
                </form>
                )
               
            }
        </>
    );
}