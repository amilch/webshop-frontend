import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { useSearch } from "@tanstack/react-router"
import ProductList from "../components/ProductList"
import CategoryList from "../components/CategoryList"
import useProducts from '../hooks/useProducts';

export default function Catalog() {
  const search = useSearch()
  const { data: products } = useProducts(search)

  return (
    <Grid templateColumns='repeat(5,1fr)' py={[0, 10, 20]} gap={8}>
      <GridItem colSpan={1}>
        <CategoryList />
      </GridItem>
      <GridItem colSpan={4}>
          <ProductList products={products} /> 
       </GridItem>
     </Grid>
  )
}
