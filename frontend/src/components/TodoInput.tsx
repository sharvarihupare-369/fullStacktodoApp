
import { Box, Button, Flex, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import {AddIcon} from '@chakra-ui/icons'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { getTodos, postTodos } from '../redux/todoReducer/action'

export interface NewTodo {
  title: string;
  created_at: number;
  priority: number;
  status: boolean;
}

const TodoInput = () => {
  const [status,setStatus] = useState(false)
  const [title,setTitle] = useState("")
  const dispatch: Dispatch<any> = useDispatch();
  // const {token} = useSelector((store:any)=>store.authReducer)
  // console.log(token)
  const token = localStorage.getItem("todo-token") || ""
  const errtoast = useToast()

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()
   const newTodo:NewTodo = {
     title:title,
     created_at:Date.now(),
     priority:Math.ceil(Math.random()*10),
     status:false
   }
   if(!title){
    errtoast({
      title: "Todo is not added",
      description: "Please Enter Valid Todo!",
      position: "top",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
   }
  await dispatch(postTodos(newTodo,token))
  setTitle("")
  dispatch(getTodos(token))
  // dispatch(getTodos(token,"",page,limit));
  
  }

  return (
   <Box   w="90%" m="auto">
    <form onSubmit={handleSubmit} action=""> 
        <Flex mt="30px">
        
         <Input value={title} color={"white"} onChange={(e)=>setTitle(e.target.value)}  focusBorderColor='none' border={"none"} borderBottom={"1px inset gray"} mr="10px"  type='text' placeholder='Add todos here...'/>
        <Button type='submit' bg={"#F57C00"}  onClick={()=>setStatus(true)}  style={{  borderRadius:"50%"}}  variant={"ghost"}><AddIcon style={{color:"white"}}  /></Button>
   
        </Flex>
    </form>
   </Box>
  )
}

export default TodoInput
