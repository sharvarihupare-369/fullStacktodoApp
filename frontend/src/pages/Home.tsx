import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../components/Sidebar'
import Todos from '../components/Todos'
import img1 from '../../Assets/45519.png'

const Home = () => {
  return (
    <Box   bgGradient="linear(to-r, #000046, #1CB5E0  )"
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
     >
     <Todos/>
   </Box>
  )
}

export default Home