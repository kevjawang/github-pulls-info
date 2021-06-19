import * as React from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Home from "./Home";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontSize="md">
      <Grid p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Home />
      </Grid>
    </Box>
  </ChakraProvider>
);
