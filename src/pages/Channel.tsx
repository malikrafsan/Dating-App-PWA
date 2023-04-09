import { Box, Button, Heading, HStack, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { ChannelCard, ChannelProfile} from "../components";
import { BottomNavLayout } from "../layouts";
import { University } from "../api";

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

  return (
    <BottomNavLayout noLovesIcon>
      <Box p="4">
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
          mr="8">
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
