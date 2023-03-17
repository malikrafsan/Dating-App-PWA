import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";

const FullPageLoading = () => {
  return (
    <Center w="100%" h="100vh">
      <Spinner size="xl" borderWidth={4}/>  
    </Center>
  );
};


export default FullPageLoading;