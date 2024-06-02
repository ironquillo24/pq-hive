import { useMutation,useQueryClient } from "@tanstack/react-query"
import { updateCartLogs, deleteCartData } from "./mysqlutils"

export function useAddtoCart(){

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCartLogs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

}

export function useRemoveFromCart(){

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCartData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

}

