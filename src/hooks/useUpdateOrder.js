import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";

export default function useUpdateOrder() {
  const queryClient = useQueryClient()
  const { authAxios } = useContext(AxiosContext)

  return useMutation({
    mutationFn: ({ order }) =>
      authAxios.patch('/billing/orders', order),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] })
  })
}
