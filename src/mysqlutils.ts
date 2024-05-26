'use server'
import mysql from 'mysql2'
import {Data, User} from "@/dbSchema";
import { ResultSetHeader, RowDataPacket } from 'mysql2';

import {createPool, FieldPacket, Pool} from 'mysql2/promise';
import defaultData from './defaultData';

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
     result = await pool.query("SELECT *, CONCAT(hardwareid,pspec,type,generic,package,description,status,owner,supplier) AS tags, DATEDIFF(NOW(),datemodified) as inUseDuration  from masterlist;")
    } else {
       result = await pool.query("SELECT * from masterlist;")
    }
    pool.end()
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
    const result = await pool.query(`SELECT *,DATEDIFF(NOW(),datemodified) as inUseDuration from masterlist WHERE hardwareid = ?`, hardwareID)
    pool.end()
    const data = result[0] as Data[]


    if (data[0] === undefined){
      return defaultData
    }
    
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
    pool.end()

    const data = result[0] as MaintanaceData[]
    
    return data
  
  } catch (err) {
    console.error("Error fetching data from db")
    throw err;
  }
}

export async function updateMaintenanceData(status: boolean){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()
  
  try{
    const result = await pool.query("Update maintenance_table SET flag=? where id=1;", status)
    pool.end()
    
    return result[0] as ResultSetHeader
  
  } catch (err) {
    console.error("Error updating maintenance in db")
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
    pool.end()
    
    return result[0] as ResultSetHeader
  
  } catch (err) {
    console.error("Error updating single data to db")
    throw err;
  }
}

export async function updateLogs(logid: string, previousOwner: string, previousStatus: string, newStatus: string, newOwner: string, comments: string){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  try{
    const result = await pool.query(
      `INSERT INTO log_schema (logid,previousOwner,previousStatus,newStatus,newOwner,comments) VALUES (?,?,?,?,?,?)`,
      [logid,previousOwner,previousStatus,newStatus,newOwner,comments]
    )
    pool.end()
    
    return result[0] as ResultSetHeader
  
  } catch (err) {
    console.error("Error posting data to db")
    throw err;
  }
}

export interface usersFullname{
  fullname: string
}
export async function getAllFullNames(){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  try{
    const result = await pool.query(`SELECT CONCAT(givenname,' ',lastname) AS fullname FROM user_schema;`)
    pool.end()
    
    const data = result[0] as usersFullname[]
    
    return data
  
  } catch (err) {
    console.error("Error posting data to db")
    throw err;
  }
}

export async function getUserByUsername(username: string){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  try{
    const result = await pool.query(`SELECT *,CONCAT(givenname,' ',lastname) AS fullname FROM user_schema where username = ?;`, username)
    pool.end()
    
    const data = result[0] as User[]
    
    return data[0]
  
  } catch (err) {
    console.error("Error posting data to db")
    throw err;
  }
}