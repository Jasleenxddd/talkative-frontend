import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/menu";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user, setSelectedChat,notification,setNotification,chats,setChats } = ChatState();
  const navigate = useNavigate();
  const toast=useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();


  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      // bg="#768a96"
      // bg="#b6d6db"
      bg="#10354b"
      // bg= "rgba(44, 78, 99,0.75)" 
      //   backdropFilter="blur(3px) saturate(180%)"

      //   boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      //   box-shadow= "0 4px 6px rgba(0, 0, 0, 0.1)"
      w="100%"
      p="5px 10px 5px 10px"
      borderWidth="5px"
      borderColor="#10354b"
    >
      <Tooltip 
        label="Search Users to chat"
        hasArrow
        placement='bottom-end'
      >
        <Button colorScheme='teal' variant='ghost' onClick={onOpen}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <Text fontSize="16px" style={{color:"#a8c5ca"}} display={{ base: "none", md: "flex" }} px={4}>
            Search User
          </Text>
        </Button>
      </Tooltip>
      <Text fontSize="3xl" fontFamily="Fantasy" color="#a8c5ca">
      Talk-<span style={{color:"#e77a8a", fontSize:"36px"}}>A</span>-Tive
      </Text>
      <div>
        <Menu>
          <MenuButton p={1}>
          <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
<BellIcon color="white" fontSize="2xl" m={1} />
</MenuButton>
          <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
        </Menu>
        <Menu >
          <MenuButton as={Button} bg="#10354b" rightIcon={<ChevronDownIcon color="white"/>}>
            <Avatar
              size="sm"
              cursor="pointer"
              name={user.name}
              src={user.pic}
            />
          </MenuButton>
          <MenuList bg="#e7f2f4">
            <ProfileModal user={user}>
              <MenuItem bg="#e7f2f4">My Profile</MenuItem>
            </ProfileModal>
            <MenuDivider />
            <MenuItem bg="#e7f2f4" color= "#cd3348" onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
    <Drawer bg="#b6d6db" placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent >
            <DrawerHeader bg="#53b0aa" borderBottomWidth="1px">
                Search Users
            </DrawerHeader>
            <DrawerBody  bg="#e7f2f4">
  <Box display='flex' alignItems='center' paddingBottom={2}>
    <Input
      bg="#d1e9ee"
      placeholder="Search by name or email"
      marginRight={2}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <Button 
    color="white"
    bg="#10354b"
    onClick={handleSearch}
    >Go</Button>
  </Box>
  {loading ? (
        <ChatLoading />
            ) : (
                searchResult?.map((user) => (
                    <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => accessChat(user._id)}
                    />
                ))
            )}
            {loadingChat&&<Spinner ml='auto' d='flex'/>}
</DrawerBody>
        </DrawerContent>
    </Drawer>

    </>
    
  );
};

export default SideDrawer;
