'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionData } from "@/lib"

export default function NavBar( { isLoggedIn, isAdmin, isSuperAdmin } : SessionData ){

  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  const isDark = false
  const textcolor =  isDark? 'text-white' : 'text-slate-800'
  
  return (<nav>
            <div className="flex pb-[10px] ">
            
              <div>
               {isLoggedIn && <Link href="/" className={`pr-6 ${textcolor} hover:font-bold ` + (isActive('/')? 'font-bold' : '') } prefetch={false}>Home</Link> } 
               { isLoggedIn &&  <Link href='/myhardware' className={`pr-6 ${textcolor} hover:font-bold` + (isActive('myhardware')?'font-bold' : '')}>My Hardware</Link>} 
               { isAdmin && 
               <>
                <Link href='/returned-hardware' className={`pr-6 ${textcolor} hover:font-bold`}>Returned Hardware</Link>
               </>
                }
                { isSuperAdmin &&
                  <>
                    <Link href="/super-admin" className={`pr-6 ${textcolor} hover:font-bold`}>Super Admin</Link>
                  </>
                }
                <Link href="/profile" className={`pr-6 ${textcolor} hover:font-bold`}>Profile</Link>
                
              </div>
              
            </div>
        </nav>
)}

