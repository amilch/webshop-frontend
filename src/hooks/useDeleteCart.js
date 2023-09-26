import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";
import { moneyToInt } from "../utils"

export default function useDeleteCart() {
  const queryClient = useQueryClient()
  const { authAxios } = useContext(AxiosContext)

  return useMutation({
    mutationFn: () =>
      authAxios.delete('/cart/cart'),
    onSuccess: () => queryClient.refetchQueries({ queryKey: ['cart'] })
  })
}
