import { getSession } from "@/logActions"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import DbMaintenanceButton from "../components/buttons/DbMaintenanceButton"
import { dbMaintenance } from "@/superAdminActions"
import { getMaintenanceData } from "@/mysqlutils"
import DeleteHardwareButton from "../components/buttons/DeleteHardwareButton"
import Link from "next/link"

export default async function SuperAdmin(){

  const session = await getSession()

    //redirect user if not loggedin
  if (!session.isLoggedIn){
    redirect('/login')
  }

  if (!session.isSuperAdmin){
    revalidatePath('/')
    redirect('/')
  }
  const maintenanceData = await getMaintenanceData();
  const isMaintaining = maintenanceData[0].flag

  return(<>
      <form action={dbMaintenance} className="my-4">
      <input type='hidden' name="isMaintaining" value={Number(isMaintaining)} />
      < DbMaintenanceButton isMaintaining={isMaintaining}/>
      </form>
     { isMaintaining && <div>
        <DeleteHardwareButton />
      </div>}
     <Link href="/register" className='pr-6 text-slate-700 hover:font-bold border-solid border-2 border-black rounded'>Create New User</Link>
  </>

      
  )
}