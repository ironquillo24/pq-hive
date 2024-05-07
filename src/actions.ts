'use server'

import { revalidatePath } from 'next/cache'
import { getSheetsData, postSheetData, modifySheetData} from './utils'
import { redirect } from 'next/navigation'

export async function borrowItem(formData: FormData){
  

  const target = Number(formData.get('dataID')) + 1
  const range = `Masterlist!I${target}:L${target}`

  const comments = formData.get('comments') as string
  const owner = formData.get('owner') as string
  const previousOwner = formData.get('previousOwner') as string
  const previousStatus = formData.get('previousStatus') as string

  const currentDate = getCurrentData()
  const uid = (()=> Date.now().toString(36) + Math.random().toString(36))()

  const data: any = await getSheetsData(range, false)

    if (data[1][0][0].toLowerCase().includes('storage')) {
      await postSheetData(range, comments, owner, "IN USE", currentDate, uid,previousOwner, previousStatus)
      revalidatePath('/')
      redirect('/?success=true&successType=borrow')
    } else{
      revalidatePath('/')
      redirect('/?notAvailable=true+hardwareID=1')
    }

}


export async function returnItem(formData: FormData){

  const target = Number(formData.get('dataID')) + 1
  const range = `Masterlist!I${target}:L${target}`

  const comments = formData.get('comments') as string
  const owner = formData.get('owner') as string
  const previousOwner = formData.get('previousOwner') as string
  const previousStatus = formData.get('previousStatus') as string
  const pathname = formData.get('pathname') as string
  const redirectPathname = `${pathname}?success=true&successType=return`

  const currentDate = getCurrentData()
  const uid = (()=> Date.now().toString(36) + Math.random().toString(36))()

  const data: any = await getSheetsData(range, false)
  
    if (data[1][0][0].includes('USE')&&(data[1][0][2].includes(owner))) {
      await postSheetData(range, comments, owner, "RETURNED", currentDate, uid,previousOwner, previousStatus)
      revalidatePath(pathname)
      redirect(redirectPathname)
    } else{
      revalidatePath('/')
      redirect('/?notAvailable=true+hardwareID=1')
    }
}

export async function acknowledge(formData: FormData){

  const target = Number(formData.get('dataID')) + 1
  const range: string = `Masterlist!I${target}:L${target}`

  const comments: string = String(formData.get('comments'))
  const owner: string = String(formData.get('owner'))
  const previousOwner: string = String(formData.get('previousOwner'))
  const previousStatus: string = String(formData.get('previousStatus'))

  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today. getDate();
  const hours = today.getHours();
  const minutes = ((today.getMinutes()<10)? ( '0' + today.getMinutes()) : today.getMinutes())

  const currentDate = month + "/" + date + "/" + year + " " + hours + ":" +  minutes;
  const uid = (()=> Date.now().toString(36) + Math.random().toString(36))()

  const data: any = await getSheetsData(range, false)
  
    if (data[1][0][0].includes('RETURNED')) {
      await postSheetData(range, comments, owner, "IN STORAGE", currentDate, uid,previousOwner, previousStatus)
      revalidatePath('/')
      revalidatePath('/returned-hardware')
      redirect('/returned-hardware')
    } else{
      revalidatePath('/')
      revalidatePath('/returned-hardware')
      redirect('/?notAvailable=true+hardwareID=1')
    }
}

export async function editItem(formData: FormData){

    const dataID: number = Number(formData.get('dataID'))
    const hardwareID: string = String(formData.get('hardwareID'))
    const pSpecs: string = String(formData.get('pSpecs'))
    const type: string = String(formData.get('type'))
    const generic: string = String(formData.get('generic'))
    const devicePackage: string = String(formData.get('devicePackage'))
    const leadCount: string = String(formData.get('leadCount'))
    const description: string = String(formData.get('description'))
    const status: string = String(formData.get('status'))
    const comments: string = String(formData.get('comments'))
    const owner:string = String(formData.get('owner'))
    //const lastDateModified:string = String(formData.get('lastDateModified'))
   // const inUseDuration: string = String(formData.get('inUseDuration'))
    const qtyRequest: string = String(formData.get('qtyRequest'))
    const supplier:string = String(formData.get('supplier'))
    const supplierPartNumber: string = String(formData.get('supplierPartNumber'))
    const requestor: string = String(formData.get('requestor'))
    const typeAcronym: string = String(formData.get('typeAcronym'))
    const barcode: string = String(formData.get('barcode'))
    const serialNumber: string = String(formData.get('serialNumber'))
    const withTag: string = String(formData.get('withTag'))
    const focusTeam: string = String(formData.get('focusTeam'))
  
    const today = new Date();
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    const date = today. getDate();
    const hours = today.getHours();
    const minutes = ((today.getMinutes()<10)? ( '0' + today.getMinutes()) : today.getMinutes())
  
    const currentDate = month + "/" + date + "/" + year + " " + hours + ":" +  minutes;
    const inUseDuration: string = `=NOW()-L${dataID+1}`

    const data: (string | null) []= [String(dataID),hardwareID,pSpecs,type,generic,devicePackage,leadCount,description,status,comments,owner,currentDate,inUseDuration,qtyRequest,supplier,supplierPartNumber,requestor,typeAcronym,barcode,serialNumber,withTag,focusTeam]

    await modifySheetData(data,true)
    revalidatePath('/')
    redirect('/')
}

