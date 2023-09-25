import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProduct(id) {
  const query = {
    id: id
  }
  return useQuery(['products', query], () =>
    axios.get('/api/v1/catalog/products', {params: query})
      .then((res) => res.data.data?.[0])
  )
}
