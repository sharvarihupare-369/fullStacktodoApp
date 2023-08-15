import { Box,Text,Flex, Heading, Checkbox, Button, Input, useToast } from '@chakra-ui/react'
import React, { Dispatch, useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, getTodos } from '../redux/todoReducer/action'
import { FaEdit, FaTrash } from 'react-icons/fa'

const TodoItem = () => {
  
  const [editInput, setEditInput] = useState<boolean>(false);
  const dispatch: Dispatch<any> = useDispatch();
  const { data , deletedMsg } = useSelector((store: any) => store.todoReducer);
//   const { token } = useSelector((store: any) => store.authReducer);
  const token = localStorage.getItem("todo-token") || ""
  const toast = useToast()

  let monthArr = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handleDelete = (id:number) => {
      dispatch(deleteTodo(id,token))
    //   dispatch(getTodos(token));
  }

  useEffect(() => {
      dispatch(getTodos(token));
  }, [])
//   useEffect(()=>{
//      if(deletedMsg){
//         toast({
//             title: 'Success',
//             description: deletedMsg,
//             position : 'top',
//             status: 'success',
//             duration: 4000,
//             isClosable: true,
//           })
//             return
//      }
//   },[deletedMsg])
//   console.log(token)

  return (
    <Box p={'10px 15px'} w={{ base: '100%', sm: '100%', md: '90%', lg: '60%', xl: '50%' }} m={'30px auto'}>
            <Heading color={'#E0E0E0'} size={'md'}>TODAY'S TASKS</Heading>
            {data.map((el: any, i: number) => {
              // console.log(el)
                return <Flex  boxShadow= "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
                //  bgGradient="linear(to-r, #000046, #1CB5E0)" 
                // bgGradient="linear(to-r, #000046, #1CB5E0, #FF6E7F)"
                // bgGradient="linear(to-r, #000046, #1CB5E0, #04A6D7, #0496C7)"
                // bgGradient="linear(to-r, #000046, #1CB5E0, #35A7FF)"
                // bgGradient="linear(to-r, #000046, #1CB5E0, #8E2DE2)"
                bgGradient="linear(to-r, #000046, #1CB5E0, #01A9DB)"

                 color={'gray.300'} p={'25px 15px'} borderRadius={'50px'} m={'30px 0'}   key={i} justifyContent={'space-between'} alignItems={'center'}>
                    <Flex alignItems={'center'} gap={'20px'}>
                        <Checkbox borderColor={'#eb06ff'} />
                        {editInput ?
                            <form>
                                <Input value={el.title} focusBorderColor='none' w={'90%'} type='text' placeholder='Edit todo....' />
                            </form>
                            :
                            <Text fontWeight={'bold'}>{el.title}</Text>
                        }
                    </Flex>
                    <Text>{el.created_at.split('T')[0]}</Text>
                    <Flex gap={'10px'}>
                        <Button onClick={() => setEditInput(true)} _hover={{backgroundColor : '#237afe'}} borderRadius={'50%'} bg={'#237afe'} color={'gray.200'}>{<FaEdit />}</Button>
                        <Button color={'gray.200'} fontSize={'25px'} w={'40px'} onClick={()=>handleDelete(el._id)}  _hover={{backgroundColor : '#e65b65'}} bg={'#e65b65'} borderRadius={'50%'}>{<FaTrash/>}</Button>
                    </Flex>
                </Flex>
            })}
        </Box>
  )
}

export default TodoItem