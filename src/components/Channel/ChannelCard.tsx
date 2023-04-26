import{ Box, Flex, Text, Avatar } from "@chakra-ui/react";
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
      _hover={{
        cursor: "pointer",
      }}
      onClick={onClick}>
      <Flex justifyContent="left" alignItems="center">
        <Avatar size='md' mx="4" name={name} src={logo ? `https://drive.google.com/uc?export=view&id=${logo}` : ""} />
        <Text fontSize="lg">{name}</Text>
      </Flex>
    </Box>
  );
};

export default ChannelCard;
