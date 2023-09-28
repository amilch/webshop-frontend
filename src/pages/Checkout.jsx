import { Center, Container, Flex, HStack, Heading, Link, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from '@tanstack/react-router';
import { useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import CheckoutCart from '../components/CheckoutCart'
import CheckoutShipping from '../components/CheckoutShipping'
import CheckoutPayment from '../components/CheckoutPayment'
import useCart from '../hooks/useCart';
import useCreateOrder from '../hooks/useCreateOrder';
import useDeleteCart from '../hooks/useDeleteCart';

export default function Checkout() {
  const { data: cart } = useCart()
  const createOrder = useCreateOrder()
  const deleteCart = useDeleteCart()
  const [paymentScreen, setPaymentScreen] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({})
  const [orderSuccessful, setOrderSuccessful] = useState(false)
  const proceed = (values) => {
    setShippingAddress(values)
    setPaymentScreen(true)
  }
  const finish = (values) => {
    const payload = {
      order: {
        items: cart.items,
        total: cart.total,
        mail: values.mail,
        shipping_address: JSON.stringify(shippingAddress),
        payment_data: JSON.stringify({
          first_name: values.first_name,
          last_name: values.last_name,
          iban: values.iban,
        }),
      }
    }
    createOrder.mutate(payload, {
      onSuccess: () => {
        deleteCart.mutate()
        setOrderSuccessful(true)
      },
      onError: (e) => { console.log(`error creating order: ${e}`) },
    })
  }

  return (
    <VStack py={[0, 5, 10]} align='left'>
      <Link as={RouterLink} fontSize='xl'
        {...(!paymentScreen ? { to: '/cart' } : {})}
        onClick={() => setPaymentScreen(false)}
      >
        <HStack px={10} align='center'>
          {!orderSuccessful &&
            <>
              <FiArrowLeft />
              <Heading size='md'>
                {paymentScreen && 'Zurück zur Adresse' || 'Zurück zum Warenkorb'}
              </Heading>
            </>
          }
        </HStack>
      </Link>
      {!orderSuccessful ?
        <Flex h={{ base: 'auto', md: '100vh' }} direction={{ base: 'column-reverse', md: 'row' }}>
          {!paymentScreen
            && <CheckoutShipping values={shippingAddress} proceed={proceed} />
            || <CheckoutPayment shippingAddress={shippingAddress} finish={finish} />}
          <CheckoutCart />
        </Flex>
        :
        <Center>
          <VStack >
            <IoMdCheckmarkCircle size={70} color='#38A169' />
            <Heading mt={4}>Bestellung ausgeführt</Heading>
            <Heading size='md'>Wir werden in kürze deine Bestellung versenden.</Heading>
            <Link as={RouterLink} fontSize='xl' to='/' mt={4}>
              <HStack px={10} align='center'>
                <Heading size='md'>
                  Weiter einkaufen
                </Heading>
                <FiArrowRight />
              </HStack>
            </Link>
          </VStack>
        </Center>
      }
    </VStack>
  )
}
