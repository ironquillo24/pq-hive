'use client'
import SessionContext from './SessionContext'

const SessionProvider = ({ children, user }: {
  children: React.ReactNode, user: string[][]
}) => {


  return(
    <SessionContext.Provider value={user}>
      {children}
    </SessionContext.Provider>
  )

}

export default SessionProvider;