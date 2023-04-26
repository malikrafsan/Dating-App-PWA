import {
  Heading,
  Avatar,
  Box,
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";

import React, {useState} from "react";

import {
  HeaderChannel, 
  UpdatableImage, 
  InputField
} from "../../components";

import {
  Channel,
} from "../../api";

type ChannelProfileProps = {
  slug: string;
  name: string;
  logo: string;
  isAdd: boolean;
  isOpen: boolean;
  onClose: () => void;
  setValue: (val: string) => void;
  onChange: () => void;
};

export default function ChannelProfile(
  { name, logo, isOpen, onClose, setValue, slug, isAdd, onChange}: ChannelProfileProps) {
  
  const [state, setState] = useState(isAdd? "ADD":"VIEW"); 
  const [errorMessage, setErrorMessage] = useState("");
  
  const [channel, setChannel] = useState<string>(name);
  const slugChannel = slug;
  const [logoUrl, setLogoUrl] = useState<string>(logo);
  
  const handleChange = (val: string) => {
    setChannel(val);
  };

  const handleSave = async () => {
    if (channel === "") {
      setErrorMessage("Please enter a channel name");
      return;
    }
    await Channel.updateUniversity(slugChannel, {name:channel});

    setValue(channel);
    setState("VIEW");
    onChange();
  };
  
  const handleUpdatePhoto = async (val: File | null) => {
    if (!val) return;

    const formData = new FormData();
    formData.append("file", val);
    const {data} = await Channel.updateUniversityLogo(slug, formData);
    setLogoUrl(data.university.logoFileId);
    onChange();
  };

  const handleDelete = async () => {
    await Channel.deleteUniversity(slugChannel);
    onClose();
    onChange();
  };

  const handleAdd = async () => {
    if (channel === "") {
      setErrorMessage("Please enter a channel name");
      return;
    }
    await Channel.createUniversity(channel);
    setValue(channel);
    setState("VIEW");
    onChange();
    onClose();
  };

  let viewComponent;
  if (state === "VIEW") {
    viewComponent = 
      <>
        <Avatar
          size={"2xl"}
          src={`https://drive.google.com/uc?export=view&id=${logoUrl}`} 
          mt={8}
          mb={16}
          pos={"relative"}
          _after={{
            content: "\"\"",
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading 
          fontSize={"2xl"} 
          fontFamily={"body"} 
          mb="12">
          {channel}
        </Heading>
      </>
    ;
  } else if (state === "ADD") {
    viewComponent = 
      <Box width={"80%"} pb="6">
        <VStack spacing="6">
          <Avatar
            size={"2xl"}
            src={`https://drive.google.com/uc?export=view&id=${logoUrl}`} 
            mt={8}
            mb={8}
            pos={"relative"}
            _after={{
              content: "\"\"",
              w: 4,
              h: 4,
              bg: "green.300",
              border: "2px solid white",
              rounded: "full",
              pos: "absolute",
              bottom: 0,
              right: 3,
            }}
          />
          <InputField
            type="text"
            label="Channel name"
            value={channel}
            setValue={(val) => handleChange(val)}
            errorMessage={errorMessage}
          />
          <Button
            w="80%" 
            variant="solidBlue" 
            mt={4}
            onClick={handleAdd}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.300",
            }}
            _focus={{
              bg: "blue.300",
            }}>
            Add Channel
          </Button>
        </VStack>
      </Box>
    ;
  } else {
    viewComponent =
      <VStack spacing="6"  width={"80%"} pb="6">
        <UpdatableImage 
          id="logo" 
          src={logoUrl ? `https://drive.google.com/uc?export=view&id=${logoUrl}`: ""} 
          isSquare={false} 
          w="200px" 
          h="200px" 
          handleUpdate={val => handleUpdatePhoto(val)}
        />
        <VStack spacing="2">
          <Box width="98%">
            <InputField
              type="text"
              label="Channel name"
              value={channel}
              setValue={(val) => handleChange(val)}
              errorMessage={errorMessage}
            />
          </Box>
          <Button
            w="100%" 
            variant="solidBlue" 
            mt={4}
            onClick={() => handleSave()}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.300",
            }}
            _focus={{
              bg: "blue.300",
            }}>
            Save
          </Button>
        </VStack>
      </VStack>
    ;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HeaderChannel 
            state={state} 
            setState={setState}
            onClose={onClose}
            onDelete={handleDelete}/>
        </ModalHeader>
        <ModalBody display="flex" alignItems="center" justifyContent="center" flexDir="column">
          {viewComponent}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}