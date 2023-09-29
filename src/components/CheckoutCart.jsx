import { VStack, HStack, Divider, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import useCart from '../hooks/useCart'

export default function CheckoutCart() {
  const { data: cart } = useCart()

  return (
    <VStack w='full' h='full' p={10} spacing={10} alignItems='flex-start' bg='gray.50'>
      <Heading size='2xl'>Deine Bestellung</Heading>
      <VStack spacing={6} w='full'>
      {cart?.items.map(cartItem =>
        <HStack spacing={6} justifyContent='space-between' alignItems="stretch" w="full">
          <HStack>
            <Heading size="sm" mr={1}>{cartItem.quantity}</Heading>
            <Heading size="sm">{cartItem.name}</Heading>
          </HStack>
          <Heading size="sm" style={{ 'white-space': 'nowrap' }}>
            {cartItem.quantity > 1 && `${cartItem.quantity} x `}{cartItem.price} €
          </Heading>
        </HStack>
      )}
      </VStack>
      <VStack spacing={6} w='full'>
      <Divider />
      <HStack justifyContent="space-between" w="full">
        <Text color='secondaryText'>Gesamtsumme</Text>
        <Heading size="lg">{cart?.total}</Heading>
      </HStack></VStack>
    </VStack>
  )
}
