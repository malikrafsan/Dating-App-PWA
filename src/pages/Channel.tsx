import { Box, Button, Heading, HStack, useDisclosure, VStack, Icon } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { ChannelCard, ChannelProfile, UseWarning} from "../components";
import { BottomNavLayout } from "../layouts";
import { University } from "../api";
import { useAuth } from "../context-providers/AuthProvider";
import { MdLogout } from "react-icons/md";

type channelItem = {
  slug: string;
  name: string;
  logoFileId: string;
};

const channelList = () => {
  const [channelList, setChannelList] = useState<channelItem[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<channelItem>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAdd, setIsAdd] = useState(false);

  const handleChannelClick = (item: channelItem) => {
    setSelectedChannel(item);
    onOpen();
  };

  const handleAdd = () => {
    setIsAdd(true);
    onOpen();
  };

  const getUniversities = async () => {        
    const res = await University.getUniversities();
    setChannelList(res.data.universities.map((item: any) => item));
  };

  useEffect(() => {
    getUniversities();
  }, []);



  const { logout } = useAuth();
  const { WarningModal, warning } = UseWarning();

  return (
    <BottomNavLayout noLovesIcon isAdmin>
      <WarningModal />
      <Box p="4" h="90%"
        overflow="scroll"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <HStack justify="space-between" mr="8">
          <Heading 
            size="xl" 
            mb="8" 
            mt="8" 
            ml="8"
            fontWeight="bold">
                Edit Channel
          </Heading>
          <Button
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
                +
          </Button>
        </HStack>
        <VStack 
          align="top" 
          spacing="0" 
          borderBottom="2px" 
          borderColor="gray.300"
          ml="8"
          mr="8"
          id="channel-list"
        >
          {channelList.map((item) => (
            <ChannelCard
              key={item.slug}
              name={item.name}
              logo={item.logoFileId}
              onClick={() => handleChannelClick(item)}
            />
          ))}
        </VStack>
      </Box >
      <Box py="4" px="8" display="flex" justifyContent="center" alignItems="center">
        <Button
          mt={4}
          colorScheme="blue"
          rounded="full"
          boxShadow="md"
          p={4}
          cursor="pointer"
          onClick={() =>
            warning({
              title: "Are you sure?",
              description: "You will be logged out.",
              onConfirm: () => logout(),
            })
          }
        >
          Logout&nbsp;
          <Icon as={MdLogout} boxSize={6} />
        </Button>
      </Box>
      {selectedChannel && (
        <ChannelProfile
          key={selectedChannel.slug}
          name={selectedChannel.name}
          logo={selectedChannel.logoFileId}
          slug={selectedChannel.slug}
          isAdd={false}
          isOpen={isOpen}
          onClose={onClose}
          setValue={(val) => selectedChannel.name = val}
          onChange={getUniversities}
        />
      )}
      {isAdd && (
        <ChannelProfile
          name={""}
          logo={""}
          slug={""}
          isAdd={true}
          isOpen={isOpen}
          onClose={() => { setIsAdd(false); onClose(); }}
          setValue={() => (isAdd)}
          onChange={getUniversities}
        />
      )}
        
    </BottomNavLayout>
  );
};

export default channelList;
