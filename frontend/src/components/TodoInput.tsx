import { Box, Button, Flex, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import {AddIcon} from '@chakra-ui/icons'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { getTodos, postTodos } from '../redux/todoReducer/action'

const TodoInput = () => {
  const [status,setStatus] = useState(false)
  const [title,setTitle] = useState("")
  const dispatch: Dispatch<any> = useDispatch();

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()
   const newTodo = {
     title:title,
     created_at:Date.now,
     priority:Math.ceil(Math.random()*10),
     status:false
   }
  await dispatch(postTodos(newTodo))
  setTitle("")
  dispatch(getTodos())

  }

  return (
   <Box mt="10px">
    <form onSubmit={handleSubmit} action=""> 
        <Flex >
        <Button  onClick={()=>setStatus(true)}  style={{  background:"#FFB56B", borderRadius:"50%"}}  variant={"ghost"}><AddIcon style={{color:"white"}}  /></Button>
        {
          status ? <Input value={title} onChange={(e)=>setTitle(e.target.value)} focusBorderColor='none' border={"none"} borderBottom={"1px inset"} ml="10px"  type='text' placeholder='Add todos here...'/> : ""
   
        }
        

        </Flex>
    </form>
   </Box>
  )
}

export default TodoInput
