"use client"
import {useSearchParams, usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import SubmitButton from "../buttons/SubmitButton";
import { changeOwner } from "../../../actions"
import { useGetHardwareAndUser } from "@/get-client-data";

export default function ModalCart() {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter()

    const modalCart = searchParams.get("cart");
   
    const getData = modalCart === 'true'


  const currentUser = 'Christian Oliver Ronquillo'


    return (
        <>
            {modalCart &&
                (
                
                <form action={changeOwner} //borrowItem 
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center drop-shadow-md"
                    >
                    <input type='hidden' name="currentUser" value={currentUser} />
                    <input type='hidden' name='pathname' value={pathname} />
                    <div className="bg-white m-auto p-8 min-w-[500px] min-h-[550px] flex flex-col justify-items-center ">
                        <div className="flex justify-center">
                            <div><h2 className="text-[40px] font-bold">Change Owner Form</h2></div>
                        </div>
                        
                        <div className="grid grid-cols-[170px_420px] min-h-[450px]">
                        </div>
                        
                        <div className="flex flex-row justify-items-stretch ">
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