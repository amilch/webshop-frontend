import { NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, HStack, Heading, LinkBox, Button, Input, SimpleGrid, GridItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure, FormLabel, FormControl, Select, Textarea, LinkOverlay, NumberInput, Box } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import useOrders from '../../hooks/useOrders';
import { OrderStatus, formatDate } from '../../utils';
import useUpdateOrder from '../../hooks/useUpdateOrder';

export default function BackendBilling() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedOrder, setSelectedOrder] = useState(null)

  const { data: orders } = useOrders()
  const updateOrder = useUpdateOrder()

  const shippingAddress = selectedOrder && JSON.parse(selectedOrder?.shipping_address)
  const paymentData = selectedOrder && JSON.parse(selectedOrder?.payment_data)

  const OrderForm = () => {
    return (
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              status: selectedOrder?.status,
            }}
            onSubmit={(values, action) => {
              updateOrder.mutate({
                order: {
                  id: Number(selectedOrder.id),
                  status: Number(values.status),
                }
              },
                {
                  onSuccess: () => {},
                  onError: (e) => {
                    alert(e)
                  }
                })
              action.setSubmitting(false)
              onClose()
            }}
          >
            {(props) => (
              <Form>
                <ModalHeader>Order #{selectedOrder.id}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <VStack spacing={6} align='left' w='full'>
                    <Box>
                      <Heading size='sm'>Created</Heading>
                      <Text>{formatDate(selectedOrder.created)}</Text>
                    </Box>
                    <Field name='status'>
                      {({ field }) => (
                        <FormControl>
                          <FormLabel fontWeight='bold'>Status</FormLabel>
                          <Select {...field}>
                            {Object.entries(OrderStatus).map(([key, value]) =>
                              <option value={key}>{value}</option>
                            )}
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    <Box>
                      <Heading size='sm'>Mail address</Heading>
                      <Text>{selectedOrder.mail}</Text>
                    </Box>
                    <Box>
                      <Heading size='sm'>Shipping address</Heading>
                      <Text>{shippingAddress.first_name} {shippingAddress.last_name}</Text>
                      <Text>{shippingAddress.street_nr}</Text>
                      <Text>{shippingAddress.plz} {shippingAddress.city}</Text>
                    </Box>
                    <Box>
                      <Heading size='sm'>Payment details</Heading>
                      <Text>{paymentData.first_name} {paymentData.last_name}</Text>
                      <Text>{paymentData.iban}</Text>
                    </Box>
                    <Box>
                      <Heading size='sm'>Items</Heading>
                      {selectedOrder.items.map(item =>
                        <Text>{item.quantity}x {item.sku}</Text>
                      )}
                    </Box>
                    <Box>
                      <Heading size='sm'>Total: {selectedOrder.total} €</Heading>
                      <Text>Shipping: {selectedOrder.shipping_cost} €</Text>
                    </Box>
                  </VStack>
                </ModalBody>

                <ModalFooter>
                  <Button type='submit' isLoading={props.isSubmitting} mr={3}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    )
  }

  return (
    <>
      <VStack spacing={8} w='full'>
        <HStack w='full' px={6}>
          <Heading size='md'>Orders</Heading>
          <Spacer />
        </HStack>
        <TableContainer p={0} w='full'>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th isNumeric>id</Th>
                <Th>created</Th>
                <Th isNumeric>total</Th>
                <Th>status</Th>
                <Th>mail</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders?.map(order =>
                <LinkBox as={Tr} key={order.id}>
                  <Td isNumeric>
                    <LinkOverlay href="#" onClick={() => {
                      setSelectedOrder(order)
                      onOpen()
                    }}>
                      {order.id}
                    </LinkOverlay>
                  </Td>
                  <Td>{formatDate(order.created)}</Td>
                  <Td isNumeric>{order.total} €</Td>
                  <Td>{OrderStatus[order.status]}</Td>
                  <Td>{order.mail}</Td>
                </LinkBox>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
      <OrderForm />
    </>
  )
}
