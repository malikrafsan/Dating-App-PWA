import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Auth } from "../api";
import { db } from "../lib/firebase";
import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore";
import { SelfData } from "../types/response";
import { MsgType } from "../types/struct";
import { v4 as uuid } from "uuid";
import { VStack, Box } from "@chakra-ui/react";

const ChatDetail = () => {
  const [self, setSelf] = useState<SelfData>();
  const [msgs, setMsgs] = useState<MsgType[]>([]);
  const [inputMsg, setInputMsg] = useState("");

  const navigate = useNavigate();

  const { key } = useParams();
  if (!key) {
    navigate("/chat");
  }

  const onMount = async (key: string) => {
    const {data} = await Auth.self();
    console.log("data",data);
    setSelf(data);

    const docRef = doc(db, "chats", key);

    const getDocRes = await getDoc(docRef);
    if (!getDocRes.exists()) {
      await setDoc(doc(db, "chats", key), {
        message: []
      });
    }
  };

  useEffect(() => {
    if (!key) {
      return;
    }

    onMount(key);

    const docRef = doc(db, "chats", key);
    const unsub = onSnapshot(docRef, (doc) => {
      const data = doc.data();
      console.log("Current data: ", data);
      if (!data) {
        return;
      }

      const { message } = data;
      const parsedMsgs = message.map((m: string) => JSON.parse(m));
      setMsgs(parsedMsgs);
    });

    return () => {
      unsub();
    };
  }, [key]);

  const formatMsg = (msg: string, username: string) => {
    const obj: MsgType = {
      id: uuid(),
      msg,
      timestamp: new Date().getTime(),
      sender: username,
    };
    return JSON.stringify(obj);
  };

  const send = async () => {
    if (!key || !self) {
      return;
    }

    const getDocRes = await getDoc(doc(db, "chats", key));
    if (!getDocRes.exists()) {
      return;
    }

    const { message } = getDocRes.data();
    console.log(message, self);
    const formatted = formatMsg(inputMsg, self.account.username);

    const newMessage = [...message, formatted];
    console.log(newMessage);
    await setDoc(doc(db, "chats", key), {
      message: newMessage
    });
  };


  return (
    <div>
      <h1>Chat with {key}</h1>
      <div>
        <h1>chat content</h1>
        <VStack>
          {
            msgs.map((e) => {
              return (
                <Box bg='tomato' style={{
                  width: "100%",
                }} key={e.id}>
                  <h1>sender: {e.sender}</h1>
                  <h2>msg: {e.msg}</h2>
                </Box>
              );
            })
          }
        </VStack>
      </div>
      <div>
        <input type="text" value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} />
        <button onClick={send}>Send</button>
      </div>

    </div>
  );
};

export default ChatDetail;