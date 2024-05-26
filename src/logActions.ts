"use server"
import {sessionOptions, SessionData, defaultSession} from '@/lib'
import { getIronSession } from 'iron-session'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcrypt'
import { getUserByUsername } from './mysqlutils'


export const getSession = async() => {

  const session = await getIronSession<SessionData>(cookies(),sessionOptions)

  if(!session.isLoggedIn){
    session.isLoggedIn = defaultSession.isLoggedIn
  }
  return session;
}

export const login = async(
  prevState: { error: undefined | string},
  formData:FormData) =>{

    const session = await getSession()

    const formUsername = formData.get("username") as string
    const formPassword = formData.get('password') as string

    const userdb = await getUserByUsername(formUsername)

    if (!userdb){
      return {error: "Invalid username or password"}
    } 

    const passwordMatches = await bcrypt.compare(formPassword,userdb.password)
 
    if(!passwordMatches){
      return {error: "Invalid username or password"}
    }

    session.userID = userdb.employeeid
    session.userName = userdb.username
    session.isAdmin = userdb.isAdmin.toString() === '1'
    session.fullName = userdb.fullname
    session.nickName = userdb.nickname
    session.isLoggedIn = true
    session.isSuperAdmin = userdb.isSuperAdmin.toString() === '1'

    await session.save()
    revalidatePath('/')
    redirect('/')

}

export const logout = async() =>{

  const session = await getSession()
  session.destroy()
  revalidatePath('/login')
  redirect('/login')

}

export const register = async(
  prevState: { error: undefined | string},
  formData:FormData) => {

  const username = formData.get("username") as string
  const password = formData.get("password") as string
  const employeeNumber = formData.get("employeeNumber") as string
  const lastName = formData.get("lastName") as string
  const firstName = formData.get("firstName") as string
  const email = formData.get("email") as string
  const team = formData.get("team") as string
  const nickname = formData.get("nickname") as string

 /*  const userDataSheet:any = await getSheetsData('UserData!A1:K',false)
  const userData = userDataSheet[1]

  const dataID = String(userData.length)
  

  for (const user of userData){
    if (username === user[8]){
      return {error: "username already taken"}
    }
  }
  
  const fullName = firstName + ' ' + lastName

  const hashedPassword = await bcrypt.hash(password,10)

  const data= [dataID, employeeNumber,lastName,firstName,email,fullName,team,nickname,username,hashedPassword] */
 // await modifyUserData(data,false)
  revalidatePath('/login')
  redirect('/login')

}