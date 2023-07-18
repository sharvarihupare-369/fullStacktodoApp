import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../components/Sidebar'
import Todos from '../components/Todos'

const Home = () => {
  return (
    <Box bg={"#FDF6DF"} >
    
    <Flex>
     <Sidebar/> 
     <Todos/>
     </Flex>
   </Box>
  )
}

export default Home