import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";

export default function useUpdateCartItem() {
  const queryClient = useQueryClient()
  const { authAxios } = useContext(AxiosContext)

  return useMutation({
    mutationFn: ({ cartItem }) =>
      authAxios.post('/cart/cart/item', cartItem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  })
}
