import React, { FC } from "react";

import {
  Text,
  HStack,
  Button,
  Box
} from "@chakra-ui/react";

import { Icon } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { RiEdit2Fill as Edit } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

interface HeaderProfileProps {
  state: string;
  setState: (state: string) => void;
}

const HeaderProfile: FC<HeaderProfileProps> = ({
  state,
  setState,
}) => {

  const label = state === "EDITPHOTO" ? "Edit Photo" : "My Profile";
  
  return (
    <HStack
      w="95%"
      justify="space-between"
      color="black"
      position="absolute"
      top="0"
      p={4}
      zIndex="10"
      bg="blue.light"
    >
      <Box w="72px" h="40px">
        {state === "VIEW" ? (
          <Button bg="transparent">
            <Icon as={MdArrowBack} w={6} h={6} />
          </Button>
        ) : (
          <Button bg="transparent" onClick={() => setState("VIEW")}>
            <Icon as={RxCross2} w={6} h={6} />
          </Button>
        )}
      </Box>
      <Text fontSize="xl" fontWeight="bold">
        {label}
      </Text>
      <Box w="72px" h="40px">
        {state === "VIEW" ? (
          <Button bg="transparent" onClick={() => setState("EDIT")}>
            <Icon as={Edit} w={6} h={6} />
          </Button>
        ) : (
          null
        )}
      </Box>
    </HStack>
  );
};
  
export default HeaderProfile;
  