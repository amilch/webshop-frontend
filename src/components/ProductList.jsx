import { Select, Link as ChakraLink, HStack, Button, IconButton, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, SimpleGrid, Text, VStack, Flex, Spacer, Tooltip } from "@chakra-ui/react"
import { Link as RouterLink, useSearch } from "@tanstack/react-router"
import { TbShoppingCartPlus } from 'react-icons/tb'
import { Form, Field, Formik, useFormik } from "formik"

import { useState } from "react"
import { useAuth } from "react-oidc-context"
import useAddCartItem from "../hooks/useAddCartitem"

const quantityOptions = [...Array(10).keys()].map((n) => n + 1)

export default function ProductList({ products }) {
  const addCartItem = useAddCartItem()


  const AddToCartForm = ({ product }) => (
    <Formik
      initialValues={{ quantity: 1 }}
      onSubmit={(values, action) => {
        addCartItem.mutate({
          cartItem: {
            ...product,
            ...values,
          }
        })
        action.setSubmitting(false)
      }}
    >
      {(props) => (
        <Form>
          <Field name='quantity'>
            {({ field, form }) => (
              <HStack spacing={4}>
                <Select {...field} w={20} isDisabled={!product.in_stock}>
                  {quantityOptions.map((n) => (
                    <option value={n}>{n}</option>
                  ))}
                </Select>
                <Tooltip label="Zum Warenkorb hinzufügen">
                  <IconButton
                    type='submit'
                    isLoading={props.isSubmitting}
                    icon={<TbShoppingCartPlus />}
                    isDisabled={!product.in_stock}
                  />

                </Tooltip>
              </HStack>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  )

  return (
    <VStack spacing={8} w='full'>
      {products?.map((product) => {
        return (
          <Flex
            w='full' p={8} align='center' border='1px'
            borderColor='gray.100' key={product.id}
          >
            <VStack align='stretch' pr={8}>
              <Heading size='sm' flex='1'>{product.name}</Heading>
              <Text>{product.description}</Text>
            </VStack>
            <Spacer />
            <VStack pt={4}>
              <HStack spacing={4}>
                <Heading size='sm' whiteSpace='nowrap'>{product.price} €</Heading>
                <AddToCartForm product={product} />
              </HStack>
              <Text fontSize='sm'>{ !product.in_stock && 'Aktuell leider nicht auf Lager' }</Text>
            </VStack>
          </Flex>
        )
      })}
    </VStack>
  )
}
