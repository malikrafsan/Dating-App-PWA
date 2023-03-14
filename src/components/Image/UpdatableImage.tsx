import React, { FC, useEffect, useState } from "react";

import {
  Image,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { Icon } from "@chakra-ui/react";
import { RiEdit2Fill as Edit } from "react-icons/ri";
import { FaPlus as Plus } from "react-icons/fa";
import { MdOutlineDelete as Delete, MdOutlineFileUpload as Upload } from "react-icons/md";

interface UpdatableImageProps {
  id: string;
  src?: string;
  alt?: string;
  isSquare?: boolean;
  w?: string;
  h?: string;
  handleUpdate: (val: FormData, key: string) => void;
}

const UpdatableImage: FC<UpdatableImageProps> = ({
  id,
  src,
  alt = "img",
  isSquare = false,
  w,
  h,
  handleUpdate,
}) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRemoved, setIsRemoved] = useState(src ? false : true);

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setIsRemoved(false);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    handleUpdate(formData, id);
  };

  return (
    <>
      <Box w={w} h={h} position="relative"
        rounded='md'
        border='4px'
        borderColor='blue.secondary'
        borderStyle='dashed'
        bg={src ? "transparent" : "gray.300"}
      >
        {!isRemoved && (
          <Image src={selectedFile ? preview : src} alt={alt}
            boxSize={isSquare ? "100%" : "auto"}
            h={isSquare ? "100%" : "-webkit-fill-available"}
            w={isSquare ? "100%" : "-webkit-fill-available"}
            objectFit='cover'
          />
        )}
        <Box w="100%" h="100%" cursor="pointer" position="absolute" top="0" left="0" bg="rgba(200,200,200,0.4)">
          { !isRemoved ? (
            <Icon as={Edit} w={16} h={16} color="gray.900" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)"
              onClick={onOpen}
            />
          ) : (
            <Icon as={Plus} w={16} h={16} color="gray.900" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)"
              onClick={() => {
                const input = document.getElementById(`input-${id}`);
                if(input) input.click();
              }}
            />
          )}
          <input type='file' onChange={onSelectFile} accept="image/*" id={`input-${id}`} style={{ display: "none" }} />
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Button onClick={() => {
                const input = document.getElementById(`input-${id}`);
                if (input) input.click();
                onClose();
              }}><Icon as={Upload} /> Change Photo</Button>
              <Button onClick={() => {
                handleUpdate(new FormData(), id);
                selectedFile && setSelectedFile(undefined);
                setIsRemoved(true);
                onClose();
              }}><Icon as={Delete} /> Remove Photo</Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
  
export default UpdatableImage;
  