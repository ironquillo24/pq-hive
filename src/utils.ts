'use server'
import { google } from 'googleapis'

export const getSheetsData = async (searchRange: string, isKeyword: boolean): Promise<string[][] | Error | undefined> =>{

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
  try{
    let responseConcat: any;
    if (isKeyword) {
      responseConcat = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "MasterListConcat!A1:B"
      }) 
    } 

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: searchRange //"MasterList!A1:M"
    })
   return [(responseConcat? responseConcat.data.values : []), response.data.values];

  } catch (err: unknown) {
    console.error("Error Fetching Sheets Data", err)
    //throw err
  }

} 

export const postSheetData = async (
  postRange: string, comments: string, newOwner: string, newStatus: string, currentDate: string, logID: string, previousOwner: string, previousStatus: string) =>{

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
      range: postRange, //MasterList!
      /* insertDataOption: 'INSERT_ROWS', */
      valueInputOption: 'RAW',
      requestBody: {

        values:[
          [newStatus, comments, newOwner, currentDate]
        ]
      }
    })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Logs!A1:A', //MasterList!
      insertDataOption: 'INSERT_ROWS', 
      valueInputOption: 'RAW',
      requestBody: {

        values:[
          [logID, previousOwner, previousStatus, newStatus, newOwner, currentDate, comments]
        ]
      }
    })
    
  } catch (err) {
    console.error("Error Writing Sheets Data", err)
    return []
  }

}

export const modifySheetData = async (data: (string | null)[], isModify: boolean) =>{

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
  const dataID: number = Number(data[0])
  const postRange = `MasterList!A${dataID+1}:V${dataID+1}`

  try {
    if (isModify){
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: postRange, //MasterList!
        /* insertDataOption: 'INSERT_ROWS', */
        valueInputOption: 'USER_ENTERED',
        requestBody: {
  
          values:[
            data
          ]
        }
      })
    } else {

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'MasterList!A1:V', //MasterList!
         insertDataOption: 'INSERT_ROWS', 
        valueInputOption: 'USER_ENTERED',
        requestBody: {
  
          values:[
            data
          ]
        }
      })
  
    }
    
  } catch (err) {
    console.error("Error Writing Sheets Data", err)
    return []
  }

}

export const modifyUserData = async (data: (string | null)[], isModify: boolean) =>{

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
  const dataID: number = Number(data[0])
  const postRange = `UserData!A${dataID+1}:K${dataID+1}`

  try {
    if (isModify){
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: postRange, //MasterList!
        /* insertDataOption: 'INSERT_ROWS', */
        valueInputOption: 'USER_ENTERED',
        requestBody: {
  
          values:[
            data
          ]
        }
      })
    } else {

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'UserData!A1:K', 
         insertDataOption: 'INSERT_ROWS', 
        valueInputOption: 'USER_ENTERED',
        requestBody: {
  
          values:[
            data
          ]
        }
      })
  
    }
    
  } catch (err) {
    console.error("Error Writing Sheets Data", err)
    return []
  }

}

export const filterData = (data: any, searchWord: string) => {

  let searchedData = [];

  searchWord = searchWord.toLowerCase();

  for (const row of data[0]){
    
    const desc = row[1].toLowerCase();

    if (desc.includes(searchWord)){
      
      searchedData.push(data[1][Number(row[0])])
    }
  }
  return searchedData;
}
