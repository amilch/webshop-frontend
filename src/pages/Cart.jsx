import { IconButton, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, VStack, HStack, Divider, Heading, SimpleGrid, Text, Container, Box, Center, ButtonGroup } from '@chakra-ui/react'

import useCart from "../hooks/useCart";
import { FiRefreshCw } from 'react-icons/fi'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useState } from 'react';
import useUpsertCartItem from '../hooks/useUpsertCartItem';

export default function Cart() {
  const { data: cart } = useCart()

  const ChangeQuantityForm = ({ cartItem }) => {
    const [quantity, setQuantity] = useState(cartItem.quantity)
    const upsertCartItem = useUpsertCartItem()

    const updateQuantity = () => {
      upsertCartItem.mutate({
        cartItem: {
          ...cartItem,
          quantity: quantity,
        }
      })
    }

    const remove = () => {
      upsertCartItem.mutate({
        cartItem: {
          ...cartItem,
          quantity: 0,
        }
      })
    }

    return (
      <ButtonGroup isAttached>
        <NumberInput min={1} maxW={20} value={quantity} onChange={setQuantity}>
          <NumberInputField borderRightRadius={0} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <IconButton icon={<FiRefreshCw />} borderLeftRadius={0} onClick={updateQuantity} />
        <IconButton colorScheme='red' icon={<FaRegTrashAlt />} onClick={remove} />
      </ButtonGroup>
    )
  }

  return (
    <Container maxW='container.md'>
      <VStack w='full' h='full' p={10} spacing={10} alignItems='flex-start'>
        <Heading size='2xl'>Dein Warenkorb</Heading>
        {cart?.items.map(cartItem =>
          <HStack key={cartItem.sku} spacing={6} justifyContent='space-between' alignItems="center" w="full">
            <HStack>
              <ChangeQuantityForm cartItem={cartItem} />
              <Heading size="md" ml={8}>{cartItem.name}</Heading>
            </HStack>
            <Heading size="md" style={{'white-space': 'nowrap'}}>
              {cartItem.quantity > 1 && `${cartItem.quantity} x `}{cartItem.price} €
            </Heading>
          </HStack>
        )}
        <Divider />
        <VStack spacing={4} alignItems="stretch" w="full">
          <HStack justifyContent="space-between">
            <Text color='secondaryText'>Versand</Text>
            <Heading size="sm">4,50 €</Heading>
          </HStack>
        </VStack>
        <Divider />
        <HStack justifyContent="space-between" w="full">
          <Text color='secondaryText'>Gesamtsumme</Text>
          <Heading size="lg">{cart?.total} €</Heading>
        </HStack>
        <Center w='full' mt={3}>
          <Button size='lg' w='full'>Zur Kasse</Button>
        </Center>
      </VStack>
    </Container>
  )
}
