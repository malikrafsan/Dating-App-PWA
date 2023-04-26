import React, { FC } from "react";
import {
  Box,
  Text,
} from "@chakra-ui/react";

interface StaticFieldProps {
  label: string;
  value: string;
  id?: string;
}

const StaticField: FC<StaticFieldProps> = ({
  label,
  value,
  id,
}) => {

  return (
    <Box pos="relative"
      display="flex"
      borderRadius="3xl"
      border="1px solid"
      borderColor="blue.secondary"
      bg="blue.light"
      minH="40px"
      width="100%"
      alignItems="center"
      p={4}
    >
    
      <Text
        top="-10px"
        left="20px"
        p="0 12px"
        bg="blue.light"
        color="gray.800"
        pos="absolute"
        w="fit-content"
        h="fit-content"
        zIndex="5"
        fontSize="sm"
      >
        {label}
      </Text>
      <Text
        fontSize="md"
        color="black"
        id={id}
      >
        {value}
      </Text>
    </Box>
  );
};

export default StaticField;
