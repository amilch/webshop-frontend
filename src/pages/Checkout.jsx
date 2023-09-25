import { Container, Flex } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import CheckoutCart from '../components/CheckoutCart'
import CheckoutShipping from '../components/CheckoutShipping'
import CheckoutPayment from '../components/CheckoutPayment'

export default function Checkout() {
  const [paymentScreen, setPaymentScreen] = useState(false)

  return (
    <Flex h={{base: 'auto', md: '100vh'}} py={[0, 10, 20]} direction={{base: 'column-reverse', md: 'row'}}>
      { !paymentScreen
        && <CheckoutShipping proceed={() => setPaymentScreen(true)}/>
        || <CheckoutPayment /> }
      <CheckoutCart />
    </Flex>
  )
}
