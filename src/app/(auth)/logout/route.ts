import { getSession } from "@/logActions"
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export async function GET(){

  const session = await getSession()
  session.destroy()
  revalidatePath('/login')
  redirect('/login')
}
