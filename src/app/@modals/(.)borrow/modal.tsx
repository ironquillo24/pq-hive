'use client'

import React from "react"
import { createPortal } from 'react-dom';
import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';


export default function ModalTransact({ children }: {children: React.ReactNode}){

  
  return(
      <dialog 
        className="fixed w-full h-full top-0 pt-[30px] left-0 bg-black bg-opacity-50 z-50 backdrop-blur overflow-auto flex
        justify-center"
      >
        {children}
      </dialog>
  )
}