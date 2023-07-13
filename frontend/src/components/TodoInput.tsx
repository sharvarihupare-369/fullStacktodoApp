import { Box, Button, Flex, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import {AddIcon} from '@chakra-ui/icons'

const TodoInput = () => {
  const [status,setStatus] = useState(false)
  return (
   <Box mt="10px">
    <form action="">
        <Flex >
        <Button onClick={()=>setStatus(true)}  style={{  background:"#FFB56B", borderRadius:"50%"}}  variant={"ghost"}><AddIcon style={{color:"white"}}  /></Button>
        {
          status ? <Input  focusBorderColor='none' border={"none"} borderBottom={"1px inset"} ml="10px"  type='text' placeholder='Add todos here...'/> : ""
   
        }
        

        </Flex>
    </form>
   </Box>
  )
}

export default TodoInput
