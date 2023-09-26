import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";

export default function useWarehouseProducts() {
  const { authAxios } = useContext(AxiosContext)
  return useQuery(['warehouseProducts'], () =>
    authAxios.get('/warehouse/products')
      .then((res) => res.data.data)
  )
}
