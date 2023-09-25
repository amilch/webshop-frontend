import { VStack, HStack, Divider, Heading, SimpleGrid, Text } from '@chakra-ui/react'

export default function CheckoutCart() {
  return (
    <VStack w='full' h='full' p={10} spacing={10} alignItems='flex-start' bg='gray.50'>
      <Heading size='2xl'>Dein Warenkorb</Heading>
    <HStack spacing={6} justifyContent='space-between' alignItems="stretch" w="full">
      <HStack>
      <Heading size="md" mr={2}>1</Heading>
      <Heading size="md">Produktname</Heading>
      </HStack>
        <Heading size="sm">40.00 €</Heading>

    </HStack>
    <VStack spacing={4} alignItems="stretch" w="full">
        <HStack justifyContent="space-between">
            <Text color='secondaryText'>Subtotal</Text>
            <Heading size="sm">119,00 €</Heading>
        </HStack>
        <HStack justifyContent="space-between">
            <Text color='secondaryText'>Versand</Text>
            <Heading size="sm">4,50 €</Heading>
            </HStack>
        </VStack>
        <Divider />
        <HStack justifyContent="space-between" w="full">
            <Text color='secondaryText'>Gesamtsumme</Text>
            <Heading size="lg">204,50 €</Heading>
        </HStack>
        </VStack>
  )
}
