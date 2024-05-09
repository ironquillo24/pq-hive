import { notAvail } from "@/actions";
export default function NotAvailable() {

    return (
        <>
            <form action={notAvail} className="pt-[100px]">
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
        </>                                           
    );
}