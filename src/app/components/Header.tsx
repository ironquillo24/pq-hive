import { getSession } from "@/logActions"
import NavBar from "./NavBar"
import Image from "next/image"
import LogoutForm from "./forms/logoutForm"
import Cart from "./buttons/Cartbutton"

const Header = async () =>{

  
  const session = await getSession()

  
  return(<div className="flex relative border-b-2 border-zinc-300">
    <Image
      src="/assets/logo.png"
      width={200}
      height={200}
      alt="PQ Hive"
      className="p-0 mr-2"
    />
    <div className="ml-2 pt-6">
      <NavBar isLoggedIn={session.isLoggedIn!} isAdmin={session.isAdmin!} isSuperAdmin={session.isSuperAdmin!}/>
    </div>
    <div className="flex flex-row gap-4 absolute right-0 mr-4 pt-6 font-bold text-xl items-center">

        {
          session.isLoggedIn && 
          <>
            <div>
              <Cart />
            </div>
            <div>Hi, {session.nickName}</div> 
            
              <LogoutForm />
            
          </>
        } 
      </div>
  </div>)
}

export default Header;