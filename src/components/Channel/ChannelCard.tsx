import{ Box, Flex, Text, Image } from "@chakra-ui/react";
import React from "react";

type ChannelCardProps = {
  name: string;
  logo: string;
  onClick: () => void;
};

const ChannelCard = ({ name, logo, onClick }: ChannelCardProps) => {
  return (
    <Box 
      borderTop="2px" 
      pt="4" 
      pb="4" 
      borderColor="gray.300"
      onClick={onClick}>
      <Flex justifyContent="left" alignItems="center">
        <Image 
          src={`https://drive.google.com/uc?export=view&id=${logo}`}  
          alt={name} 
          boxSize="50px" 
          mr="4" 
          rounded="full" 
          ml="4"/>
        <Text fontSize="lg">{name}</Text>
      </Flex>
    </Box>
  );
};

export default ChannelCard;
