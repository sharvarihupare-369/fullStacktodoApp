import * as React from "react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Box, ChakraProvider, Flex, theme } from "@chakra-ui/react"
import Todos from "./components/Todos"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"


export const App = () => (
 <>
   
    <Box bg={"#FDF6DF"} height={"100vh"}>
   
     <Flex>
     <Sidebar/> 
     <Todos/>
     </Flex>
   </Box>
 
 </>
)
