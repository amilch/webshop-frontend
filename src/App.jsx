import { ChakraProvider, Container, Text } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, RootRoute, Route, Router, RouterProvider } from '@tanstack/react-router';
import { WebStorageStateStore } from 'oidc-client-ts';
import { useEffect, useState } from 'react';
import { AuthProvider, hasAuthParams, useAuth } from 'react-oidc-context';

import { AxiosProvider } from './contexts/AxiosContext';
import { UUIDProvider } from './contexts/UUIDContext';
import Root from './pages/Root';
import Backend from './pages/Backend';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import theme from './theme';
import BackendCatalog from './pages/backend/Catalog';
import BackendWarehouse from './pages/backend/Warehouse';
import BackendBilling from './pages/backend/Billing';

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
  component: Root
})

const catalogRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Catalog
})

const cartRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: Cart,
})

const checkoutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: Checkout
})

const backendRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/backend',
  component: Backend,
})

const backendCatalogRoute = new Route({
  getParentRoute: () => backendRoute,
  path: '/catalog',
  component: BackendCatalog,
})

const backendWarehouseRoute = new Route({
  getParentRoute: () => backendRoute,
  path: '/warehouse',
  component: BackendWarehouse,
})

const backendBillingRoute = new Route({
  getParentRoute: () => backendRoute,
  path: '/billing',
  component: BackendBilling,
})

const routeTree = rootRoute.addChildren([
  catalogRoute,
  cartRoute,
  checkoutRoute,
  backendRoute.addChildren([
    backendCatalogRoute,
    backendWarehouseRoute,
    backendBillingRoute,
  ]),
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
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </AxiosProvider>
        </AuthProvider>
      </UUIDProvider>
    </>
  )
}



export default App

