import {
  Icon,
  Text,
  Center,
} from "@chakra-ui/react";
import React from "react";
import { TiWarning } from "react-icons/ti";

const FullPageError = ({ message }: { message: string }) => {
  return (
    <Center w="100%" h="100vh" display="flex" flexDirection="column">
      <Icon as={TiWarning} boxSize={50} color="pink.dark" />
      <Text color="pink.dark" fontSize="xl" fontWeight="bold" ml={2}>
        {message}
      </Text>
    </Center>
  );
};


export default FullPageError;