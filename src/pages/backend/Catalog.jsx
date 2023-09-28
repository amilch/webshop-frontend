import { HStack, Heading, LinkBox, Button, Input, SimpleGrid, GridItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure, FormLabel, FormControl, Select, Textarea } from '@chakra-ui/react';
import useProducts from '../../hooks/useProducts';
import { Field, Form, Formik } from 'formik';
import useCreateProduct from '../../hooks/useCreateProduct';
import useCategories from '../../hooks/useCategories';

export default function BackendCatalog() {
  const { data: products } = useProducts()
  const { data: categories } = useCategories()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const createProduct = useCreateProduct()

  const ProductForm = () => {
    return (
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              category_id: '',
              name: '',
              sku: '',
              description: '',
              price: '',
            }}
            onSubmit={(values, action) => {
              createProduct.mutate({
                product: {
                  category_id: Number(values.category_id),
                  name: values.name,
                  sku: values.sku,
                  description: values.description,
                  price: Number(values.price),
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
                <ModalHeader>Create</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
                    <GridItem colSpan={2}>
                      <Field name='category_id'>
                        {({ field }) => (
                          <FormControl>
                            <Select {...field} placeholder='Select category'>
                              {categories.map(category => (
                                <option value={category.id} key={category.id}>{category.name}</option>
                              ))}</Select>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Field name='name'>
                        {({ field }) => (
                          <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input {...field} />
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Field name='sku'>
                        {({ field }) => (
                          <FormControl>
                            <FormLabel>sku</FormLabel>
                            <Input {...field} />
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Field name='price'>
                        {({ field }) => (
                          <FormControl>
                            <FormLabel>Price</FormLabel>
                            <Input {...field} />
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Field name='description'>
                        {({ field }) => (
                          <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea {...field} />
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

  const productRow = (product) => {
    return (
      <Tr key={product.id}>
        <Td isNumeric>{product.id}</Td>
        <Td>{product.name}</Td>
        <Td>{product.sku}</Td>
        <Td>{product.price} €</Td>
      </Tr>
    )
  }

  return (
    <>
      <VStack spacing={8} w='full'>
        <HStack w='full' px={8}>
          <Heading size='md'>Products</Heading>
          <Spacer />
          <Button onClick={onOpen}>New product</Button>
        </HStack>
        <TableContainer p={0} w='full'>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th isNumeric>id</Th>
                <Th>name</Th>
                <Th>sku</Th>
                <Th>price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products?.map(product => productRow(product))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
      <ProductForm />
    </>
  )
}
