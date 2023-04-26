import React, { useEffect, useState, useRef } from "react";
import { BottomNavLayout } from "../layouts";
import { Link } from "react-router-dom";
import { VStack, HStack, Box, Text, Image, Icon, Button } from "@chakra-ui/react";
import { TextAreaField } from "../components";

import { RiSendPlaneFill as Send } from "react-icons/ri";
import { MdArrowBackIosNew as Back } from "react-icons/md";

import { useParams } from "react-router";

import { Chat } from "../api";

// import useMessaging 
import { onMessageListener } from "../context-providers/MessagingProvider";


const ChatDetail = () => {
  const { getMessages, sendMessage } = Chat;
  const { id } = useParams();
  const bottomRef = useRef(null);

  const [chatList, setChatList] = useState([]);
  const [otherUser, setOtherUser] = useState({});

  const onMount = async () => {
    const result = await getMessages(id);
    const user = result.data.data.messages.match.user2;
    const otherUser = {
      name: user.name,
      photo: user.userPhoto.find((p: any) => p.index === 0).fileId,
      university: user.universitySlug
    };
    setOtherUser(otherUser);

    const chatList = result.data.data.messages.messages.map((chat) => {
      return {
        key: chat.id,
        user: chat.senderId === parseInt(id) ? 2 : 1,
        msg: chat.content,
        timestamp: chat.timestamp,
      };
    });
    setChatList(chatList);

  };


  useEffect(() => {
    onMount();
  }, []);

  onMessageListener().then(async (_) => {
    const result = await getMessages(id);
    const chatList = result.data.data.messages.messages.map((chat) => {
      return {
        key: chat.id,
        user: chat.senderId === parseInt(id) ? 2 : 1,
        msg: chat.content,
        timestamp: chat.timestamp,
      };
    });
    setChatList(chatList);
  //   const msgId = msg.data.messageId;
  //   const timestamp = msg.data.timestamp;
  //   // const toId = msg.data.toId;
  //   const fromId = msg.data.fromId;
  //   const content = msg.data.text;
  //   const newChatList = [
  //     ...chatList,
  //     {
  //       key: msgId,
  //       user: fromId === id ? 2 : 1, // lawan
  //       msg: content,
  //       timestamp: timestamp,
  //     },
  //   ];
  //   setChatList(newChatList);
  });

  const [newMsg, setNewMsg] = useState("");
  const handleSendMsg = () => {
    try {
      sendMessage(parseInt(id), newMsg);
      const newChatList = [
        ...chatList,
        {
          key: chatList.length + 1,
          user: 1,
          msg: newMsg,
          timestamp: new Date().toISOString(),
        },
      ];
      setChatList(newChatList);
      setNewMsg("");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: "smooth"});
  }, [chatList]);


  const getDisplayedTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${hour}:${minute}`;

  };

  const getDisplayedDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();

    const dates = `${month} ${day}, ${year}`;
    return dates;
  };

  return (
    <BottomNavLayout>
      <Box
        background="blue.dark"
        height="100vh - 80px"
      >
        <Box
          height="100px"
          p={4}
          color="white"
        >
          <HStack
            w="100%"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Button
              p={1}
              background="transparent"
            >
              <Link to="/matchlist">
                <Icon as={Back} w={8} h={8} />
              </Link>
            </Button>
            <Box
              w="20%"
            >
              <Image
                src={`https://drive.google.com/uc?export=view&id=${otherUser.photo}`}
                rounded="full"
                boxSize="64px"
                objectFit="cover"
                boxShadow="0 25px 50px -12px rgba(87, 42, 180, 0.25);"
              />
            </Box>
            <Box
              w="65%"
              textAlign="left"
            >
              <Text fontWeight="bold">{otherUser.name}</Text>
              <Text>{otherUser.university}</Text>
            </Box>
          </HStack>
        </Box>
        
        <Box
          background="white"
          borderTopRadius="30px"
          overflow="scroll"
          height="calc(100vh - 270px)"
          boxShadow="0px -7px 20px 0px rgba(255, 128, 232, 0.25)"
          p={4}
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <VStack>
            {chatList.map((chat: any) => (
              <React.Fragment key={chat.key}>
                {
                  (chatList.indexOf(chat) === 0 || (
                    getDisplayedDate(chatList[chatList.indexOf(chat) - 1].timestamp) !==
                      getDisplayedDate(chat.timestamp))) && (
                    <Text
                      bg="gray.400"
                      color="white"
                      fontSize="xs"
                      alignSelf="center"
                      marginBottom={2}
                      borderRadius="100px"
                      px={2}
                      py={1}
                    >
                      {getDisplayedDate(chat.timestamp)}
                    </Text>
                  )
                }
                <Box
                  width="100%"
                  p={1}
                  display="flex"
                  flexDirection={chat.user === 1 ? "row-reverse" : "row"}
                  justifyContent="flex-start"
                >
                  <Box
                    background={chat.user === 1 ? "blue.dark" : "gray.200"}
                    color={chat.user === 1 ? "white" : "black"}
                    padding={4}
                    borderRadius="30px"
                    borderBottomLeftRadius={chat.user === 2 ? "0" : "30px"}
                    borderBottomRightRadius={chat.user === 1 ? "0" : "30px"}
                    maxWidth="70%"
                  >
                    <Text>{chat.msg}</Text>
                  </Box>
                  <Text
                    color="gray.400"
                    fontSize="xs"
                    alignSelf="flex-end"
                    marginLeft={2}
                  >
                    {getDisplayedTime(chat.timestamp)}
                  </Text>
                </Box>
              </React.Fragment>
            ))}
            <div ref={bottomRef} />
          </VStack>
        </Box>
        <Box
          background="#F3EEFF"
          padding={4}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
          position="absolute"
          bottom="80px"
          width="100%"
        >
          <Box
            background="#F3EEFF"
            width="85%"
          >
            <TextAreaField
              label=""
              value={newMsg}
              setValue={(val) => setNewMsg(val)}
              placeholder="Type your message here"
              minH="10px"
            />

          </Box>
          <Box
            width="12%"
            textAlign="center"
            height="50px"
          >
            <Button
              height="100%"
              width="100%"
              padding={0}
              background="transparent"
              onClick={handleSendMsg}
            >
              <Icon as={Send} w="2em" h="2em"/>
            </Button>
          </Box>
        </Box>

      </Box>
    </BottomNavLayout>
  );
};

export default ChatDetail;