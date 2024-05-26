'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"


interface CartProps{
  cartItemCount: string
}

export default function Cart({ cartItemCount }: CartProps){

  const path = usePathname()
  const pathName = `${path}?cart=true`


  return(
    <Link href={pathName}>
      <div className="flex relative">
        <Image
              src="/assets/shopping-cart-icon.png"
              width={40}
              height={40}
              alt="PQ Hive"
            />
        <div className="absolute -top-2 -right-3 bg-red-800 text-white rounded-full text-xs py-1 px-2" >
          {cartItemCount}
        </div>
      </div>
  </Link>
  )
}