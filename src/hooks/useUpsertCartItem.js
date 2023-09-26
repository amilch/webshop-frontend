import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";
import { moneyToInt } from "../utils"

export default function useUpsertCartItem() {
  const queryClient = useQueryClient()
  const { authAxios } = useContext(AxiosContext)

  return useMutation({
    mutationFn: ({ cartItem }) =>
      authAxios.put('/cart/cart/item', {
        ...cartItem,
        price: moneyToInt(cartItem.price),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  })
}
