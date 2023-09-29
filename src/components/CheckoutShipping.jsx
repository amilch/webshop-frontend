import { Button, VStack, Heading, Text, SimpleGrid, FormControl, GridItem, FormLabel, Input, NumberInput, Checkbox, useBreakpointValue } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import { useAuth } from 'react-oidc-context'

export default function CheckoutShipping({ values, proceed }) {
  const colSpan = useBreakpointValue({ base: 2, md: 1 })
  const auth = useAuth()

  return (
    <Formik
      initialValues={{
        first_name: auth.user?.profile.given_name ?? '',
        last_name: auth.user?.profile.family_name ?? '',
        street_nr: '',
        plz: '',
        city: '',
        ...values,
      }}
      onSubmit={(values, action) => {
        proceed(values)
        action.setSubmitting(false)
      }}
    >
      {(props) =>
        <VStack as={Form} w='full' h='full' p={10} spacing={10} alignItems='flex-start'>
          <Heading size='2xl'>Lieferung an</Heading>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
            <GridItem colSpan={colSpan}>
              <Field name='first_name'>
                {({ field }) =>
                  <FormControl isRequired>
                    <FormLabel>Vorname</FormLabel>
                    <Input placeholder="Leo" {...field} />
                  </FormControl>
                }
              </Field>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <Field name='last_name'>
                {({ field }) =>
                  <FormControl isRequired>
                    <FormLabel>Nachname</FormLabel>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                }
              </Field>
            </GridItem>
            <GridItem colSpan={2}>
              <Field name='street_nr'>
                {({ field }) =>
                  <FormControl isRequired>
                    <FormLabel>Straße, Nr.</FormLabel>
                    <Input placeholder="Strasse 22" {...field}  />
                  </FormControl>
                }
              </Field>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <Field name='plz'>
                {({ field }) =>
                  <FormControl isRequired>
                    <FormLabel>PLZ</FormLabel>
                    <Input placeholder="10299" type='numeric' {...field} />
                  </FormControl>
                }
              </Field>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <Field name='city'>
                {({ field }) =>
                  <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Input placeholder="Berlin" {...field} />
                  </FormControl>
                }
              </Field>
            </GridItem>
            <GridItem colSpan={2}>
              <Button mt={3} size='lg' w='full' type='submit' isLoading={props.isSubmitting}>
                Weiter zum Bezahlen
              </Button>
            </GridItem>
          </SimpleGrid>
        </VStack>
      }
    </Formik>
  )
}
