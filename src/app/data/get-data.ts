'use client'
import { getByHardwareid } from "@/mysqlutils";
import { useQuery } from "@tanstack/react-query";

export function useGetDataById(hardwareID: string){

  return useQuery({
    queryFn: async () => getByHardwareid(hardwareID),
    queryKey: [hardwareID],
    enabled: hardwareID != ''
  })
}