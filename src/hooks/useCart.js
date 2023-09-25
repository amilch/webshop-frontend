import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";

export default function useCart() {
  const { authAxios  } = useContext(AxiosContext)

  return useQuery(['cart'], () =>
    authAxios.get('/cart/cart').then((res) => res.data.data)
  )
}
