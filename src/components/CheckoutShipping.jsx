import { Button, VStack, Heading, Text, SimpleGrid, FormControl, GridItem, FormLabel, Input, NumberInput, Checkbox, useBreakpointValue } from '@chakra-ui/react'

export default function CheckoutShipping({proceed}) {
  const colSpan = useBreakpointValue({base: 2, md: 1})

  return (
    <VStack w='full' h='full' p={10} spacing={10} alignItems='flex-start'>
      <Heading size='2xl'>Lieferung an</Heading>
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
            <FormLabel>Straße, Nr.</FormLabel>
            <Input placeholder="Strasse 22" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>PLZ</FormLabel>
            <Input placeholder="10299" type='numeric' />
          </FormControl>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>City</FormLabel>
            <Input placeholder="Berlin" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Button mt={3} size='lg' w='full' onClick={proceed}>
            Weiter zum Bezahlen
          </Button>
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}
