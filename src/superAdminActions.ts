'use server'
import { google } from "googleapis";
import { revalidatePath } from "next/cache";

export async function dbMaintenance(formData:FormData){

  const isMaintainingString = formData.get('isMaintaining') as string
  const isMaintaining = isMaintainingString === 'true'

  if (!isMaintaining){
    await updateMaintenance('Maintenance')
    revalidatePath('/super-admin')
  } else {
    await updateMaintenance('Item')
    revalidatePath('/super-admin')
  }

}

const updateMaintenance = async (data:string) =>{

  const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
  const jwt = new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    undefined,
    // we need to replace the escaped newline characters
    // https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
    process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes
  );

  const sheets = google.sheets({ version: "v4", auth: jwt });

  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'MasterList!A1:A1',
      valueInputOption: 'RAW',
      requestBody: {

        values:[
          [data]
        ]
      }
    })
    return 'success'
    
  } catch (err) {
    console.error("Error Writing Sheets Data", err)
    return 'fail'
  }

}