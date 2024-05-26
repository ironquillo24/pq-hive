'use server'
import { updateMaintenanceData } from "./mysqlutils";
import { revalidatePath } from "next/cache";


export async function dbMaintenance(formData:FormData){

  const isMaintaining = Number(formData.get('isMaintaining')) === 1

  if (isMaintaining){
    await updateMaintenanceData(false)
    revalidatePath('/super-admin')
  } else {
    await updateMaintenanceData(true)
    revalidatePath('/super-admin')
  }

}
