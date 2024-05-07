"use server"
import {sessionOptions, SessionData, defaultSession} from '@/lib'
import { getIronSession } from 'iron-session'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcrypt'
import { modifyUserData, getSheetsData } from './utils'


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

    const userDataSheet:any = await getSheetsData('UserData!A1:L',false)
    const userData: string[][] = userDataSheet[1]
    
    let fullnameArr: string[] = []

    for (const user of userData){
      if (user[5]!=='Full Name')
        fullnameArr.push(user[5])
    }
   

    let username: string = ''
    let isAdmin: boolean = false
    let password: string = ''
    let userID: string = ''
    let fullName: string =''
    let nickName: string =''
    let isSuperAdmin = false
    

    const formUsername = formData.get("username") as string
    const formPassword = formData.get('password') as string

    for (const user of userData){
      if (formUsername === user[8]){
        userID = user[1]
        username = user[8]
        password = user[9]
        fullName = user[5]
        nickName = user[7]
        isAdmin = user[10] === 'TRUE'
        isSuperAdmin = user[11] === 'TRUE'
        { break }
      }    
    }

    if (username === ''){
      return {error: "Invalid username or password"}
    } 

    const passwordMatches = await bcrypt.compare(formPassword,password)
 
    if(!passwordMatches){
      return {error: "Invalid username or password"}
    }

    session.userID = userID
    session.userName = formUsername
    session.isAdmin = isAdmin
    session.fullName = fullName
    session.nickName = nickName
    session.isLoggedIn = true
    session.isSuperAdmin = isSuperAdmin
    session.fullnameArr = fullnameArr

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

  const userDataSheet:any = await getSheetsData('UserData!A1:K',false)
  const userData = userDataSheet[1]

  const dataID = String(userData.length)
  

  for (const user of userData){
    if (username === user[8]){
      return {error: "username already taken"}
    }
  }
  
  const fullName = firstName + ' ' + lastName

  const hashedPassword = await bcrypt.hash(password,10)

  const data= [dataID, employeeNumber,lastName,firstName,email,fullName,team,nickname,username,hashedPassword]
  await modifyUserData(data,false)
  revalidatePath('/login')
  redirect('/login')

}