export async function addItem(formData: FormData){

  const hardwareID: string = String(formData.get('hardwareID'))
  const pSpecs: string = String(formData.get('pSpecs'))
  const type: string = String(formData.get('type'))
  const generic: string = String(formData.get('generic'))
  const devicePackage: string = String(formData.get('devicePackage'))
  const leadCount: string = String(formData.get('leadCount'))
  const description: string = String(formData.get('description'))
  const status: string = String(formData.get('status'))
  const comments: string = String(formData.get('comments'))
  const owner:string = String(formData.get('owner'))
  //const lastDateModified:string = String(formData.get('lastDateModified'))
  //const inUseDuration: string = String(formData.get('inUseDuration'))
  const qtyRequest: string = String(formData.get('qtyRequest'))
  const supplier:string = String(formData.get('supplier'))
  const supplierPartNumber: string = String(formData.get('supplierPartNumber'))
  const requestor: string = String(formData.get('requestor'))
  const typeAcronym: string = String(formData.get('typeAcronym'))
  const barcode: string = String(formData.get('barcode'))
  const serialNumber: string = String(formData.get('serialNumber'))
  const withTag: string = String(formData.get('withTag'))
  const focusTeam: string = String(formData.get('focusTeam'))

  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today. getDate();
  const hours = today.getHours();
  const minutes = ((today.getMinutes()<10)? ( '0' + today.getMinutes()) : today.getMinutes())

  const currentDate = month + "/" + date + "/" + year + " " + hours + ":" +  minutes;

  const sheetData: any = await getSheetsData('MasterList!A1:A', false)

  const dataID = sheetData[1].length
  const inUseDuration: string = `=NOW()-L${dataID+1}`

  const data:string[] = [String(dataID),hardwareID,pSpecs,type,generic,devicePackage,leadCount,description,status,comments,owner,currentDate,inUseDuration,qtyRequest,supplier,supplierPartNumber,requestor,typeAcronym,barcode,serialNumber,withTag,focusTeam]

   await modifySheetData(data,false)
  revalidatePath('/')
  redirect('/') 
}

const getCurrentData = () =>{

  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today. getDate();
  const hours = today.getHours();
  const minutes = ((today.getMinutes()<10)? ( '0' + today.getMinutes()) : today.getMinutes())

  const currentDate = month + "/" + date + "/" + year + " " + hours + ":" +  minutes;
  return currentDate;
}

export async function changeOwner(formData: FormData){

  const target = Number(formData.get('dataID')) + 1
  const comments = formData.get('comments') as string
  const newOwner = formData.get('newOwner') as string
  const previousOwner = formData.get('previousOwner') as string
  const previousStatus = formData.get('previousStatus') as string
  const range: string = `Masterlist!I${target}:L${target}`
  const pathname = formData.get('pathname') as string
  const redirectPathname = `${pathname}?success=true&successType=changeOwner`

  const currentDate = getCurrentData()
  const uid = (()=> Date.now().toString(36) + Math.random().toString(36))()

  const data: any = await getSheetsData(range, false)
  
  if (data[1][0][0].includes('USE')&&(data[1][0][2]===previousOwner)) {
    await postSheetData(range, comments, newOwner, "IN USE", currentDate, uid,previousOwner, previousStatus)
    revalidatePath(pathname)
    redirect(redirectPathname)
  } else{
    revalidatePath(pathname)
    redirect(`${pathname}?notAvailable=true+hardwareID=1`)
  }
}

export async function notAvail(formData: FormData){

  const pathname = formData.get('pathname') as string

  revalidatePath('/')
  redirect('/')
}