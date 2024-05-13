'use client'
import { getByHardwareid, getAllUsers } from "@/mysqlutils";
import { useQuery, useQueries } from "@tanstack/react-query";
import { getSession } from "@/logActions";

export function useGetDataById(hardwareID: string, pathType: string){

  return useQuery({
    queryFn: async () => getByHardwareid(hardwareID),
    queryKey: [hardwareID,pathType],
    enabled: hardwareID != ''
  })
}

export function useGetCurrentUser(){

  return useQuery({
    queryFn: async () => getSession(),
    queryKey: ['userdata']
  })
}

export function useGetHardwareAndUser(hardwareID: string, pathType: string, isGetAllUsers: boolean){

  return useQueries({
    queries: [
      {queryKey: [hardwareID,pathType], queryFn: async () => getByHardwareid(hardwareID)},
      {queryKey:['user'], queryFn: async () => getSession()},
      {queryKey:['allUsers'], queryFn: async() => getAllUsers(), enabled: isGetAllUsers}
    ],
  })
}