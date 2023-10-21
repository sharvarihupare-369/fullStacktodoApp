import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Image
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { login } from '../redux/authReducer/action';
import { useLocation, useNavigate } from 'react-router-dom';
import signupImg from '../Assets/signup.avif'
import loginImg from '../Assets/loginvectorimagetodo.png'
import 'animate.css';

export default function Login() {

  const [email,setEmail] = useState("")
  const [pass,setPass] = useState("")
  const toast = useToast()
  const dispatch: Dispatch<any> = useDispatch()
  const {isAuth,token,isError} = useSelector((store:any) => store.authReducer)
  const navigate = useNavigate()
  const location = useLocation()
  // console.log(token)

   const handleLogin = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
       const userDetails = {
        email,
        pass
       }
       dispatch(login(userDetails))

   }

   useEffect(()=>{
      if(token){
        localStorage.setItem("isAuth",JSON.stringify(isAuth))
        if(location.pathname === '/login'){
        toast({
          title: 'Success',
          description: 'User Logged in successfully',
          position : 'top',
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
        localStorage.setItem("todo-token",token)
        setTimeout(() => {
          navigate('/');
        }, 4000);
      }
      }
      else if(isError){
        toast({
          title: 'Login Failed',
          description: isError,
          position : 'top',
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      }
   },[isAuth,token,isError])


  return (
    <Box
    //  bg={"#FDF6DF"} 
    // bgGradient="linear(to-r, #000046, #1CB5E0)"  
      bgGradient= "linear(to-r,#333333, #b1b6bc)"
      // bgSize="cover"
      // bgPosition="center"
       minH={"100vh"}
      >
      <Flex justifyContent={"space-around"} alignItems={"center"}>
      <Box  display={{base:"none",sm:"none",md:"none",lg:"block"}} w={{base:"100%",sm:"100%",md:"100%",lg:"50%",xl:"50%"}} mt={{base:"10px",sm:"10px","md":"10px",lg:"0"}}>
          <Image w="100%"  src={loginImg} />
        </Box>
      <form className="animate__animated animate__zoomInDown" style={{width:"50%"}} onSubmit={handleLogin}>

    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      justifyContent={{base:"center",sm:"center",md:"center",lg:"space-around",xl:"space-around","2xl":"space-around"}}
      flexDirection={{base:"column",sm:"column",md:"column",lg:"row",xl:"row","2xl":"row"}}
      // bg={useColorModeValue('gray.50', 'gray.800')}
      >
      <Stack spacing={8} mx={'auto'} w={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color={"white"}>Login to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            {/* to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️ */}
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="pass" value={pass} onChange={(e)=>setPass(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              {/* <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack> */}
             
              <Button
                type='submit'
                // bg={'blue.400'}
                bg="#212121"
                color={'white'}
                // _hover={{
                //   bg: 'blue.500',
                // }}
                variant={"unstyled"}
                >
                Sign in
              </Button>
              <Text align={'center'}>
                  Not Registered? <Link color={'blue.400'} href={"/signup"} >Signup</Link>
                </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
     </form>
     
      </Flex>
    </Box>
  );
}