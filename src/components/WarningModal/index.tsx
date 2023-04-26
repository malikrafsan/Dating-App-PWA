import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
  
  interface ComponentProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title: string;
    description: string;
    cb: () => void;
    id?: string;
  }
  
  interface WarningArgs {
    title: string;
    description: string;
    onConfirm: () => void;
    id?: string;
  }
  
// Modal with yes and no button
const Component = ({ isOpen, title, description, setIsOpen, cb, id }: ComponentProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} id={id}>
      <ModalOverlay />
      <ModalContent top="30%">
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{description}</ModalBody>
        <ModalFooter gap={4}>
          <Button colorScheme="blue" onClick={() => cb()}>
              Yes
          </Button>
          <Button variant="ghost" mr={3} onClick={() => setIsOpen(false)}>
              No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
  
const UseWarning = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [cb, setCb] = useState(() => () => {});
  const [id, setId] = useState("");
  // call this function to open modal
  const warning = ({ title, description, onConfirm, id }: WarningArgs) => {
    setTitle(title);
    setDescription(description);
    setIsOpen(true);
    setCb(() => onConfirm);
    setId(id || "");
  };
    // render this component on page
  const WarningModal = () => {
    return (
      <Component
        id={id}
        isOpen={isOpen}
        title={title}
        description={description}
        setIsOpen={setIsOpen}
        cb={cb}
      />
    );
  };
  
  return { warning, WarningModal };
};
  
export default UseWarning;
  