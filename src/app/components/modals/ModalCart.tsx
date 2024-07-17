"use client"
import {useSearchParams, usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import SubmitButton from "../buttons/SubmitButton";
import { borrowCart } from "../../../actions"
import { useGetCartData, useGetCurrentUser } from "@/get-client-data";
import { useRemoveFromCart } from "@/post-client-data"
import RemoveFromCartButton from "../buttons/RemoveFromCartButton";
import { useQueryClient } from "@tanstack/react-query";

export default function ModalCart() {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter()
    const queryClient = useQueryClient()

    const modalCart = searchParams.get("cart")
   
    const getData = modalCart === 'true'

    const {data: cartdata} = useGetCartData()

    const {data: userData} = useGetCurrentUser()

    const removeItem = useRemoveFromCart()


    return (
        <>
            {getData &&
                (
                
                <form action={borrowCart}
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center"
                    >
                    <input type='hidden' name="userFullname" value={userData?.fullName} />
                    <input type='hidden' name="userID" value={userData?.userID} />
                    <input type='hidden' name='pathname' value={pathname} />

                    <div className="bg-white m-auto p-8 min-w-[1010px] min-h-[580px] flex flex-col justify-items-center relative rounded-[10px] border-solid border drop-shadow-md">
                        <div className="flex justify-center pb-4">
                            <div><h2 className="text-[40px] font-bold">My Cart</h2></div>
                        </div>
                        

                        <div className="grid grid-cols-[60px_100px_100px_100px_250px_100px_200px_100px] text-black font-bold pb-4">
                            <div className="flex justify-center">Item</div>
                            <div className="flex justify-center">Hardware ID</div>
                            <div className="flex justify-center">P-Specs</div>
                            <div className="flex justify-center">Type</div>
                            <div className="flex justify-center">description</div>
                            <div className="flex justify-center">Status</div>
                            <div className="flex justify-center">comment</div>
                            <div className="flex justify-center">Action</div>
                        </div>

                        { cartdata?.length ?
                            <ul  className="overflow-auto h-[300px] min-w-[1010px]" >
                            {
                                cartdata?.map((cart,index) => {
                                    const notInclude = (cart.status === 'IN STORAGE') ? "" : "text-slate-400 line-through"                                   
                                    
                                    return(

                                <li key={cart.cartid}>
                                    <div className="grid grid-cols-[60px_100px_100px_100px_250px_100px_200px_100px] text-[14px] py-2 my-2 rounded border-solid border-2 border-slate-200">
                                        <div className={`flex justify-center ${notInclude}`}>{index + 1}</div>
                                        <div className={`flex justify-center ${notInclude}`}>{cart.hardwareid}</div>
                                        <div className={`flex justify-center ${notInclude}`}>{cart.pspec}</div>
                                        <div className={`flex justify-center ${notInclude}`}>{cart.type}</div>
                                        <div className={`flex justify-center ${notInclude} text-center text-wrap relative group`}>{cart.description.substring(0,30)}...<span className="absolute flex translate-x-36 scale-0 group-hover:scale-100 p-2 bg-white border border-solid border-slate-200 rounded-md text-wrap">{cart.description}</span></div>
                                        <div className={`flex justify-center ${notInclude}`}>{cart.status}</div>
                                        <div className={`flex justify-center ${notInclude}`}>{cart.comment}</div>
                                        <div className="flex justify-center">
                                            <RemoveFromCartButton cartid={cart.cartid}/>
                                        </div>
                                    </div>
                                </li>
                                 )})
                            }
                            </ul> : <div className="min-h-[300px] w-full flex justify-center items-center">Your cart is Empty {":("}</div>
                        
                        }
                        
                        <div className="my-2 text-xs italic">Note: Items not in storage will not be available for borrowing.</div>
                        <div className="flex m-2">
                            <div className="font-bold">Comments on loc/activity:</div>
                            <input name="comments" className="w-[700px] ml-2 border-solid border-2 border-slate-500 rounded" required maxLength={60}/>
                        </div>
                        <div className="ml-[210px] text-xs italic">*Will apply to all hardware borrowed*</div>


                        
                        <div className="flex flex-row justify-center gap-[200px] w-full mt-6">
                             <SubmitButton buttonText="Borrow"/> 
                            <Link href={pathname} className="bg-red-500 text-white p-2 rounded hover:bg-red-700" scroll={false}>
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