import Image from "next/image"
interface CartProps{
  cartItemCount: string
}

export default function Cart({ cartItemCount }: CartProps){

  return(
    <div className="flex relative">
      <Image
            src="/assets/shopping-cart-icon.png"
            width={40}
            height={40}
            alt="PQ Hive"
          />
      <div className="absolute -bottom-4 -right-4 bg-red-800 text-white p-1 rounded-full px-3">
        {cartItemCount}
      </div>
    </div>
  )
}