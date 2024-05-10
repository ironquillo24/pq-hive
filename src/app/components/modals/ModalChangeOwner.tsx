"use client"
import {useSearchParams, usePathname} from "next/navigation";
import Link from "next/link";
import SubmitButton from "../buttons/SubmitButton";
import { changeOwner } from "../../../actions"

interface ModalChangeOwnerProps{
  fullNameArr: string[]
}

export default function ModalChangeOwner({ fullNameArr }: ModalChangeOwnerProps) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const ModalChangeOwner = searchParams.get("transferItem");
    
    const dataID= searchParams.get("dataID") as string
    const hardwareID = searchParams.get("hardwareID") as string
    const pSpecs = searchParams.get("pSpecs") as string
    const type = searchParams.get("type") as string
    const description = searchParams.get("description") as string
    const status = searchParams.get("status") as string
    const comments = searchParams.get("comments") as string
    const lastDateModified = searchParams.get("lastDateModified") as string
    const owner = searchParams.get("owner") as string
    const inUseDuration = searchParams.get("inUseDuration") as string
  
    return (
        <>
            {ModalChangeOwner &&
                (
                
                <form action={changeOwner} //borrowItem 
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center drop-shadow-md"
                    >
                    <input type='hidden' id="dataID" name="dataID" value={dataID} />
                    <input type='hidden' id="previousOwner" name="previousOwner" value={owner} />
                    <input type='hidden' id="previousStatus" name="previousStatus" value={status} />
                    <input type='hidden' name='pathname' value={pathname} />
                    <div className="bg-white m-auto p-8 min-w-[500px] min-h-[550px] flex flex-col justify-items-center ">
                        <div className="flex justify-center">
                            <div><h2 className="text-[40px] font-bold">Change Owner Form</h2></div>
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
                            <div className='flex items-center font-bold'>Last Date Modified:</div>
                            <div className="flex items-center">{lastDateModified}</div>
                            <div className='flex items-center font-bold'>Owner:</div>
                            <div className="flex items-center justify-items-stretch">
                                <div><span><s>{owner}</s> ➠   </span></div>
                                <div><select name="newOwner"className="border-solid border-2 border-gray-300 p-2 ml-2">
                                  {
                                    fullNameArr?.map((name,ind) => <option value={name} key={ind}>{name}</option>)
                                  }

                                      </select>
                                </div>
                            </div>
                            <div className='flex items-center font-bold'>In Use Duration(days):</div>
                            <div className="flex items-center">{inUseDuration}</div>
                        </div>
                        
                        <div className="flex flex-row justify-items-stretch ">
                             <SubmitButton buttonText="Transfer"/> 
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