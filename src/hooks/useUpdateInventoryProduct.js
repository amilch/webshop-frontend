import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";

export default function useUpdateInventoryProduct() {
  const queryClient = useQueryClient()
  const { authAxios } = useContext(AxiosContext)

  return useMutation({
    mutationFn: ({ product }) =>
      authAxios.post('/warehouse/products', product),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['warehouseProducts'] })
  })
}
