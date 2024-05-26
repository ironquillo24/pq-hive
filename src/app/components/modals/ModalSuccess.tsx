"use client"
import {useSearchParams, usePathname} from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";


export default function ModalSuccess() {
    const searchParams = useSearchParams();
    const modalSuccess = searchParams.get("success");
    const successType = searchParams.get('successType') as string
    const pathname = usePathname();
    const queryClient = useQueryClient()

    const handleOnClick = () =>{
            queryClient.invalidateQueries({ queryKey: ['ACT10004','borrow'] })
    }

    let message = ''
    switch(successType){
        case 'borrow':
            message = 'Borrow Successful! Please retrieve your item from its location.'
            break;
        case 'return':
            message = 'Item has been returned. Please ensure the item is in its proper location based on your comment. Please inform or wait for your custodian to acknowledge. Thank you!'
            break;
        case 'changeOwner':
            message = 'Owner of item has been successfully changed!'
            break;
        default:
            message = 'success!'
    }


    return (
        <>
            {modalSuccess &&
                
                <dialog
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center"
                    >
                    <div className="bg-white m-auto p-8 min-w-[500px] min-h-[300px] flex flex-col justify-items-center ">
                        <div className="flex min-h-[200px] justify-center items-center text-wrap max-w-[800px] text-center">
                            <h2 className="text-xl font bold">{message}</h2>
                        </div>
                        
                        <div className="flex justify-center">
                          
                            
                            <Link href={pathname} scroll={false}>
                                <button type="button" className="bg-green-500 text-white p-2  rounded" onClick={handleOnClick}>Ok</button>
                            </Link>
                            
                        </div>
                    </div>
                </dialog>
               
                
            }
        </>
    );
}