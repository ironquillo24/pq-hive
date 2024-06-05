import Image from "next/image"
import Link from "next/link";
import React from "react";
import { SessionData } from "@/lib";
interface CardWithImageProps {
  userInfo: SessionData,
  children: React.ReactNode
}

const CardWithImage = ({userInfo,children}: CardWithImageProps) => {


  return <>

  <div className="max-w-sm w-full h-full border-gray-700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

      {children}
       
      <div className="p-5">
          
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white text-center">{userInfo.fullName}</h5>
          
          <div className="grid grid-cols-[30%_70%] text-white text-sm font-medium text-left pb-4 px-5">
            <div>Employee id: </div> <div>{userInfo.employeeID}</div>
            <div>Team:</div> <div>{userInfo.team}</div>
            <div>Email:</div> <div>{userInfo.email}</div>
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