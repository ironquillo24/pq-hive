"use client"
import { useRemoveFromCart } from "@/post-client-data"

interface ButtonProps{
  cartid: string
}
const RemoveFromCartButton = ({cartid}: ButtonProps) => {

  const removeItem = useRemoveFromCart()

  const onRemove = () => {
   // e.preventDefault()
    removeItem.mutate(cartid)
  }

  return (
  <button type="button" className=" text-red-500 hover:underline" onClick={onRemove} >remove</button>
  )

}

export default RemoveFromCartButton;