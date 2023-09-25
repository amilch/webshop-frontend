import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";

export default function useProducts(query) {
  const { publicAxios } = useContext(AxiosContext)
  return useQuery(['products', query], () =>
    publicAxios.get('/catalog/products', {params: query})
      .then((res) => res.data.data)
  )
}
