import { extendTheme } from "@chakra-ui/react";

import "@fontsource/atkinson-hyperlegible"; // Defaults to weight 400
import "@fontsource/atkinson-hyperlegible/400.css"; // Specify weight
import "@fontsource/atkinson-hyperlegible/400-italic.css"; // Specify weight and style

const theme = extendTheme({
  fonts: {
    heading: `'Atkinson Hyperlegible', sans-serif`,
    body: `'Atkinson Hyperlegible', sans-serif`,
  },
  colors: {
    secondaryText: '#2D3748'
  }
})

export default theme
