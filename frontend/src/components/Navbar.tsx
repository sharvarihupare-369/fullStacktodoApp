import { Box, Flex, Heading, Text, Link, Input, useToast,Image } from "@chakra-ui/react";
import React from "react";
import { IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../redux/todoReducer/action";
import { Dispatch } from "redux";
import { logout } from "../redux/authReducer/action";
import { useNavigate } from "react-router-dom";
import signupimg from '../Assets/user.png'
// import {  } from 'react-router-dom'
const Navbar = () => {

  const [toggleSearch,setToggleSearch] = useState(false)
  const [search,setSearch] = useState<string>("")
  const token = localStorage.getItem("todo-token") || "";
  const dispatch:Dispatch<any> = useDispatch()
  const {isLogout,logoutMsg,isError} = useSelector((store:any)=>store.authReducer)
  const toast = useToast()
  const navigate = useNavigate()

  const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch(getTodos(token,search))
  }

  const handleLogout = () => {
    dispatch(logout(token))
  
  }

  useEffect(() => {
    if(isLogout){
      toast({
            title: "User Logged Out",
            description: logoutMsg,
            position: "top",
            status: "success",
            duration: 4000,
            isClosable: true,
            
          });
          localStorage.removeItem("todo-token")
          setTimeout(()=>{
            // navigate("/")
            window.location.reload()
          },4000)
          return;
    }
    if(isError){
      toast({
        title: "Logout failed",
        description: isError,
        position: "top",
        status: "error",
        duration: 4000,
        isClosable: true,
        
      });
    }

  }, [isLogout])
  
  const mothArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month starts from 0, so add 1

  let currdate = "";
  mothArr.forEach((el, ind) => {
    if (month - 1 == ind) {
      currdate += el;
    }
  });

  const date = currentDate.getDate();
  const day = days[currentDate.getDay()];

  const presentDay = `${date}-${currdate}-${year}, ${day}`;
  const currDay = `${currdate} ${date} ${day}`;
  return (
    <>
    <Box color={"white"} w="90%" m="auto">
      {/* <Navbar/> */}
      {/* <Heading>{presentDay}</Heading> */}
      <Flex alignItems={"center"} flexDirection={{base:"column",sm:"column",md:"row",lg:"row",xl:"row","2xl":"row"}} justifyContent={{base:"space-around",sm:"space-around",md:"space-around",lg:"space-around",xl:"space-around","2xl":"space-around"}}>
        <Heading color={"#F57C00"}>{currDay}</Heading>
        
        <Flex  w="55%" alignItems={"center"} justifyContent={"flex-end"}>

      
        {
          token ? <form onSubmit={handleSearch}>
          <Flex gap="5px">

      
          <Input bg="white" color={"gray.700"} focusBorderColor="#FFA726" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search Todos..." /> 
          <IconButton
           type="submit"
           color="#F57C00"
            aria-label="Search database"
            // onClick={()=>setToggleSearch(!toggleSearch)}
            icon={<SearchIcon />}
            />
            </Flex>
            </form>  : ""
       }
       </Flex>
        <Flex w="10%" gap="5px" alignItems={"center"} flexDirection={{base:"column",sm:"column",md:"row",lg:"row",xl:"row","2xl":"row"}} justifyContent={{base:"space-around",sm:"space-around",md:"space-around",lg:"space-around",xl:"space-around","2xl":"space-around"}}>
          {/* <Box> */}
        {/* {
          toggleSearch ? <Input variant='filled' placeholder='Filled' /> : ""

        } */}

      

          <Link
            textDecoration={"none"}
            ml="10px"
            bg="#F57C00"
            p="8px 10px"
            fontSize={"17px"}
            borderTopLeftRadius={"10px"}
            borderBottomRightRadius={"10px"}
            href="/signup"
          >
            {/* <Image src={signupimg} /> */}
            Signup
          </Link>
          {/* </Box> */}
          {/* <Box> */}
          {
            token ?  <Link
            bg="#F57C00"
            p="8px 10px"
            fontSize={"17px"}
            borderTopLeftRadius={"10px"}
            borderBottomRightRadius={"10px"}
            onClick={handleLogout}
          >
            Logout
          </Link> :
            <Link
            bg="#F57C00"
            p="8px 10px"
            fontSize={"17px"}
            borderTopLeftRadius={"10px"}
            borderBottomRightRadius={"10px"}
            href="/login"
            >
            Login
          </Link>
          }
          {/* </Box> */}
        </Flex>
        
      </Flex>
      {/* <Text></Text> */}

     
    </Box>
     {/* <Text color={"gray.300"}>Manage your tasks!</Text> */}
     </>
  );
};

export default Navbar;
