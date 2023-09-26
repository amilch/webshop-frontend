import { Grid, GridItem, Link, List, ListItem } from '@chakra-ui/react';
import { Outlet, Link as RouterLink } from '@tanstack/react-router';
import { useAuth } from 'react-oidc-context';

export default function Backend() {
  const auth = useAuth()

  const links = [
    { name: 'Catalog', path: '/backend/catalog' },
    { name: 'Warehouse', path: '/backend/warehouse' },
    { name: 'Billing', path: '/backend/billing' },
  ]

  return (
    <>
      {auth.isAuthenticated && auth.user?.profile.client_roles.includes('admin')
        && <Grid templateColumns='repeat(5,1fr)' py={[0, 10, 20]} gap={8}>
          <GridItem colSpan={1}>
            <List spacing={1}>
              {links?.map((link) => (
                <ListItem key={link.name}>
                  <Link as={RouterLink} to={link.path}
                    activeProps={{ style: { fontWeight: 'bold' } }}>
                    {link.name}
                  </Link>
                </ListItem>
              ))}
            </List>
          </GridItem>
          <GridItem colSpan={4}>
            <Outlet />
          </GridItem>
        </Grid>
        || <Text>Du hast keine Berechtigung für den Backend Bereich.</Text>}
    </>
  )
}
