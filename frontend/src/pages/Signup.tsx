import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
    Image

  } from '@chakra-ui/react';
  import { useEffect, useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import 'animate.css';
import { Dispatch } from 'redux';
import { signup } from '../redux/authReducer/action';
import { useNavigate } from 'react-router-dom';
import signupImg from '../Assets/loginvectorimagetodo.png'

 export type Formdata = {
    name : string,
    email : string,
    pass : string,
    age : string,
    
  }
  
  export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch: Dispatch<any>  = useDispatch()
    const {isError,isRegistered} = useSelector((store:any) => store.authReducer)
    const toast = useToast()
    const navigate = useNavigate()

    const [formdata,setFormdata] = useState<Formdata>({
      name:"",
      email:"",
      pass:"",
      age:""
    })
 
   
     
    const handleChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
        const {name,value} = e.target
        setFormdata({...formdata,[name] : value})
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement> ) => {
      e.preventDefault()
      if(!formdata.age || !formdata.name || !formdata.email || !formdata.pass){
        toast({
          title: 'Please fill all the fields',
          // description: ,
          position : 'top',
          status: 'warning',
          duration: 4000,
          isClosable: true,
        })
        return
      }
       dispatch(signup(formdata))
    }



    useEffect(() => {
      if (isError) {
        toast({
          title: 'Registration Failed',
          description: isError,
          position : 'top',
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      }
      else if(isRegistered){
        toast({
          title: 'Success',
          description: isRegistered,
          position : 'top',
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
        setTimeout(()=>{
          navigate("/login")
        },4000)
        setFormdata({ name:"",
        email:"",
        pass:"",
        age:""
      })
      return
      }
    }, [isError, isRegistered])

    
  
    return (
      <Box bg={"#FDF6DF"} 
      bgGradient= "linear(to-r,#333333, #b1b6bc)"
      //  bgGradient="linear(to-r, #000046, #1CB5E0)"  
        // bgSize="cover"
      // bgPosition="center"
       >
      <Flex
        justifyContent={{base:"center",sm:"center",md:"center",lg:"space-around",xl:"space-around","2xl":"space-around"}}
         flexDirection={{base:"column",sm:"column",md:"column",lg:"row",xl:"row","2xl":"row"}} alignItems={"center"} >
       
     
      <form className="animate__animated animate__zoomInDown" style={{width:"50%"}} onSubmit={handleSubmit}>
      <Flex
     
      // w={{base:"90%"}}
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        // bg={useColorModeValue('gray.50', 'gray.800')}
        >
        <Stack  >
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} color={"white"} textAlign={'center'}>
              Sign up
            </Heading>
            {/* <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text> */}
          </Stack>
          <Box
           
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            >
            <Stack spacing={4}>
              <HStack>

                <Box>
                  <FormControl id="firstName">
                    <FormLabel>Name</FormLabel>
                    <Input type="text" value={formdata.name} name="name" onChange={(e)=>handleChange(e)} />
                  </FormControl>
                </Box>
                
              <Box >
                  <FormControl id="lastName">
                    <FormLabel>Age</FormLabel>
                    <Input type="text" value={formdata.age} name="age" onChange={(e)=>handleChange(e)} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" >
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={formdata.email} name="email" onChange={(e)=>handleChange(e)} />
              </FormControl>
              <FormControl id="password" >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} value={formdata.pass} name="pass" onChange={(e)=>handleChange(e)} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                 bg="#212121"
                 type='submit'
                  loadingText="Submitting"
                  size="lg"
                  variant={"unstyled"}
                  // bg={'blue.400'}
                  color={'white'}
                  // _hover={{
                  //   bg: 'blue.500',
                  // }}
                  >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} href="/login">Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      </form>
      {/* <Box w="50%"> */}
      <Box display={{base:"none",sm:"none",md:"none",lg:"block"}} w={{base:"100%",sm:"100%",md:"100%",lg:"50%",xl:"50%"}} mt={{base:"10px",sm:"10px","md":"10px",lg:"0"}} >
          <Image w="100%"  src={signupImg} />
        </Box>
      </Flex>
    </Box>
    );
  }