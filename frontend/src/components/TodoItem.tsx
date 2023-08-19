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
  IconButton
} from "@chakra-ui/react";
import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  getTodos,
  handleUpdateStatus,
  updateTodo,
  
} from "../redux/todoReducer/action";
import 'animate.css';
import { FaEdit, FaTrash } from "react-icons/fa";
import { ArrowLeftIcon, ArrowRightIcon, HamburgerIcon } from "@chakra-ui/icons";
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


  const handleAllTodos = async() => {
    const sortedData = data.slice().sort((a:any, b:any) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();
    });
    setFilteredTodos(sortedData)
  }

  
 

  const handlePendingTodos = () => {
     const pendingTodos = data.filter((el:any)=> !el.status)
     setFilteredTodos(pendingTodos)
  }

  const handleCompleted = () => {
    const completed = data.filter((el:any)=> el.status)
    setFilteredTodos(completed)
  }

     const sortedFilteredTodos = [...filteredTodos].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      // return dateB - dateA; 
      return dateB.getTime() - dateA.getTime()
    });

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

  useEffect(() => {
    // if (updatedMsg) {
    //   updateToast({
    //     title: "Todo is updated",
    //     description: deletedMsg,
    //     position: "top",
    //     status: "success",
    //     duration: 4000,
    //     isClosable: true,
    //     id: deletedMsg,
    //   });

    //   return;
    // }

    if (deletedMsg) {
      deleteToast({
        title: "Todo is deleted",
        description: deletedMsg,
        position: "top",
        status: "success",
        duration: 4000,
        isClosable: true,
        id: deletedMsg,
      });
    }
    if (errorMsg) {
      errtoast({
        title: "Todo not deleted",
        description: errorMsg,
        position: "top",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      // return
    }
  }, [updatedMsg, deletedMsg, errorMsg, token]);

  return (
    <>
    

      {/* <Menu >
        <MenuButton ><HamburgerIcon style={{
          color: "white",
          // margin: "40px 70px",
          fontSize: "20px",
          display: "flex",
          justifyContent: "left",
        }}/></MenuButton>
        <MenuList>
          <MenuItem>All</MenuItem>
          <MenuItem>Pending</MenuItem>
          <MenuItem>Completed</MenuItem>
          
        </MenuList>
      </Menu> */}

      <Box
        p={"10px 15px"}
        w={{ base: "100%", sm: "100%", md: "90%", lg: "60%", xl: "50%" }}
        m={"30px auto"}
      >
        <Flex justifyContent={"space-around"} alignItems={"center"} m="10px">
        <Button onClick={handleAllTodos}>All Todos :-{totalTodos}</Button>
        <Button onClick={handlePendingTodos}>Pending</Button>
        <Button onClick={handleCompleted}>Completed</Button>
        </Flex>
        {/* <Text color={"white"}>Total Todos: {</Text> */}
        <Heading color={"#E0E0E0"} size={"md"}>
          TODAY'S TASKS
        </Heading>
      
        { 
         filteredTodos.map((el: any, i: number) => {
          // console.log(el)
          return (
            <Flex
          
              boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
              bgGradient={el.status ?  "linear-gradient(to right, #000046, #01D0A9, #01D0A9)" : "linear(to-r, #000046, #1CB5E0, #01A9DB)"}
              
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
              <Flex alignItems={"center"} gap={"20px"}>
                <Checkbox
                  // isChecked={el.status} name="status" onChange={(e)=>handleStatus(e,el._id,i)}
                  isChecked={el.status}
                  name="status"
                  onChange={() => handleToggle(el._id)}
                  borderColor={"#eb06ff"}
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
                    <Flex gap="5px">
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
                {el.created_at.split("T")[0]}
              </Text>

              <Flex gap={"10px"}>
                <Button
                  // onClick={()=>handleEdit(el._id)}
                  disabled={el.status}
                  onClick={() => {
                    setTitle(el.title);
                    let updatedEditInp = [...editInput];
                    updatedEditInp[i] = !updatedEditInp[i];
                    setEditInput(updatedEditInp);
                  }}
                  _hover={{ backgroundColor: "#237afe" }}
                  borderRadius={"50%"}
                  bg={"#237afe"}
                 
                  color={"gray.200"}
                >
                  {<FaEdit />}
                </Button>

                <Button
                  color={"gray.200"}
                  fontSize={"25px"}
                  w={"40px"}
                  onClick={() => handleDelete(el._id, token)}
                  _hover={{ backgroundColor: "#e65b65" }}
                  bg={"#e65b65"}
                  borderRadius={"50%"}
                >
                  {<FaTrash />}
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
            return <Button key={ind} isDisabled={page==ind+1} border={"2px solid #F57C00"} onClick={()=>setPage(ind+1)}>{ind+1}</Button>
          })
        }
        <IconButton isDisabled={page==totalPages}  onClick={()=>setPage(page+1)}  aria-label='Search database' icon={<ArrowRightIcon />}/>

        </Flex>
         : ""
        } 
      </Box>
    
    </>
  );
};

export default TodoItem;
