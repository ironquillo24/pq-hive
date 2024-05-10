'use client'
import { notAvail } from "@/actions";
import { useSearchParams, usePathname } from "next/navigation"

export default function ModalNotAvailable() {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const modalNotAvail = searchParams.get("notAvailable");
    return (
        <>{
            modalNotAvail &&
            (
            <form action={notAvail} className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center drop-shadow-md">
                    <div className="bg-white m-auto p-8 min-w-[500px] min-h-[300px] flex flex-col justify-items-center ">
                        <div className="flex min-h-[200px] justify-center items-center">
                            <h2 className="text-xl font bold">Hardware not Available</h2>
                        </div>
                        <div className="flex justify-center">       
                            <button type="submit" className="bg-red-500 text-white p-2 rounded">
                                Okay
                            </button>
                        </div>
                    </div>
            </form>
            )
            }
        </>                                           
    );
}