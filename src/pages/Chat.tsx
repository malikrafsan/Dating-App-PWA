import React, { useEffect, useState } from "react";
import { BottomNavLayout } from "../layouts";
import { getUsersChat, IUserWithKey } from "../api/chat";
import { Link } from "react-router-dom";
import { VStack, Box } from "@chakra-ui/react";

const Chat = () => {
  const [users, setUsers] = useState<IUserWithKey[]>([]);

  const onMount = async () => {
    const { data } = await getUsersChat();
    console.log(data);
    setUsers(data.users);
  };

  useEffect(() => {
    onMount();
  }, []);

  return (
    <BottomNavLayout>
      <div>
        <VStack>
          {users.map(u => {
            return (
              <Link to={"/chat/" + u.key} key={u.key} style={{
                width: "100%",
              }}>
                <Box bg='tomato'>
                  <h1>Username: {u.username}</h1>
                  <h2>Key: {u.key}</h2>
                </Box>
              </Link>
            );
          })}

        </VStack>
      </div>
    </BottomNavLayout>
  );
};

export default Chat;