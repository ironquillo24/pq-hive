'use client'
import { logout } from "@/logActions"
import { useQueryClient } from "@tanstack/react-query"
import {useRef, useEffect} from 'react'

export default function Logout(){
  
  const queryClient = useQueryClient()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    formRef.current!.requestSubmit()
  },[])

  return (
    <form action={logout} onSubmit={() => queryClient.clear()} ref={formRef}>
    </form>
  )

}