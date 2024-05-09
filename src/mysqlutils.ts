import mysql from 'mysql2'
import Data from "@/dbSchema";
import { ResultSetHeader } from 'mysql2';



export async function getData(withTags: boolean){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()
  
  try{
    let result;
    if (withTags){
     result = await pool.query("SELECT *, CONCAT(hardwareid,pspec,type,generic,package,description,status,owner,supplier) AS tags, DATEDIFF(datemodified,NOW()) as inUseDuration  from masterlist;")
    } else {
       result = await pool.query("SELECT * from masterlist;")
    }

    const data = result[0] as Data[]
    
    return data
  
  } catch (err) {
    console.error("Error fetching data from db")
    throw err;
  }

}

export async function getByHardwareid(hardwareID: string){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()
  
  try{
    const result = await pool.query(`SELECT *,DATEDIFF(datemodified,NOW()) as inUseDuration from masterlist WHERE hardwareid = ?`, hardwareID)

    const data = result[0] as Data[]
    
    return data[0]
  
  } catch (err) {
    console.error("Error fetching data from db")
    throw err;
  }

}

interface MaintanaceData {
  id: number,
  maintenanceType: string,
  flag: boolean
}

export async function getMaintenanceData(){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()
  
  try{
    const result = await pool.query("SELECT * from maintenance_table;")

    const data = result[0] as MaintanaceData[]
    
    return data
  
  } catch (err) {
    console.error("Error fetching data from db")
    throw err;
  }
}


export async function updateSingleData(comments: string, owner: string, status: string, id: number){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()
  
  try{
    const result = await pool.query(`UPDATE masterlist SET comments = ?, owner = ?, status = ? WHERE id = ?`, [comments, owner, status, id])
    
    return result[0] as ResultSetHeader
  
  } catch (err) {
    console.error("Error fetching data from db")
    throw err;
  }
}
