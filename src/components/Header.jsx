import { Box, Container, HStack, Link as ChakraLink } from "@chakra-ui/react";
import { useAuth } from "react-oidc-context";
import { Link as RouterLink, useNavigate } from "@tanstack/react-router";

import useCart from "../hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const queryClient = useQueryClient()
  const auth = useAuth()
  const { data: cart } = useCart()

  const NavItem = (props) => (
    <ChakraLink
      as={RouterLink}
      fontSize='lg'
      activeProps={{ style: { fontWeight: 'bold' } }}
      {...props}>{props.name}</ChakraLink>)

  const cartSize = cart?.items.length > 0 ? ` (${cart?.items.length})` : ''

  return (
    <Box p={4} bg='gray.50' py={6}>
      <HStack spacing={8} justify='center'>
        <NavItem name='Katalog' to='/' />
        <NavItem name={`Warenkorb${cartSize}`} to='/cart' />
        {auth.isAuthenticated
          && <NavItem name='Abmelden' onClick={() => {
            auth.removeUser()
          }} />
          || <NavItem name='Anmelden' onClick={() => {
            auth.signinRedirect()
          }} />}
        {auth.isAuthenticated && auth.user?.profile.client_roles.includes('admin')
          && <NavItem name='Backend' to='/backend' />}
      </HStack>
    </Box>
  )
}
