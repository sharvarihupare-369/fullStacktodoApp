import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../components/Sidebar'
import Todos from '../components/Todos'
import img1 from '../../Assets/45519.png'

const Home = () => {
  return (
    <Box   
  
    //  bgGradient="linear(to-r, #0F2027, #203A43, #2C5364)"
    //  bgGradient="linear(to-r, #0f0c29, #302b63, #24243e)"
    // bgGradient="linear(to-r, #000428, #004e92 )"
    // bgGradient="linear(to-r, #F0F2F0, #000C40 )"
    bgGradient="linear(to-r, #000046, #1CB5E0  )"
    // bgGradient="linear(to-r,#ad5389 , #3c1053 )"
    
    // backgroundImage="url(`${img1}`)"
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
     >
    
    {/* <Flex> */}
     {/* <Sidebar/>  */}
     <Todos/>
     {/* </Flex> */}
   </Box>
  )
}

export default Home