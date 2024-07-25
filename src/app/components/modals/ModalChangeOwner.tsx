"use client"
import {useSearchParams, usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import SubmitButton from "../buttons/SubmitButton";
import { changeOwner } from "../../../actions"
import { useGetHardwareAndUser } from "@/get-client-data";

export default function ModalChangeOwner() {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter()

    const modalChangeOwner = searchParams.get("transferItem");
    const hardwareID = searchParams.get('hardwareID') || '' as string

    
   
    const getData = modalChangeOwner === 'true'
    const data = useGetHardwareAndUser(hardwareID,'transfer', getData, true)
    const hardware = data[0].data!
    const currentUser = data[1].data
    const usersFullname = data[2].data!
    
    //no queries yet
    if (hardware === undefined){
        return null
    }

    //redirect if harware is not existing or not in storage when modalBorrow is being pulled
    if ((modalChangeOwner==='true')&&((hardware.hardwareid === '')||(hardware.owner!==currentUser))){
        router.replace(`${pathname}?notAvailable=true`)
    }
    
    let fullNameArr: string[] =[]
    usersFullname?.map((user) => (user.fullname!==currentUser) ? fullNameArr.push(user.fullname) : null)

    return (
        <>
            {modalChangeOwner &&
                (
                
                <form action={changeOwner} //borrowItem 
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center drop-shadow-md"
                    >
                    <input type='hidden' id="dataID" name="dataID" value={hardware?.hardwareid} />
                    <input type='hidden' id="previousOwner" name="previousOwner" value={hardware?.owner} />
                    <input type='hidden' id="previousStatus" name="previousStatus" value={hardware?.status} />
                    <input type='hidden' name='pathname' value={pathname} />
                    <div className="bg-white m-auto p-8 min-w-[500px] min-h-[550px] flex flex-col justify-items-center ">
                        <div className="flex justify-center">
                            <div><h2 className="text-[40px] font-bold">Change Owner Form</h2></div>
                        </div>
                        
                        <div className="grid grid-cols-[170px_420px] min-h-[450px]">
                            <div className=' flex items-center font-bold'>Hardware ID:</div>
                            <div className="flex items-center">{hardware?.hardwareid}</div>
                            <div className='flex items-center font-bold'>P-Specs:</div>
                            <div className="flex items-center">{hardware?.pspec}</div>
                            <div className='flex items-center font-bold'>Type:</div>
                            <div className="flex items-center">{hardware?.type}</div>
                            <div className='flex font-bold items-center'>Description:</div>
                            <div className="flex text-xs text-wrap items-center">{hardware?.description}...</div>
                            <div className='flex items-center font-bold'>Status:</div>
                            <div className="flex items-center"><s>{hardware?.status}</s> ➠<span className="font-bold text-red-700"> IN USE</span></div>
                            <div className='flex items-center font-bold'>Comments on loc/act:</div> 
                            <input type='text' id="comments" name="comments" placeholder="ex. AD1234 YA at 80MFLEX" className="border-solid border-2 border-gray-300 p-1" maxLength={60} required />
                            <div className='flex items-center font-bold'>Last Date Modified:</div>
                            <div className="flex items-center">{String(hardware?.dateModified)}</div>
                            <div className='flex items-center font-bold'>Owner:</div>
                            <div className="flex items-center justify-items-stretch">
                                <div><span><s>{hardware?.owner}</s> ➠   </span></div>
                                <div><select name="newOwner"className="border-solid border-2 border-gray-300 p-2 ml-2">
                                  {
                                    fullNameArr?.map((name,ind) => <option value={name} key={ind}>{name}</option>)
                                  }

                                      </select>
                                </div>
                            </div>
                            <div className='flex items-center font-bold'>In Use Duration(days):</div>
                            <div className="flex items-center">{" "}{hardware?.inUseDuration}</div>
                        </div>
                        
                        <div className="flex flex-row justify-center ">
                             <SubmitButton buttonText="Transfer"/> 
                            <Link href={pathname} className="bg-red-500 text-white p-2 rounded ml-[200px]" scroll={false}>
                                Cancel
                            </Link>
                            
                        </div>
                    </div>
                </form>
                )
               
            }
        </>
    );
}