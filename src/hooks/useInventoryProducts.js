import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";

export default function useInventoryProducts() {
  const { authAxios } = useContext(AxiosContext)
  return useQuery(['inventoryProducts'], () =>
    authAxios.get('/inventory/products')
      .then((res) => res.data.data)
  )
}
