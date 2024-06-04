'use client'
import { getByHardwareid, getAllFullNames, getCartDataByUserid } from "@/mysqlutils";
import { useQuery, useQueries } from "@tanstack/react-query";
import { getSession } from "@/logActions";
import { Data } from "./dbSchema";

async function getSessionFullName(){
  const session = await getSession()
  return session.fullName as string
}

export function useGetDataById(hardwareID: string, pathType: string, isEnabled: boolean){

  
  return useQuery({
    queryFn: async () => getByHardwareid(hardwareID),
    queryKey: [hardwareID,pathType],
    enabled: (hardwareID != '')&&isEnabled
  })
}

export function useGetCurrentUser(){

  return useQuery({
    queryFn: async () => getSession(),
    queryKey: ['userdata']
  })
}

export function useGetHardwareAndUser(hardwareID: string, pathType: string, enableQuery: boolean, isGetAllUsers: boolean){

  const isEnabled = (hardwareID!=='')&&enableQuery
  return useQueries({
    queries: [
      {queryKey: [hardwareID,pathType], queryFn: async () => getByHardwareid(hardwareID), enabled: isEnabled},
      {queryKey:['userFullname'], queryFn: async () => getSessionFullName(), enabled: isEnabled},
      {queryKey:['allUsers'], queryFn: async() => getAllFullNames(), enabled: isGetAllUsers&&isEnabled}
    ],
  })
}

export function useGetAllUserFullnames(isEnabled: boolean){

  return useQuery({
    queryFn: async () => getAllFullNames(), 
    queryKey: ['allUsers'],
    enabled: isEnabled,
  })
}

export function useGetCartData(){

  const {data: user} = useGetCurrentUser()
  const userid = user?.userID
  const getData = userid? true : false
  
  return useQuery({
    queryKey: ['cart',userid],
    queryFn: async () => getCartDataByUserid(userid!),
    enabled: getData
  })
}