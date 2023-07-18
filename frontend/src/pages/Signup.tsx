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

  } from '@chakra-ui/react';
  import { useEffect, useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { signup } from '../redux/authReducer/action';

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
       dispatch(signup(formdata))
       setFormdata("")
      
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
      }
    }, [isError, isRegistered])

    
  
    return (
      <Box bg={"#FDF6DF"} minH={"100vh"}>
      <form onSubmit={handleSubmit}>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        // bg={useColorModeValue('gray.50', 'gray.800')}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" value={formdata.name} name="name" onChange={(e)=>handleChange(e)} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Age</FormLabel>
                    <Input type="text" value={formdata.age} name="age" onChange={(e)=>handleChange(e)} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={formdata.email} name="email" onChange={(e)=>handleChange(e)} />
              </FormControl>
              <FormControl id="password" isRequired>
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
                 type='submit'
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
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
    </Box>
    );
  }