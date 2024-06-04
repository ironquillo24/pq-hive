import React from "react"

interface CardNoImageProps{
  children: React.ReactNode
}
const CardNoImage = ({children} : CardNoImageProps ) => {

  return <>
  <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {children}
  </div>
  </>
}

export default CardNoImage;