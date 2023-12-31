import { IconButton, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, VStack, HStack, Divider, Heading, SimpleGrid, Text, Container, Box, Center, ButtonGroup, Spacer } from '@chakra-ui/react'
import { FiRefreshCw } from 'react-icons/fi'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useState } from 'react';
import { Link as RouterLink } from '@tanstack/react-router';

import useCart from "../hooks/useCart";
import useUpsertCartItem from '../hooks/useUpsertCartItem';
import useDeleteCart from '../hooks/useDeleteCart';

export default function Cart() {
  const { data: cart } = useCart()
  const deleteCart = useDeleteCart()

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

  const ItemList = () => (
    <>
      {cart?.items.map(cartItem =>
        <HStack key={cartItem.sku} spacing={6} justifyContent='space-between' alignItems="center" w="full">
          <HStack>
            <ChangeQuantityForm cartItem={cartItem} />
            <Heading size="md" ml={8}>{cartItem.name}</Heading>
          </HStack>
          <Heading size="md" style={{ 'white-space': 'nowrap' }}>
            {cartItem.quantity > 1 && `${cartItem.quantity} x `}{cartItem.price} €
          </Heading>
        </HStack>
      )}
      <Divider />
      <HStack justifyContent="space-between" w="full">
        <Text color='secondaryText'>Gesamtsumme</Text>
        <Heading size="lg">{cart?.total} €</Heading>
      </HStack>
      <Center w='full' mt={3}>
        <Button as={RouterLink} to='/checkout' size='lg' w={['full', '30rem']}>Zur Kasse</Button>
      </Center>
    </>
  )

  return (
    <VStack w='full' h='full' p={10} spacing={10} alignItems='flex-start'>
      <HStack w='full' align='baseline'>
        <Heading size='2xl'>Dein Warenkorb</Heading>
        <Spacer />
        {cart?.items.length > 0 &&
          <Button variant='link' colorScheme='blackAlpha'
            onClick={deleteCart.mutate}>Warenkorb leeren</Button>
        }
      </HStack>
      {cart?.items.length > 0 ? <ItemList /> : <Center>
        <Heading size='sm'>Keine Produkte im Warenkorb</Heading>
      </Center>}
    </VStack>
  )
}
