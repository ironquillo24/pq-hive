import "./globals.css";
import Header from "./components/Header";
import ModalReturn from "./components/modals/ModalReturn";
import ModalSuccess from "./components/modals/ModalSuccess";
import ModalNotAvailable from "./components/modals/ModalNotAvailable";
import ModalBorrow from "./components/modals/ModalBorrow"
import { ReactQueryProvider } from "./components/ReactQueryProvider";
import ModalChangeOwner from "./components/modals/ModalChangeOwner";
import ModalCart from "./components/modals/ModalCart";
import { getSession } from "@/logActions";
import Nav from "./components/Nav";
import { ThemeModeScript } from "flowbite-react";

export const metadata = {
  title: 'PQ Hive',
  description: 'by PQ Team',
}

export default async function RootLayout(
  props: {
  children: React.ReactNode,
  transact: React.ReactNode;
}) {
  <link rel="icon" href="/favicon.ico" sizes="any" />
  const isDark = false
  const bgColor = isDark? 'bg-slate-900' : 'bg-gradient-to-r from-neutral-50 to-neutral-200'

  const session = await getSession()
  
  return (
    <html lang="en">
      <head>
       <ThemeModeScript />
      </head>
      <body className={`font-sans${bgColor}`}>
      <ReactQueryProvider>
        {/* <header className="fixed w-full min-w-screen z-[10] bg-white"><Header session={session}/></header> */}
          <header className="fixed w-full p-0 z-50 border-b-2"><Nav session={session}/></header>
          <main className="pt-[65px]">
            {props.children}
          </main>
          <ModalBorrow isAdmin={session.isAdmin!} employeeid={String(session.employeeID!)}/>
          <ModalNotAvailable/>
          <ModalReturn />
          <ModalSuccess />
          <ModalChangeOwner />
          <ModalCart /> 
      </ReactQueryProvider>
      
      </body>
    </html>
  )
}
