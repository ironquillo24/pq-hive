'use client'
import { Data } from "@/dbSchema"
import { useGetCartData } from "@/get-client-data"
import { useMutation,useQueryClient } from "@tanstack/react-query"
import { updateCartLogs } from "@/mysqlutils"
import { useAddtoCart } from "@/post-client-data"

interface Props{
  data: Data
  userID: number
}
export default function AddtoCartButton({data, userID}: Props){

  const queryClient = useQueryClient()

  const {data: cartdata} = useGetCartData()
  const addToCartMutation = useAddtoCart()

  const onAddtoCart = () =>{
    addToCartMutation.mutate([data.id,userID])
  }

  const cartItemCounter = cartdata?.find((item) => item.hardwareid === data.hardwareid)

  const isInMyCart = cartItemCounter !== undefined ? true  : false

  const buttonText = isInMyCart? "Added" : "+Cart"

  const style = isInMyCart? "bg-slate-100 text-slate-500 border-solid border-2 border-slate-300": "bg-yellow-500 text-white hover:bg-yellow-700"


  
  return (<>
    <input type='hidden' name="hardwarenum" value={data.id} />
    <input type='hidden' name="userID" value={userID} />
    <button type="button" disabled={isInMyCart} onClick={onAddtoCart}
      className={`flex items-center justify-center  h-[35px] w-16  font-medium py-2 px-4 rounded ${style}`}
    >{buttonText}</button>
  </>
)}