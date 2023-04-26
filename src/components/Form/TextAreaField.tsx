import React, { FC, useState, ChangeEventHandler } from "react";
import {
  Textarea,
  Box,
  Text,
} from "@chakra-ui/react";

interface TextAreaFieldProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  minH?: string;
  id?: string;
}

const TextAreaField: FC<TextAreaFieldProps> = ({
  label,
  value,
  setValue,
  placeholder,
  minH,
  id,
}) => {
  const [isActive, setIsActive] = useState(value !== "");

  const handleChange : ChangeEventHandler<HTMLTextAreaElement> = (e) => {
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
        <Textarea
          onFocus={(e) => {
            setIsActive(true);
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
          }}
          onBlur={() => (value === "" ? setIsActive(false) : setIsActive(true))}
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
          }}
          value={value}
          onChange={handleChange}
          borderRadius="3xl"
          border="1px solid"
          borderColor="blue.secondary"
          backgroundColor="white"
          resize="none"
          overflow="hidden"
          minH={minH || "100px"}
          placeholder={placeholder}
          id={id}
        />
      </Box>
    </Box>
  );
};

export default TextAreaField;
