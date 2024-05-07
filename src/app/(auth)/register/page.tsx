'use server'
import RegisterForm from '@/app/components/RegisterForm'
import { getSession } from '@/logActions'
import { redirect } from 'next/navigation'

export default async function Register(){

  const session = await getSession()

  if (!session.isSuperAdmin){
    redirect('/')
  }

  return (
    <>
      <RegisterForm />    
    </>
  )
}