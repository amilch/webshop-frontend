import { Button, Input, SimpleGrid, Container, Flex, Grid, GridItem, HStack, Heading, Link, LinkBox, LinkOverlay, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure, FormLabel, FormControl, Select, Textarea } from '@chakra-ui/react';
import { Link as RouterLink, Navigate } from '@tanstack/react-router';
import useProducts from '../hooks/useProducts';
import { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import useCreateProduct from '../hooks/useCreateProduct';
import useCategories from '../hooks/useCategories';
import { useAuth } from 'react-oidc-context';

export default function Backend() {
  const { data: products } = useProducts()
  const { data: categories } = useCategories()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const createProduct = useCreateProduct()
  const auth = useAuth()


  const links = [
    { name: 'Products', path: '/backend/products' },
    { name: 'Inventory', path: '/backend/inventory' },
    { name: 'Orders', path: '/backend/orders' },
  ]

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
              weight: '',
            }}
            onSubmit={(values, action) => {
              console.log(values)
              createProduct.mutate({
                product: {
                  category_id: Number(values.category_id),
                  name: values.name,
                  sku: values.sku,
                  description: values.description,
                  price: Number(values.price),
                  weight: Number(values.weight),
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
                      <Field name='category'>
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
                    <GridItem colSpan={1}>
                      <Field name='price'>
                        {({ field }) => (
                          <FormControl>
                            <FormLabel>Price</FormLabel>
                            <Input {...field} />
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Field name='weight'>
                        {({ field }) => (
                          <FormControl>
                            <FormLabel>Weight</FormLabel>
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
      <LinkBox as={Tr} key={product.id}>
        <Td isNumeric>{product.id}</Td>
        <Td>{product.name}</Td>
        <Td>{product.sku}</Td>
        <Td>{product.price} €</Td>
        <Td>{product.weight} g</Td>
      </LinkBox>
    )
  }

  return (
    <>
      <Grid templateColumns='repeat(5,1fr)' py={[0, 10, 20]} gap={8}>
        <GridItem colSpan={1}>
          <List spacing={1}>
            {links?.map((link) => (
              <ListItem key={link.name}>
                <Link as={RouterLink} to={link.path}
                  activeProps={{ style: { fontWeight: 'bold' } }}>
                  {link.name}
                </Link>
              </ListItem>
            ))}
          </List>
        </GridItem>
        <GridItem colSpan={4}>
          <VStack spacing={8} w='full'>
            <Button onClick={onOpen}>New product</Button>
            <TableContainer p={0} w='full'>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th isNumeric>id</Th>
                    <Th>name</Th>
                    <Th>sku</Th>
                    <Th>price</Th>
                    <Th>weight</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products?.map(product => productRow(product))}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </GridItem>
      </Grid>
      <ProductForm />
    </>
  )
}
