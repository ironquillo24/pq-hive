import { SessionOptions } from "iron-session"

export interface SessionData{
  userID?: string,
  userName?: string,
  nickName?: string,
  fullName?: string,
  isAdmin?: boolean,
  isSuperAdmin?: boolean,
  isLoggedIn: boolean
  fullnameArr?: string[]
}

export const defaultSession: SessionData ={
  isLoggedIn: false
}

export const sessionOptions: SessionOptions={
  password: process.env.SECRET_KEY!,
  cookieName: "hive-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}