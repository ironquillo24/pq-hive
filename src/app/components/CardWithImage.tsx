import Image from "next/image"
import Link from "next/link";
import React from "react";
interface CardWithImageProps {
  children: React.ReactNode
}

const CardWithImage = ({children}: CardWithImageProps) => {

  return <>

  <div className="max-w-sm w-full h-full border-gray-700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

      {children}
       
      <div className="p-5">
          <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white text-center">Christian Oliver Ronquillo</h5>
          </a>
          <div className="grid grid-cols-[30%_70%] text-white text-sm font-medium text-left pb-4">
            <div>Employee id: </div> <div>12345</div>
            <div>Team:</div> <div>ADLK</div>
            <div>Email:</div> <div>christianoliver.ronquillo@analog.com</div>
          </div>
          <div className="w-full flex justify-center">
            <a href="#" className=" items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                change profile picture

            </a>
          </div>  
      </div>
</div>

  
  </>
}

export default CardWithImage;