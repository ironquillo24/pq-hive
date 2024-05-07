import { getSession } from "@/logActions"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import DbMaintenanceButton from "../components/DbMaintenanceButton"
import { dbMaintenance } from "@/superAdminActions"
import { getSheetsData } from "../../utils"
import DeleteHardwareButton from "../components/DeleteHardwareButton"
import Link from "next/link"

export default async function Admin(){

  const session = await getSession()

    //redirect user if not loggedin
  if (!session.isLoggedIn){
    redirect('/login')
  }

  if (!session.isSuperAdmin){
    revalidatePath('/')
    redirect('/')
  }
  const data:any = await getSheetsData('MasterList!A1:A1',false)
  const isMaintaining = data[1][0][0]=== 'Maintenance'

  return(<>
      <form action={dbMaintenance} className="my-4">
      <input type='hidden' name="isMaintaining" value={String(isMaintaining)} />
      < DbMaintenanceButton isMaintaining={isMaintaining}/>
      </form>
     { isMaintaining && <div>
        <DeleteHardwareButton />
      </div>}
     <Link href="/register" className='pr-6 text-slate-700 hover:font-bold border-solid border-2 border-black rounded'>Create New User</Link>
  </>

      
  )
}