import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";

export default function useCategories() {
  const { publicAxios } = useContext(AxiosContext)
  return useQuery(['categories'], () =>
    publicAxios.get('/catalog/categories').then((res) => res.data.data)
  )
}
