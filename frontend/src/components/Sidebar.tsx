import { Box, Heading,Image } from '@chakra-ui/react'
import React from 'react'

const Sidebar = () => {
  return (
    <Box p="10px" color={"white"} bg="#FFB56B" w="15%">
        <Box mt="30px">
        <Box   mt="40px" >
            <Heading transition={"ease-out"} cursor={"pointer"} _hover={{fontSize:"22px" , borderBottom:"1px solid white",scale:"125"}}  as="h5" size="md" fontSize={"20px"}>All tasks</Heading>
         </Box>
         <Box   mt="10px">
            <Heading transition={"ease-out"} cursor={"pointer"} _hover={{fontSize:"22px", borderBottom:"1px solid white",scale:"125"}} as="h5" size="md">Completed</Heading>
         </Box>
         <Box  mt="10px">
            <Heading   transition="ease-out" cursor={"pointer"} _hover={{fontSize:"22px", borderBottom:"1px solid white" , scale:"125"}} as="h5" size="md">Pending</Heading>
         </Box>
        </Box>
        <Box mt="400px">
            <Image src="https://img.freepik.com/free-vector/hand-drawn-business-planning_52683-76248.jpg?w=740&t=st=1689247762~exp=1689248362~hmac=d6a1bb24e688aa2082094325964418d5b54b23cc053293250fe5e7faa15040a3"/>
        </Box> 
    </Box>
    
  )
}

export default Sidebar