import { Box, Flex, Heading,Text,Link } from '@chakra-ui/react'
import React from 'react'
// import {  } from 'react-router-dom'
const Navbar = () => {

  const mothArr = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  const days    = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  
  const currentDate = new Date();
  
 const year = currentDate.getFullYear();
 const month = currentDate.getMonth() + 1; // Month starts from 0, so add 1
 
 let currdate = ""
 mothArr.forEach((el,ind)=>{
  if(month-1 == ind){
    currdate += el 
  }
 })
 
 
 const date = currentDate.getDate();
 const day = days[currentDate.getDay()]
 
 
 const presentDay = (`${date}-${currdate}-${year}, ${day}`);
 const currDay = (`${currdate} ${date} ${day}`)
  return (
    <Box color={"white"} w="90%" m="auto">
      {/* <Navbar/> */}
      {/* <Heading>{presentDay}</Heading> */}
      <Flex justifyContent={"space-between"}>
      <Heading color={"#F57C00"}>{currDay}</Heading>
      
      <Flex w="15%" alignItems={"center"}   justifyContent={"space-around"}  >
      {/* <Box> */}
      
      <Link textDecoration={"none"}  bg="#F57C00" p="5px 10px" fontSize={"17px"} borderTopLeftRadius={"10px"} borderBottomRightRadius={"10px"}  href="/signup">Signup</Link>
      {/* </Box> */}
      {/* <Box> */}
      <Link  bg="#F57C00" p="5px 10px"  fontSize={"17px"} borderTopLeftRadius={"10px"} borderBottomRightRadius={"10px"} href="/login">Login</Link>
      {/* </Box> */}
      </Flex>
    
      </Flex>
      {/* <Text></Text> */}
        
      <Text color={"gray.300"} >Manage your tasks!</Text>
    
    </Box>
    
  )
}

export default Navbar