import { Container,Box,Text, Tab,TabList,TabPanel,TabPanels,Tabs, } from '@chakra-ui/react'
import {React,useEffect} from 'react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { ChakraProvider } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const history=useNavigate();

    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("userInfo"));
        

        if(user){
            // history.push("/chats");
        }
    },[history])
  return (
    <Container maxW='xl' centerContent>
        <Box
        d='flex'
        justifyContent="center"
        p={3}
        // bg={"#9d9d9d"}
        w="100%"
        m="0 0 15px 0"
        // borderRadius="5px"
        // borderWidth="1px"
        // borderColor={"#9d9d9d"}
        >
            <Text
            fontSize="6xl"
            fontFamily="Fantasy"
            textAlign="center"
            textColor={"#10354b"}
            >
                Talk-<span style={{color:"#e77a8a", fontSize:"80px"}}>A</span>-Tive
            </Text>
        </Box >
        <Box bg= "rgba(44, 78, 99,0.75)" 
        backdropFilter="blur(5px) saturate(180%)"

        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        box-shadow= "0 4px 6px rgba(0, 0, 0, 0.1)"
        color="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" borderColor="#10354b">
            <ChakraProvider>
            <Tabs isFitted variant="soft-rounded" colorScheme="teal" >
            <TabList mb="1em" >
            <Tab  color="white" width="50%">Login</Tab>
            <Tab color="white" width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Login />
                </TabPanel>
                <TabPanel>
                    <Signup />
                </TabPanel>
            </TabPanels>
        </Tabs>
            </ChakraProvider>
        
        </Box>
    </Container>
  )
}

export default Homepage;
