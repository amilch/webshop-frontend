import { Button, VStack, Heading, Text, SimpleGrid, FormControl, GridItem, FormLabel, Input, NumberInput, Checkbox, useBreakpointValue } from '@chakra-ui/react'

export default function CheckoutPayment() {
  const colSpan = useBreakpointValue({base: 2, md: 1})

  return (
    <VStack w='full' h='full' p={10} spacing={10} alignItems='flex-start'>
      <VStack spacing={3} alignItems='flexStart'>
        <Heading size='2xl'>Zahlungsdaten</Heading>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>Vorname</FormLabel>
            <Input placeholder="Leo" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>Nachname</FormLabel>
            <Input placeholder="Doe" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>IBAN</FormLabel>
            <Input placeholder="DE75512108001245126199" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Button mt={3} size='lg' w='full'>Kostenpflichtig bestellen</Button>
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}
