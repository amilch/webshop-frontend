import { Button, VStack, Heading, Text, SimpleGrid, FormControl, GridItem, FormLabel, Input, NumberInput, Checkbox, useBreakpointValue } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'

export default function CheckoutPayment({ values, finish }) {
  const colSpan = useBreakpointValue({ base: 2, md: 1 })

  return (
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        iban: '',
        ...values,
      }}
      onSubmit={(values, action) => {
        finish(values)
        action.setSubmitting(false)
      }}
    >
      {(props) =>
        <VStack as={Form} w='full' h='full' p={10} spacing={10} alignItems='flex-start'>
          <VStack spacing={3} alignItems='flexStart'>
            <Heading size='2xl'>Zahlungsdaten</Heading>
          </VStack>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
            <GridItem colSpan={colSpan}>
              <Field name='first_name'>
                {({ field }) =>
                  <FormControl>
                    <FormLabel>Vorname</FormLabel>
                    <Input placeholder="Leo" {...field} />
                  </FormControl>
                }
              </Field>
            </GridItem>
            <GridItem colSpan={colSpan}>
              <Field name='last_name'>
                {({ field }) =>
                  <FormControl>
                    <FormLabel>Nachname</FormLabel>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                }
              </Field>
            </GridItem>
            <GridItem colSpan={2}>
              <Field name='iban'>
                {({ field }) =>
              <FormControl>
                <FormLabel>IBAN</FormLabel>
                <Input placeholder="DE75512108001245126199" {...field}/>
              </FormControl>
                }
        </Field>
            </GridItem>
            <GridItem colSpan={2}>
              <Button mt={3} size='lg' w='full' type='submit' isLoading={props.isSubmitting}>
                Kostenpflichtig bestellen
              </Button>
            </GridItem>
          </SimpleGrid>
        </VStack>
      }
    </Formik>
  )
}
