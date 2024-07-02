import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);

    const {user}=ChatState();

  return (

   <div style={{ width: "100%" }}>
  {user && <SideDrawer />}
  <Box 
  
  display="flex"
  justifyContent="space-between"
  // alignItems="center" 
  w="100%" 
  // h="91.5vh" 
  p="15px">
    
    {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
  </Box>
</div>
    );
};

export default ChatPage;
