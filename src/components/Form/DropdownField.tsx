import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import {
  Box,
  Text,
  Alert,
  AlertIcon,
  AlertDescription
} from "@chakra-ui/react";

interface IDropdownFieldProps {
  options: string[];
  value: string;
  onChange: (props: {
    value: string;
    label: string;
  } | null) => void;
  onCreateOption?: (value: string) => void;
  label: string;
  errorMessage?: string;
  id?: string;
}

const DropdownField = (props: IDropdownFieldProps) => {
  const { options, value, onChange, onCreateOption, label, errorMessage, id } = props;
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    setIsActive(searchValue !== "" || value !== "");
  }, [searchValue, value]);

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

        {
          onCreateOption ? (
            <CreatableSelect
              isClearable
              isSearchable
              id={id}
              value={{
                value: value,
                label: value,
              }}
              onChange={(val) => {
                console.log("val inside", val);
                onChange(val ? val : null);
              }}
              onInputChange={(val) => {
                setSearchValue(val);
              }}
              onCreateOption={onCreateOption}
              options={options.map((item) => ({ value: item, label: item }))}
              styles={{
                control: (style) => ({
                  ...style,
                  borderStartEndRadius: "9999px",
                  borderStartStartRadius: "9999px",
                  borderEndEndRadius: "9999px",
                  borderEndStartRadius: "9999px",
                  paddingInline: "1rem",
                  borderColor: "blue.secondary",
                  borderBlockWidth: "1px",
                  borderBlockStyle: "solid",
                  backgroundColor: "white",
                }),
                input: (style) => ({
                  ...style,
                }),
                placeholder: (styles) => ({
                  ...styles,
                  color: "black",
                })
              }}
              placeholder=""
            />) : (
            <Select
              isClearable
              isSearchable
              id={id}
              value={{
                value: value,
                label: value,
              }}
              defaultInputValue={value}
              // inputValue={value}
              onChange={(val) => {
                onChange(val ? val : null);
              }}
              onInputChange={(val) => {
                setSearchValue(val);
              }}
              options={options.map((item) => ({ value: item, label: item }))}
              styles={{
                control: (style) => ({
                  ...style,
                  borderStartEndRadius: "9999px",
                  borderStartStartRadius: "9999px",
                  borderEndEndRadius: "9999px",
                  borderEndStartRadius: "9999px",
                  paddingInline: "1rem",
                  borderColor: "blue.secondary",
                  borderBlockWidth: "1px",
                  borderBlockStyle: "solid",
                  backgroundColor: "white",
                }),
                input: (style) => ({
                  ...style,
                }),
                placeholder: (styles) => ({
                  ...styles,
                  color: "black",
                }),
                menu: (styles) => ({
                  ...styles,
                  zIndex: 10,
                })
              }}
              placeholder=""

            />
          )
        }


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

export default DropdownField;