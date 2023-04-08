import React, { useState, useEffect } from "react";
import { 
  Box, 
  Text, 
  Input, 
  List, 
  ListItem,
  Alert,
  AlertIcon,
  AlertDescription 
} from "@chakra-ui/react";

type Option = string;

interface Props {
  options: string[];
  value: string;
  label: string;
  setValue: (value: string) => void;
  errorMessage?: string;
  additionalOption?: {
    value: string;
    onClick: () => void;
  }
}

export default function SelectFieldRio({ 
  options, 
  value : _,
  label,
  setValue,
  errorMessage,
  additionalOption,
}: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpenWrapped] = useState(false);
  const [isActive, setIsActiveWrapped] = useState(searchValue !== "");

  const setIsOpen = (isOpen: boolean) => {
    setIsOpenWrapped(isOpen);
  };

  const setIsActive = (isActive: boolean) => {
    setIsActiveWrapped(isActive);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setValue(event.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option: Option) => {
    setSearchValue(option);
    setValue(option);
    setIsOpen(false);
    setIsActive(true);
  };


  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleClickOutside = (event : any) => {
    if (
      event.target.closest(".chakra-list") === null &&
        event.target.closest(".chakra-input") === null
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

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
          value={searchValue}
          onFocus={() => {
            setIsOpen(true);
            setIsActive(true);
          }}
          onChange={handleSearchChange}
          onClick={() => setIsOpen(true)}
          onBlur={() => {
            (searchValue === "" ? setIsActive(false) : setIsActive(true));
            setIsOpen(false);
          }}
          borderRadius="full"
          border="1px solid"
          borderColor="blue.secondary"
          backgroundColor="white"
        />
        {isOpen && filteredOptions.length > 0 && (
          <List
            position="absolute"
            width="100%"
            bg="white"
            border="1px solid gray"
            zIndex="1"
            mt={2}
            maxH="80vh"
            overflowY="auto"
            style={{zIndex: 6}}
            onBlur={() => setIsOpen(false)}
          >
            {filteredOptions.map((option) => (
              <ListItem
                key={option}
                px={4}
                py={2}
                _hover={{ bg: "gray.100" }}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </ListItem>
            ))}
            {
              additionalOption && (
                <ListItem
                  key={additionalOption.value}
                  px={4}
                  py={2}
                  _hover={{ bg: "gray.100" }}
                  onClick={additionalOption.onClick}
                >
                  {additionalOption.value}
                </ListItem>
              )
            }
          </List>
        )}
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
}
