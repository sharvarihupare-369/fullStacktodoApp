import {
  Box,
  Text,
  Flex,
  Heading,
  Checkbox,
  Button,
  Input,
  useToast,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  IconButton,
  useMediaQuery,
  Container
} from "@chakra-ui/react";
import React, { Dispatch, useEffect, useState } from "react";
import 'animate.css';
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  getTodos,
  handleUpdateStatus,
  updateTodo,
  
} from "../redux/todoReducer/action";
import 'animate.css';
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { ArrowLeftIcon, ArrowRightIcon, DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption, 
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { Todo } from "../redux/todoReducer/reducer";

const TodoItem = () => {
  const [editingTodoId, setEditingTodoId] = useState<string | null>("");
  const dispatch: Dispatch<any> = useDispatch();
  const { data, deletedMsg, errorMsg, updatedMsg,totalTodos } = useSelector(
    (store: any) => store.todoReducer
    );
    const [editInput, setEditInput] = useState<boolean[]>(
      Array(data.length).fill(false)
      );
      const [title, setTitle] = useState("");
      const [toggle, setToggle] = useState(false);
      const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
      const [page,setPage] = useState(1)
      const [limit,setLimit] = useState(5)
      const [totalPages,setTotalPages] = useState(1);
  // console.log(totalTodos)
  //   const { token } = useSelector((store: any) => store.authReducer);
    const token = localStorage.getItem("todo-token") || "";
    const updateToast = useToast();
    const deleteToast = useToast();
    const errtoast = useToast();
    const toast = useToast()


  let monthArr = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];


  // const reversedTodos = data.slice().reverse();
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");

  const handleAllTodos = async() => {
    // const sortedData = data.slice().sort((a:any, b:any) => {
    //   const dateA = new Date(a.created_at);
    //   const dateB = new Date(b.created_at);
    //   return dateB.getTime() - dateA.getTime();
    // });
    setFilteredTodos(data)
  }

  
 

  const handlePendingTodos = () => {
     const pendingTodos = data.filter((el:any)=> !el.status)
     if(pendingTodos.length === 0){
       toast({
        title: "No pending todos!",
        // description: "Please Enter Valid Todo!",
        position: "top",
        status: "warning",
        duration: 4000,
        isClosable: true,
      })
      return
     }
     setFilteredTodos(pendingTodos)
  }

  const handleCompleted = () => {
    const completed = data.filter((el:any)=> el.status)
    if(completed.length === 0){
      toast({
       title: "No completed todos!",
       // description: "Please Enter Valid Todo!",
       position: "top",
       status: "warning",
       duration: 4000,
       isClosable: true,
     })
     return
    }
    setFilteredTodos(completed)
  }

   

  const handleToggle = async (id: string) => {
    const todo = data.find((el: any) => el._id === id);
    if (todo) {
      const newStatus = !todo.status; 
      // await dispatch(handleUpdateStatus(id, newStatus, token));
      await dispatch(updateTodo(id,"",newStatus,token))
      await dispatch(getTodos(token,"",page,limit));
    }
  };

  const handleUpdate = async (
    id: string,
    updatedTitle: string,
    token: string,
    i: number
  ) => {
    try {
      await dispatch(updateTodo(id, updatedTitle,false, token));
      await  dispatch(getTodos(token,"",page,limit));

      const updatedEditInput = editInput.map((value, index) =>
        index === i ? false : value
      );
      setEditInput(updatedEditInput);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id: string, token: string) => {
    try {
      await dispatch(deleteTodo(id, token));
      await  dispatch(getTodos(token,"",page,limit));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(()=>{
    const total = Math.ceil(totalTodos/limit);
    setTotalPages(total)
  },[totalTodos,limit])

  useEffect(() => {
    dispatch(getTodos(token,"",page,limit));
  }, [token,page,limit]);

  useEffect(() => {
    setFilteredTodos(data);
  }, [data]);

 

  return (
    <>
    
      <Flex  w={{ base: "100%", sm: "100%", md: "90%", lg: "60%", xl: "50%" }} m="20px auto" justifyContent={"center"} alignItems={"center"}>

      {
        token ? 
    
   
      <Flex  w={{ base: "100%", sm: "100%", md: "90%", lg: "60%", xl: "50%" }}  alignItems={'center'} justifyContent={"space-around"}>
      <Button _hover={{bg:"#F57C00",color:"white"}} onClick={handleAllTodos}>All Todos</Button>
      <Button _hover={{bg:"#F57C00",color:"white"}} onClick={handlePendingTodos}>Pending</Button>
      <Button _hover={{bg:"#F57C00",color:"white"}} onClick={handleCompleted}>Completed</Button>
      </Flex>
    
      : ""
      }
      </Flex>

      <Box
        p={"10px 15px"}
        w={{ base: "100%", sm: "100%", md: "90%", lg: "60%", xl: "50%" }}
        m={"30px auto"}
      >
        <Flex justifyContent={"space-around"} alignItems={"center"} m="10px">
       
        </Flex>
       
        <Heading color={"#E0E0E0"} size={"md"}>
         {token ?  "TODAY'S TASKS" : ""}
        </Heading>
      
        { 
        filteredTodos.length === 0 && token ? <Text color={"white"} mt="5px" >No todos Added Yet!</Text> 
        :
         filteredTodos.map((el: any, i: number) => {
          // console.log(el)
          return (
            <Flex
              className="animate__animated animate__bounceInLeft"
              boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
              // bgGradient={el.status ?  "linear-gradient(to right, #000046, #01D0A9, #01D0A9)" : "linear(to-r, #595656, #b1b6bc)"}
              bgGradient= "linear(to-r,#333333, #b1b6bc)"
              opacity={el?.status && 0.5}
              color={"gray.300"}
              p={"25px 15px"}
              // borderRadius={"20px"}
              borderTopLeftRadius={"20px"}
              borderBottomRightRadius={"20px"}
              m={"30px 0"}
              key={i}
              justifyContent={"space-between"}
              alignItems={"center"}
              
            >
              <Flex   alignItems={"center"} gap={"20px"}>
                <Checkbox
                  // isChecked={el.status} name="status" onChange={(e)=>handleStatus(e,el._id,i)}
                  isChecked={el.status}
                  name="status"
                  onChange={() => handleToggle(el._id)}
                  // borderColor={"#eb06ff"}
                  borderColor={"#F57C00"}
                />

                {editInput[i] ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formElement = e.target as HTMLFormElement;
                      const inputElement = formElement.editInp as HTMLInputElement;
                      handleUpdate(el._id, inputElement.value, token, i);
                    }
                  }
                  >
                    <Flex alignItems={"center"} gap="5px">
                      <Input
                        value={title}
                        focusBorderColor="none"
                        w={"90%"}
                        type="text"
                        name="editInp"
                        placeholder="Edit todo...."
                        // onChange={(e)=>handleChange(e)}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <Button type="submit">Update</Button>
                    </Flex>
                  </form>
                ) : (
                  <Text
                 
                  textDecoration={el.status ? "line-through" : "none"}
                  textDecorationThickness={"2px"}
                  textDecorationColor={"black"}
                    fontWeight={"bold"}
                    fontSize={"xl"}
                  >
                    {el.title}
                  </Text>
                )}
              </Flex>

              <Text textDecoration={el.status ? "line-through" : "none"}
               textDecorationThickness={"2px"}
               textDecorationColor={"black"}
               fontSize={"lg"}
                
              >
                {/* {el?.created_at.split("T")[0]} */}
                {el.created_at ? el.created_at.split("T")[0] : ""}
              </Text>

              <Flex alignItems={"center"} gap={"10px"}>
                <Button
                  // onClick={()=>handleEdit(el._id)}
                  disabled={el.status}
                  onClick={() => {
                    setTitle(el.title);
                    let updatedEditInp = [...editInput];
                    updatedEditInp[i] = !updatedEditInp[i];
                    setEditInput(updatedEditInp);
                  }}
                  _hover={{ backgroundColor: "#212121" }}
                  borderRadius={"50%"}
                  bg={"#212121"}
                  color={"gray.200"}
                  size={isLargerThanMD ? "md" : "sm"}
                >
                  {<EditIcon />}
                </Button>

                <Button
                  color={"gray.200"}
                  fontSize={"25px"}
                  w={"40px"}
                  onClick={() => handleDelete(el._id, token)}
                  _hover={{ backgroundColor: "#e65b65" }}
                  bg={"#e65b65"}
                  borderRadius={"50%"}
                  size={isLargerThanMD ? "md" : "sm"}
                >
                  {<DeleteIcon />}
                </Button>
              </Flex>
            </Flex>
          );
        })
      } 

      {
        totalTodos != 0 ? 

        <Flex justifyContent={"center"} alignItems={"center"}  gap="9px">
       <IconButton  isDisabled={page==1} onClick={()=>setPage(page-1)} aria-label='Search database' icon={<ArrowLeftIcon />}/>
        {
          new Array(totalPages).fill(0).map((_,ind)=>{
            return <Button size={isLargerThanMD ? "md" : "sm"} key={ind} isDisabled={page==ind+1} border={"2px solid #F57C00"} onClick={()=>setPage(ind+1)}>{ind+1}</Button>
          })
        }
        <IconButton isDisabled={page==totalPages}  onClick={()=>setPage(page+1)}  aria-label='Search database' icon={<ArrowRightIcon />}/>

        </Flex>
         : ""
        } 
      </Box>
    
    </>
  );
  }

export default TodoItem;
