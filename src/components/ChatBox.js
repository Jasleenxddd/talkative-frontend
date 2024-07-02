import { Box } from "@chakra-ui/layout";
// import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";
import { useState } from "react";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  

  return <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={5}
      bg= "rgba(44, 78, 99,0.75)" 
        backdropFilter="blur(3px) saturate(180%)"

        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        box-shadow= "0 4px 6px rgba(0, 0, 0, 0.1)"
      height="86.5vh"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="#10354b"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  
};

export default Chatbox;