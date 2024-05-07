"use client"
import { useRouter } from "next/navigation"
import {useSearchParams, usePathname} from "next/navigation";
import SubmitButton from "./SubmitButton";
import { notAvail } from "../../actions";

export default function ModalNotAvailable() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const modalNotAvail = searchParams.get("notAvailable");
    const pathname = usePathname();

/* 	const handleOnBorrow = () => {
         
        router.replace('BorrowItemID?update=true&hardwareID=IN+STORAGE')
    } */

    return (
        <>
            {modalNotAvail &&
                <form action={notAvail}
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center"
                    >
                    <div className="bg-white m-auto p-8 min-w-[500px] min-h-[300px] flex flex-col justify-items-center ">
                        <div className="flex min-h-[200px] justify-center items-center">
                            <input type="hidden" name="pathname" value={pathname} />
                            <h2 className="text-xl font bold">Hardware not Available</h2>
                        </div>
                        
                        <div className="flex justify-center">       
                            <SubmitButton buttonText="Ok"/>
                        </div>
                    </div>
                </form>              
                                    
            }
        </>
    );
}