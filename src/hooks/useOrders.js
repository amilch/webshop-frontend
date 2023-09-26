import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";

export default function useOrders() {
  const { authAxios } = useContext(AxiosContext)
  return useQuery(['orders'], () =>
    authAxios.get('/billing/orders')
      .then((res) => res.data.data)
  )
}
