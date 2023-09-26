import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";

export default function useCreateOrder() {
  const queryClient = useQueryClient()
  const { publicAxios } = useContext(AxiosContext)

  return useMutation({
    mutationFn: ({ order }) =>
      publicAxios.post('/billing/orders', order),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] })
  })
}
