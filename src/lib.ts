import { SessionOptions } from "iron-session"

export interface SessionData{
  userID?: number,
  employeeID?: number,
  userName?: string,
  nickName?: string,
  fullName?: string,
  email?: string,
  team?: string,
  isAdmin?: boolean,
  isSuperAdmin?: boolean,
  isLoggedIn: boolean
}

export const defaultSession: SessionData ={
  isLoggedIn: false
}

export const sessionOptions: SessionOptions={
  password: process.env.SECRET_KEY!,
  cookieName: "hive-session",
  cookieOptions: {
    httpOnly: true,
    secure: false //process.env.NODE_ENV === 'production'
  }
}