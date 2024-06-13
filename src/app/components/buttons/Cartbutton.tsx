"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetCartData } from "@/get-client-data";

export default function Cartbutton() {
  const path = usePathname();
  const pathName = `${path}?cart=true`;

  const { data: cartdata } = useGetCartData();

  const cartItemCount = cartdata?.length;
  return (
    <Link href={pathName}>
      <div className="flex relative">
        <Image
          src="/assets/shopping-cart-icon.png"
          width={35}
          height={35}
          alt="PQ Hive"
          className="h-auto translate-y-1"
        />
        {cartItemCount ? (
          <div className="absolute -top-2 -right-3 bg-red-800 text-white rounded-full text-xs py-1 px-2">
            {cartItemCount}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
