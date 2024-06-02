'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getByHardwareid, updateSingleData, updateLogs, getCartDataByUserid, updateMultipleHardware, deleteMultipleCartData, getHardwareByOwner } from './mysqlutils'
import { error } from 'console'

export async function borrowItem(formData: FormData){
  

  const hardwareid = formData.get('dataID') as string
  const comments = formData.get('comments') as string
  const newOwner= formData.get('owner') as string
  const previousOwner = formData.get('previousOwner') as string
  const previousStatus = formData.get('previousStatus') as string
  const redirectPathname = `/?success=true&successType=borrow`

  const uid = (()=> Date.now().toString(36) + Math.random().toString(36))()

  const data = await getByHardwareid(hardwareid);

    if (data.status.toLowerCase().includes('storage')) {
      
      const result = await updateSingleData(comments, newOwner, 'IN USE', data.id)
      const log = await updateLogs(uid,previousOwner,previousStatus, 'IN USE',newOwner, comments)
      
      revalidatePath('/','layout')
      revalidatePath('/myhardware','layout')
      redirect(redirectPathname)
    } else{
      revalidatePath('/')
      redirect('/?notAvailable=true+hardwareID=1')
    } 

}


export async function returnItem(formData: FormData){

  const hardwareid = formData.get('dataID') as string
  const comments = formData.get('comments') as string
  const newOwner = formData.get('newOwner') as string
  const previousOwner = formData.get('previousOwner') as string
  const previousStatus = formData.get('previousStatus') as string
  const pathname = formData.get('pathname') as string
  const redirectPathname = `${pathname}?success=true&successType=return`

  const newStatus = 'RETURNED'

  const uid = (()=> Date.now().toString(36) + Math.random().toString(36))()

  const data = await getByHardwareid(hardwareid);
  
    if (data.status.toLowerCase().includes('use')&&(data.owner.includes(newOwner))) {
      const result = await updateSingleData(comments, newOwner, newStatus, data.id)
      const log = await updateLogs(uid,previousOwner,previousStatus, newStatus ,newOwner, comments)
      revalidatePath(pathname)
      redirect(redirectPathname)
    } else{
      revalidatePath('/')
      redirect('/?notAvailable=true+hardwareID=1')
    }
}

export async function acknowledge(formData: FormData){

  const hardwareid = formData.get('dataID') as string
  const comments: string = String(formData.get('comments'))
  const newOwner: string = String(formData.get('newOwner'))

  const uid = (()=> Date.now().toString(36) + Math.random().toString(36))()

  const newStatus = 'IN STORAGE'

  const data = await getByHardwareid(hardwareid);
  
    if (data.status.includes('RETURNED')) {
      const result = await updateSingleData(comments, newOwner, newStatus, data.id)
      const log = await updateLogs(uid,data.owner,data.status, newStatus ,newOwner, comments)
      revalidatePath('/')
      revalidatePath('/returned-hardware')
      redirect('/returned-hardware')
    } else{
      revalidatePath('/')
      revalidatePath('/returned-hardware')
      redirect('/?notAvailable=true+hardwareID=1')
    }
}

export async function changeOwner(formData: FormData){

  const hardwareid = formData.get('dataID') as string
  const comments = formData.get('comments') as string
  const newOwner = formData.get('newOwner') as string
  const previousOwner = formData.get('previousOwner') as string
  const pathname = formData.get('pathname') as string
  const redirectPathname = `${pathname}?success=true&successType=changeOwner`

  const uid = (()=> Date.now().toString(36) + Math.random().toString(36))()

  const data = await getByHardwareid(hardwareid);

  const newStatus = 'IN USE'
  
  if (data.status.includes('USE')&&(data.owner===previousOwner)) {
    const result = await updateSingleData(comments, newOwner, newStatus, data.id)
    const log = await updateLogs(uid,data.owner,data.status, newStatus ,newOwner, comments)
    revalidatePath(pathname)
    redirect(redirectPathname)
  } else{
    revalidatePath(pathname)
    redirect(`${pathname}?notAvailable=true+hardwareID=1`)
  }
}


export async function borrowCart(formData: FormData){
  
  const comments = formData.get('comments') as string
  const newOwner= formData.get('userFullname') as string
  const currentPath = formData.get('pathname') as string
  const userID = Number(formData.get('userID'))

  const redirectPathname = `${currentPath}?success=true&successType=borrow`

  const uid = (()=> Date.now().toString(36) + Math.random().toString(36))()

  const data = await getCartDataByUserid(userID);

  const availData = data.filter((harware) => harware.status === 'IN STORAGE')

  const userInput = [comments,newOwner,'IN USE']

  let hardwareIdArray = []
  let cartItemforDelete = []

  for (let item of availData){
    hardwareIdArray.push(item.hardwareid)
    cartItemforDelete.push(item.cartid)
  }
  
  if (!availData.length){
    revalidatePath('/')
    redirect('/?notAvailable=true+hardwareID=1')
  }

  try{
    const resultUpdate = await updateMultipleHardware(userInput,hardwareIdArray)
  } catch (err) {
    console.error("error updating multple hardware data in db")
    throw error
  }

  try{
    const resultDelete = await deleteMultipleCartData(cartItemforDelete)
  }catch(err){
    console.error("error deleting multplie cart data in db")
    throw error;
  }
      
     // const log = await updateLogs(uid,previousOwner,previousStatus, 'IN USE',newOwner, comments)
     revalidatePath('/','layout')
     redirect(redirectPathname)
/*     } else{
      revalidatePath('/')
      redirect('/?notAvailable=true+hardwareID=1')
    }  */

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

    //await modifySheetData(data,true)
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

/*   const currentDate = month + "/" + date + "/" + year + " " + hours + ":" +  minutes;

  const sheetData: any = await getSheetsData('MasterList!A1:A', false)

  const dataID = sheetData[1].length
  const inUseDuration: string = `=NOW()-L${dataID+1}`

  const data:string[] = [String(dataID),hardwareID,pSpecs,type,generic,devicePackage,leadCount,description,status,comments,owner,currentDate,inUseDuration,qtyRequest,supplier,supplierPartNumber,requestor,typeAcronym,barcode,serialNumber,withTag,focusTeam]
 */
  // await modifySheetData(data,false)
  revalidatePath('/')
  redirect('/') 
}

export async function notAvail(formData: FormData){

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function returnAllItems(formData: FormData){
  
  const userFullname = formData.get("user") as string
  const comments = String(formData.get('comments')).replace(/[\r\n]+/gm, " ");

  const data = await getHardwareByOwner(userFullname)

  const filteredData = data.filter((item) => item.status ==="IN USE")
  
  if (filteredData.length === 0){
    return
  }

  const info = [comments,userFullname,'RETURNED']
  let hardwareIdArray = []
  for (let item of filteredData){
    hardwareIdArray.push(item.hardwareid)
  }
  
  const result = await updateMultipleHardware(info,hardwareIdArray)

  revalidatePath('/')
  revalidatePath('/myhardware')
}