import React, { FC } from "react";

import {
  HStack,
  Button,
  Box,
  Heading
} from "@chakra-ui/react";

import { Icon } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { RiEdit2Fill as Edit, RiDeleteBin6Fill as Trash } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";

interface HeaderChannelProps {
  state: string;
  setState: (state: string) => void;
  onClose: () => void;
  onDelete: () => void;
}

const HeaderChannel: FC<HeaderChannelProps> = ({
  state,
  setState,
  onClose,
  onDelete,
}) => {
  // const navigate = useNavigate();
  // const label = state === "EDITPHOTO" ? "Edit Channel" : "";
    
  // const handleClick = (button: string) => {
  //   console.log(button);  
  // };

  return (
    <HStack
      color="black"
      top="0"
      p={4}
      zIndex="10"
    >
      <Box w="72px" h="40px">
        {state === "EDIT" ? (
          <Button
            bg="transparent"
            onClick={() => setState("VIEW")}>
            <Icon 
              as={MdArrowBack} w={6} h={6}
            />
          </Button>
        ) : (
          <Button
            bg="transparent" 
            onClick={onClose}>
            <Icon as={RxCross2} w={6} h={6}/>
          </Button>
        )}
      </Box>
      <Heading
        fontSize={"2xl"} 
        fontFamily={"body"}
        mt="0"
        flexGrow={1}
      >
        { state === "VIEW" ? "View Channel" : state === "ADD" ? "Add Channel" : "Edit Channel" }
      </Heading>
      <Box h="40px">
        {state === "VIEW" ? (
          <HStack>
            <Button bg="transparent" onClick={() => setState("EDIT")} padding="2" id="edit-channel-btn">
              <Icon as={Edit} w={6} h={6} />
            </Button>
            <Button bg="transparent" onClick={onDelete} padding="2" id="delete-channel-btn">
              <Icon as={Trash} w={6} h={6} />
            </Button>
          </HStack>
        ) : (
          null
        )}
      </Box>
    </HStack>
  );
};
  
export default HeaderChannel;
  