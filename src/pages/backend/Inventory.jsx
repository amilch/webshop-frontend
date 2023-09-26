import { NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, HStack, Heading, LinkBox, Button, Input, SimpleGrid, GridItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure, FormLabel, FormControl, Select, Textarea, LinkOverlay, NumberInput } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import useCreateInventoryProduct from '../../hooks/useCreateInventoryProduct';
import useInventoryProducts from '../../hooks/useInventoryProducts';
import { useState } from 'react';

export default function BackendInventory() {
  const { data: inventoryProducts } = useInventoryProducts()
  const createInventoryProduct = useCreateInventoryProduct()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedProduct, setSelectedProduct] = useState(null)

  const ProductForm = () => {
    return (
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='sm'>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              quantity: selectedProduct?.quantity,
            }}
            onSubmit={(values, action) => {
              createInventoryProduct.mutate({
                product: {
                  ...selectedProduct,
                  quantity: Number(values.quantity),
                }
              },
                {
                  onSuccess: () => {},
                  onError: (e) => {
                    alert(e)
                    action.setSubmitting(false)
                  }
                })
              action.setSubmitting(false)
              onClose()
            }}
          >
            {(props) => (
              <Form>
                <ModalHeader>Edit: {selectedProduct.sku}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
                    <GridItem colSpan={2}>
                      <Field name='quantity'>
                        {({ field }) => (
                          <FormControl>
                            <FormLabel>Quantity</FormLabel>
                            <NumberInput
                              onChange={(v) => props.setValues({quantity: v})}
                              onBlur={() => props.setTouched({quantity: true})}
                              value={props.values.quantity}
                            >
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                  </SimpleGrid>
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
        <HStack w='full' px={8}>
          <Heading size='md'>Inventory products</Heading>
          <Spacer />
        </HStack>
        <TableContainer p={0} w='full'>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>sku</Th>
                <Th isNumeric>quantity</Th>
                <Th isNumeric>reserved</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* {JSON.stringify(inventoryProducts)} */}
              {inventoryProducts?.map(product =>
                <LinkBox as={Tr} key={product.sku}>
                  <Td>
                    <LinkOverlay href="#" onClick={() => {
                      setSelectedProduct(product)
                      onOpen()
                    }}>
                      {product.sku}
                    </LinkOverlay>
                  </Td>
                  <Td isNumeric>{product.quantity}</Td>
                  <Td isNumeric>{product.reserved}</Td>
                </LinkBox>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
      <ProductForm />
    </>
  )
}
