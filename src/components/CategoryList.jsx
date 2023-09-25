import { Link as RouterLink, useMatch, useSearch } from "@tanstack/react-router"
import useCategories from "../hooks/useCategories"
import { List, ListItem, Link } from "@chakra-ui/react"

export default function CategoriesList() {
  const { data: categories } = useCategories()
  const search = useSearch()

  return (
    <>
      <List spacing={1}>
        <ListItem>
          <Link as={RouterLink} to="/"
            fontWeight={() => search.category_id == null && 'bold'}
          >
            Alle Produkte
          </Link>
        </ListItem>
        {categories?.map((category) => (
          <ListItem key={category.id}>
            <Link as={RouterLink} search={{ category_id: category.id }}
              fontWeight={() => search.category_id == category.id && 'bold'}>
              {category.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  )
}
