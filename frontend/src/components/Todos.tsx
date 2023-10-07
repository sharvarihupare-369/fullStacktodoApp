import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import TodoInput from './TodoInput'
import Navbar from './Navbar'
import TodoItem from './TodoItem'

const Todos = () => {
  return (
   <Box p="10px">
    <Navbar/>
    <TodoInput/>
    <TodoItem/>
   </Box>
  )
}

export default Todos