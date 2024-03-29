import React, { FC, useState, ChangeEventHandler } from "react";
import {
  Input,
  Box,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";

interface InputFieldProps {
  type: string;
  label: string;
  value: string;
  setValue: (value: string) => void;
  errorMessage?: string;
  id?: string;
}

const InputField: FC<InputFieldProps> = ({
  type,
  label,
  value,
  setValue,
  errorMessage,
  id,
}) => {
  const [isActive, setIsActive] = useState(value !== "");

  const handleChange : ChangeEventHandler<HTMLInputElement> = (e) => {
    const text = e.target.value;
    setValue(text);
  };

  return (
    <Box py={2} w="100%">
      <Box pos="relative">
        <Text
          top={isActive ? "0%" : "50%"}
          left={isActive ? "5px" : "0%"}
          transform={
            isActive
              ? "translate(10px,-45%) scale(0.8)"
              : "translate(0%,-50%) scale(1)"
          }
          p={isActive ? "0 12px" : "0 24px"}
          bg={isActive ? "blue.light" : "transparent"}
          color={isActive ? "gray.500" : "gray.300"}
          transformOrigin="top left"
          transition="all .2s ease-out"
          pointerEvents="none"
          pos="absolute"
          w={isActive ? "fit-content" : "100%"}
          h="fit-content"
          zIndex="5"
        >
          {label}
        </Text>
        <Input
          type={type}
          onFocus={() => setIsActive(true)}
          onBlur={() => (value === "" ? setIsActive(false) : setIsActive(true))}
          value={value}
          onChange={handleChange}
          borderRadius="full"
          border="1px solid"
          borderColor="blue.secondary"
          backgroundColor="white"
          id={id}
        />
      </Box>
      {errorMessage ? (
        <Alert
          status="error"
          borderRadius="full"
          color="red.400"
          height={8}
          mt={1}
        >
          <AlertIcon h={4} />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      ) : null}
    </Box>
  );
};

export default InputField;
