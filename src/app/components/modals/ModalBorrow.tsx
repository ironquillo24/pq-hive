"use client"
import {useSearchParams, usePathname} from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {borrowItem} from '../../../actions'
import SubmitButton from "../buttons/SubmitButton";
import Data from "@/dbSchema";
import { getByHardwareid } from "@/mysqlutils";
import defaultData from "@/app/defaultData";
import { useQuery } from "@tanstack/react-query";
import { useGetDataById } from "@/app/data/get-data";

interface ModalBorrowProps {
    data: Data
}
export default function ModalBorrow() {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const modalBorrow = searchParams.get("borrowItem");
    const hardwareID = searchParams.get('hardwareID') || '' as string
    console.log(hardwareID)

    const {data: hardware , isLoading, isError, refetch } = useGetDataById(hardwareID);

    console.log('mounting borrow')
    
    const user = 'Christian Oliver Ronquillo'

    return (
        <>
            {modalBorrow &&
                (
                
                <form action={borrowItem} //borrowItem 
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center drop-shadow-md"
                    >
                    <input type='hidden' id="dataID" name="dataID" value={hardwareID} />
                    <input type='hidden' id="hardwareID" name="hardwareID" value={hardwareID} />
                    <input type='hidden' id="previousOwner" name="previousOwner" value={hardware?.owner} />
                    <input type='hidden' id="previousStatus" name="previousStatus" value={hardware?.status} />
                    <div className="bg-white m-auto p-8 min-w-[500px] min-h-[550px] flex flex-col justify-items-center ">
                        <div className="flex justify-center">
                            <div><h2 className="text-[40px] font-bold">Borrowing Form</h2></div>
                        </div>
                        
                        <div className="grid grid-cols-[170px_350px] min-h-[450px]">
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
                                <div><input type='text' name="owner" id="owner" value={user} readOnly
                                className="border-solid border-2 border-gray-300 p-2 ml-2"/></div>
                                
                            </div>
                            <div className='flex items-center font-bold'>In Use Duration(days):</div>
                            <div className="flex items-center">{hardware?.inUseDuration}</div>
                        </div>
                        
                        <div className="min-w-[520px] flex justify-items-stretch">
                             <SubmitButton buttonText="Borrow"/> 
                            <Link href={pathname} className="bg-red-500 text-white p-2 rounded ml-[200px]">
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