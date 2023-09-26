import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";
import { useAuth } from "react-oidc-context";

export default function useCart() {
  const auth = useAuth()
  const { authAxios } = useContext(AxiosContext)
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['cart', auth],
    queryFn: () =>
      authAxios.get('/cart/cart').then((res) => res.data.data)
  })
}
