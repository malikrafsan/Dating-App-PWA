import React, { useEffect, useState } from "react";
import { BottomNavLayout } from "../layouts";
import { Link } from "react-router-dom";
import { VStack, HStack, Box, Text, Image, Divider, Icon, Button } from "@chakra-ui/react";

import { BsFillSearchHeartFill as Search } from "react-icons/bs";

import { Chat } from "../api";
import { onMessageListener } from "../context-providers/MessagingProvider";

interface IMatchList {
  key: number,
  userId: number,
  userName: string,
  lastMsg: string,
  unreadCount: number,
  photo: string,
  timestamp: string,
}

const MatchList = () => {
  const { getMatchList } = Chat;

  const [matchList, setMatchList] = useState<IMatchList[]>([]);

  const onMount = async () => {
    const result = await getMatchList();
    const matchList = result.data.data.chats.map((chat: any) => {
      console.log("chat",chat);
      return {
        key: chat.id,
        userId: chat.user2.id,
        userName: chat.user2.name,
        lastMsg: chat.messages[0]?.content || "",
        unreadCount: chat.unreadCount,
        photo: chat.user2.userPhoto?.find((p: any) => p.index === 0)?.fileId || "",
        timestamp: chat.timestamp,
      };
    });
    setMatchList(matchList);
  };
  
  onMessageListener().then(payload => {
    const data = payload.data;
    console.log(data);
    setMatchList((x) => {
      const idx = x.findIndex((d) => d.userId == data?.fromId);
      if (idx !== -1) {
        return [
          ...x.slice(0, idx),
          {
            ...x[idx],
            lastMsg: data?.text || "",
            unreadCount: x[idx].unreadCount + 1,
          },
          ...x.slice(idx+1),
        ];
      }
      return x;
    });
  });

  useEffect(() => {
    onMount();
  }, []);



  const getDisplayedTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();   
        
    const today = new Date();
    if (date.getDate() === today.getDate()) {
      return `${hour}:${minute}`;
    } else {
      return `${month} ${day}`;
    }
  };

  return (
    <BottomNavLayout>
      <Box
        background="blue.dark"
        height="100vh - 80px"
      >
        <Box
          height="80px"
          padding={4}
          color="white"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Text fontSize='2xl' fontWeight='bold'>Match List</Text>
          </Box>
          <Box>
          
            <Button
              height="100%"
              width="100%"
              padding={2}
              background="transparent"
            //  onClick={handleSearchChat}
            >
              <Icon as={Search} w={8} h={8} />
            </Button>
          </Box>
        </Box>
        <Box
          background="white"
          overflow="scroll"
          boxShadow="0px -7px 20px 0px rgba(255, 128, 232, 0.25)"
          height="calc(100vh - 80px - 80px)"
          p={4}
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <VStack>
            {matchList.map((match: any, idx) => (
              <React.Fragment key={match.key}>
                <Box w="100%" p={1} id={"matchlist-" + idx}>
                  <Link to={"/chat/" + match.userId}>
                    <HStack
                      w="100%"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box
                        w="20%"
                        h="75px"
                      >
                        <Image
                          src={match.photo ? `https://drive.google.com/uc?export=view&id=${match.photo}` : "/images/blank_profile.png"}
                          rounded="full"
                          boxSize="75px"
                          objectFit="cover"
                          boxShadow="0 25px 50px -12px rgba(87, 42, 180, 0.25);"
                        />
                      </Box>
                      <Box
                        w="65%"
                        h="100%"
                        textAlign="left"
                      >
                        <Text fontWeight="bold">{match.userName}</Text>
                        <Text>{match.lastMsg}</Text>
                      </Box>
                      <Box
                        w="15%"
                        h="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-end"

                      >
                        {match.unreadCount > 0 &&
                      <Box
                        w="25px"
                        h="25px"
                        rounded="full"
                        bg="blue.primary"
                        color="white"
                        textAlign="center"
                        display="flex"
                        alignItems="end"
                        justifyContent="center"
                      >
                        <Text>{match.unreadCount}</Text>
                      </Box>
                        }
                        <Text>{getDisplayedTime(match.timestamp)}</Text>
                      </Box>
                    </HStack>

                  </Link>
                </Box>

                {
                  matchList.indexOf(match) !== matchList.length - 1 && 
                <Divider
                  orientation="horizontal"
                  color="blue.secondary"
                  w="100%"
                  h="2px"
                  bg="blue.secondary"
                />
                }
              </React.Fragment>

            ))}
          </VStack>
        </Box>
      </Box>
    </BottomNavLayout>
  );
};

export default MatchList;