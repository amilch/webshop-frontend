import { NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, HStack, Heading, LinkBox, Button, Input, SimpleGrid, GridItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure, FormLabel, FormControl, Select, Textarea, LinkOverlay, NumberInput } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import useOrders from '../../hooks/useOrders';
import { OrderStatus } from '../../utils';
import useUpdateOrder from '../../hooks/useUpdateOrder';

export default function BackendBilling() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedOrder, setSelectedOrder] = useState(null)

  const { data: orders } = useOrders()
  const updateOrder = useUpdateOrder()

  const OrderForm = () => {
    return (
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='sm'>
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
                  <VStack>
                      <Field name='status'>
                        {({ field }) => (
                          <FormControl>
                            <FormLabel>Status</FormLabel>
                          <Select {...field}>
                            {Object.entries(OrderStatus).map(([key, value]) =>
                              <option value={key}>{value}</option>
                            )}
                          </Select>
                          </FormControl>
                        )}
                      </Field>
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
                <Th>email</Th>
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
                  <Td>{order.created}</Td>
                  <Td isNumeric>{order.total} €</Td>
                <Td>{OrderStatus[order.status]}</Td>
                <Td>{order.email}d</Td>
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
