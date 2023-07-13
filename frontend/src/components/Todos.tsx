import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import TodoInput from './TodoInput'
import Navbar from './Navbar'

const Todos = () => {
  return (
   <Box p="10px" w="85%" >


    <Navbar/>
    <TodoInput/>


   </Box>
  )
}

export default Todos