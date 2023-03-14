import React, { FC, useState, ChangeEventHandler } from "react";
import {
  Select,
  Box,
  Text,
} from "@chakra-ui/react";

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  setValue: (value: string) => void;
}

const SelectField: FC<SelectFieldProps> = ({
  label,
  value,
  options,
  setValue,
}) => {
  const [isActive, setIsActive] = useState(value !== "");

  const handleChange : ChangeEventHandler<HTMLSelectElement> = (e) => {
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
        <Select
          onFocus={() => setIsActive(true)}
          onBlur={() => (value === "" ? setIsActive(false) : setIsActive(true))}
          value={value}
          onChange={handleChange}
          borderRadius="full"
          border="1px solid"
          borderColor="blue.secondary"
          backgroundColor="white"
          placeholder={`Select ${label}`}
        >
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default SelectField;
