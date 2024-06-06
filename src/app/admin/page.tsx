import { getSession } from "@/logActions"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import DbMaintenanceButton from "../components/buttons/DbMaintenanceButton"
import { dbMaintenance } from "@/superAdminActions"
import { getMaintenanceData } from "@/mysqlutils"
import DeleteHardwareButton from "../components/buttons/DeleteHardwareButton"
import Link from "next/link"
import CardNoImage from "../components/CardNoImage"

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
    <div className="grid grid-cols-3 place-content-center w-screen h-screen bg-slate-900">
      <div className="w-[250px] justify-self-center">
        <CardNoImage>
          <form action={dbMaintenance} className="my-2">
            <input type='hidden' name="isMaintaining" value={Number(isMaintaining)} />
            <div className="flex justify-center">
              < DbMaintenanceButton isMaintaining={isMaintaining}/>
            </div>
            <p className="text-white text-center">When started, will display maintenance page to users, disabling all basic functionalities.</p>
          </form>
        </CardNoImage>
      </div>

      <div className="w-[250px] justify-self-center self-center">
        <CardNoImage>
          <div className="flex justify-center">
            <DeleteHardwareButton />
          </div>
          <p className="text-white text-center">Warning: Will delete hardware forever.</p>
        </CardNoImage>
      </div>

      <div className="w-[250px] justify-self-center self-center">
        <CardNoImage>
          <div className="flex justify-center">
            <Link href="/register" className='p-2 bg-green-500 text-white text-slate-700 hover:font-bold rounded'>Create New User</Link>
          </div>
          <p className="text-white text-center">Register new user to PQ Hive.</p>
        </CardNoImage>
      </div>
      
    </div>
  
  </>

      
  )
}