import { ChakraProvider, Container, Text } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, RootRoute, Route, Router, RouterProvider } from '@tanstack/react-router';
import { WebStorageStateStore } from 'oidc-client-ts';
import { useEffect, useState } from 'react';
import { AuthProvider, hasAuthParams, useAuth } from 'react-oidc-context';

import Header from './components/Header';
import { AxiosProvider } from './contexts/AxiosContext';
import { UUIDProvider } from './contexts/UUIDContext';
import Backend from './pages/Backend';
import Catalog from './pages/Catalog';
import Checkout from './pages/Checkout';
import theme from './theme';

const oidcConfig = {
  authority: "http://auth.webshop.local/realms/webshop",
  client_id: "webshop",
  redirect_uri: "http://webshop.local/",
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  onSigninCallback: () => window.history.replaceState(
    {}, document.title, window.location.pathname),
}

const queryClient = new QueryClient()

const rootRoute = new RootRoute({
  component: () => (
    <>
      <Header />
      <Container maxW='container.lg' p={0}>
        <Outlet />
      </Container>
    </>
  ),
})

const catalogRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Catalog
})

const backendRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/backend',
  component: () => {
    const auth = useAuth()
    return (
      <>
      {auth.isAuthenticated && auth.user?.profile.client_roles.includes('admin') &&
       <Backend /> || <Text>Du hast keine Berechtigung für den Backend Bereich.</Text>}
      </>
    )},
})

const checkoutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: Checkout
})

const routeTree = rootRoute.addChildren([
  catalogRoute,
  backendRoute,
  checkoutRoute,
])
const router = new Router({ routeTree })

function App() {

  return (
    <>
      <UUIDProvider>
        <AuthProvider {...oidcConfig}>
          <AxiosProvider>
            <QueryClientProvider client={queryClient}>
              <ChakraProvider theme={theme}>
                <RouterProvider router={router} />
              </ChakraProvider>
            </QueryClientProvider>
          </AxiosProvider>
        </AuthProvider>
      </UUIDProvider>
    </>
  )
}



export default App

