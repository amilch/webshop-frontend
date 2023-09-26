import { Container } from '@chakra-ui/react';
import { Outlet } from '@tanstack/react-router';
import Header from '../components/Header';

export default function Root() {
  return (
    <>
      <Header />
      <Container maxW='container.lg' p={0}>
        <Outlet />
      </Container>
    </>
  )
}
