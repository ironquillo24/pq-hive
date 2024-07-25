'use server'
import mysql from 'mysql2'
import { Data, User } from './dbSchema';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import defaultData from './defaultData';
import { error } from 'console';

type error = {error: string}
const getErrorMessage = (error: unknown): string => {
  let message: string

  if (error instanceof Error){
    message = error.message
  } else if (error && typeof error ==="object" && "message" in error){
    message = String(error.message)
  }else if (typeof error === 'string'){
    message = error;
  } else {
    message = "Something went wrong"
  }

  return message
}

export async function getData(withTags: boolean): Promise<Data[] | error>{

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()
  
  let result;
  try{

    if (withTags){
     result = await pool.query("SELECT *, CONCAT(hardwareid,pspec,type,generic,package,description,status,owner,supplier) AS tags, DATEDIFF(NOW(),datemodified) as inUseDuration  from masterlist;")
    } else {
       result = await pool.query("SELECT * from masterlist;")
    }
    
    const data = result[0] as Data[]
    
    return data
  
  } catch (err: unknown) {
    return {
      error: getErrorMessage(err)
    }
  } finally{
    pool.end()
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

export async function getHardwareByOwner(owner: string){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()
  
  try{
    const result = await pool.query(`SELECT hardwareid, owner, status from masterlist WHERE owner = ?`, owner)
    pool.end()
    const data = result[0] as Data[]

    return data
  
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
    return {
      error: getErrorMessage(err)
    }
  } finally{
    pool.end()
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

export async function updateLogs(logid: string, previousOwner: string, previousStatus: string, newStatus: string, newOwner: string, comments: string, hardwareid_pk: number){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  try{
    const result = await pool.query(
      `INSERT INTO log_schema (logid,previousOwner,previousStatus,newStatus,newOwner,comments,hardwareid_pk) VALUES (?,?,?,?,?,?,?)`,
      [logid,previousOwner,previousStatus,newStatus,newOwner,comments,hardwareid_pk]
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

export async function getUserByUsername(username: string): Promise<User | error>{

    const pool= mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    }).promise()

  try{
    const result = await pool.query(`SELECT *,CONCAT(givenname,' ',lastname) AS fullname FROM user_schema where username = ?;`, username)
    
    const data = result[0] as User[]
    
    return data[0]
  
  } catch (err: unknown) {
    return {
      error: getErrorMessage(err)
    }
  } finally {
    pool.end()
  } 
}

export interface CartData{
  cartid: string,
  id: number,
  hardwareid: string,
  pspec: string,
  type: string,
  status:string,
  owner: string
  description: string,
  comment: string,
  fullname: string
}
export async function getCartDataByUserid(userid: number){
  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  try{
    const result = await pool.query(`SELECT 
    cart_logs.cartid as cartid,
    masterlist.id as id, 
    masterlist.hardwareid as hardwareid,
    masterlist.pspec as pspec, 
    masterlist.type as type,
    masterlist.status as status,
    masterlist.owner as owner,
    masterlist.description as description,
    masterlist.comments as comment, CONCAT(user_schema.givenname, ' ',user_schema.lastname) as fullname
    FROM cart_logs
    INNER JOIN masterlist
    ON cart_logs.hardwarenum = masterlist.id
    INNER JOIN user_schema
    ON cart_logs.userid = user_schema.id
    WHERE cart_logs.userid = ?
    ORDER BY creationdate;`, userid)
    pool.end()
    
    const data = result[0] as CartData[]
    return data
  
  } catch (err) {
    console.error("Error fetching cart data")
    throw err;
  }

}

export async function updateMultipleHardware(userInput: string[/*comments,owner,status*/],hardwareIdArray: string[]){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  let idQueryConstruct = ""

  for(let i = 0; i < hardwareIdArray.length ; i++) {
    idQueryConstruct += "hardwareid = ?"
    if (i !== hardwareIdArray.length-1)
      idQueryConstruct += " OR "
  }

  const dataToUpdate = userInput.concat(hardwareIdArray)

  try{
    const result = await pool.query(
      `UPDATE masterlist SET comments = ?, owner = ?, status = ? WHERE ${idQueryConstruct};`, dataToUpdate  )
    pool.end()

  } catch (err){

    console.error("Error updating multiple data in db")
    throw err;
  }
}

export async function deleteMultipleCartData(cartIdArray: string[]){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  let idQueryConstruct = ""

  for(let i = 0; i < cartIdArray.length ; i++) {
    idQueryConstruct += "cartid = ?"
    if (i !== cartIdArray.length-1)
      idQueryConstruct += " OR "
  }

  try{
    const result = await pool.query(
      `DELETE FROM cart_logs WHERE ${idQueryConstruct};`, cartIdArray)
    pool.end()

  } catch (err){

    console.error("Error deleting multiple data in db")
    throw err;
  }
}

export async function updateCartLogs(data: number[/*hardwarenum,userid*/]){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  const uid = (()=> Date.now().toString(36) + Math.random().toString(36))()
  
    return pool.query(
      `INSERT INTO cart_logs (cartid,hardwarenum,userid) VALUES (?,?,?);`,
      [uid,data[0],data[1]]
    ).then(() => pool.end())
    
}

export async function deleteCartData(cartid: string){

  
  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  return pool.query(
    `DELETE FROM cart_logs WHERE cartid = ?;`,
    cartid
  ).then(() => pool.end())

}

export async function editHardwareByID(data: any[]){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  try{
    const result = await pool.query(
      `UPDATE masterlist SET
        hardwareid = ?,
        pspec = ?,
        type =?,
        generic =?,
        package =?,
        leadcount =?,
        description =?,
        status =?,
        comments =?,
        owner =?,
        qtyRequest =?,
        supplier =?,
        supplierPartNumber =?,
        requestor =?,
        typeAcronym =?,
        barcode =?,
        serialNumber=?,
        withTag =?,
        focusteam=?
        WHERE id = ?;`
      ,data)
    pool.end()

  } catch (err){

          console.error("Error deleting multiple data in db")
    throw err;
  }
}

export async function addHardware(data: any[]){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  try{
    const result = await pool.query(
      `INSERT INTO masterlist
      (
        hardwareid,
        pspec,
        type,
        generic,
        package,
        leadcount,
        description,
        status,
        comments,
        owner,
        qtyRequest,
        supplier,
        supplierPartNumber,
        requestor,
        typeAcronym,
        barcode,
        serialNumber,
        withTag,
        focusteam
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
      ,data)
    pool.end()

  } catch (err){

          console.error("Error deleting multiple data in db")
    throw err;
  }
}

export async function changePasswordByID(id: number,password: string){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  const data = [password,id]

  try{
    const result = await pool.query(
      `UPDATE user_schema SET password = ? WHERE id = ?;`,data)
      
  } catch (err){
    return {
      error: getErrorMessage(err)
    }
  } finally {
    pool.end()
  }

}

export interface userEmployeeID{
  employeeid: string
  fullname: string
}

export async function getAllUserEmployeeID(){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  try{
    const result = await pool.query(`SELECT employeeid,CONCAT(givenname,' ',lastname) AS fullname FROM user_schema;`)
    pool.end()
    
    const data = result[0] as userEmployeeID[]

    return data
  
  } catch (err) {
    console.error("Error posting data to db")
    throw err;
  }
}

export async function insertMultipleLogs(data: (string | number)[]){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  let valueConstruct = ""

  for(let i = 0; i < data.length/7 ; i++) {
    valueConstruct += "(?,?,?,?,?,?,?)"
    if (i !== (data.length/7)-1)
      valueConstruct += ","
  }

  try{
    const result = await pool.query(
      `INSERT INTO log_schema 
        (logid,previousOwner,previousStatus,newStatus,newOwner,comments,hardwareid_pk)
        VALUES ${valueConstruct};`, data
      /* [logid,previousOwner,previousStatus,newStatus,newOwner,comments] */
    )
    pool.end()
    
    return result[0] as ResultSetHeader
  
  } catch (err) {
    console.error("Error posting data to db")
    throw err;
  }
}

export async function registerUser(data: any[]){

  const pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  try{
    const result = await pool.query(
      `INSERT INTO user_schema
        (employeeid,lastname,givenname,email,team,nickname,username,password)
        VALUES (?,?,?,?,?,?,?,?);`, data)
    pool.end()
    
    return result[0] as ResultSetHeader
  
  } catch (err) {
    console.error("Error posting data to db")
    throw err;
  }
}
