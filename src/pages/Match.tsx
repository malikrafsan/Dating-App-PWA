import { Text, Box, Slide, Button, Image, Avatar } from "@chakra-ui/react";
import React, {useCallback} from "react";

export interface MatchData {
  pairedId: number;
  pairedName: string;
  meAva: string;
  pairedAva: string;
}

interface MatchProps {
  data?: MatchData;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Match = ({data, setShow, show}: MatchProps) => {
  const onKeepSwiping = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return (
    <Slide direction="bottom" in={show} style={{ position: "absolute", zIndex: 10, width: "100%", height: "100%" }}>
      <Box
        w="100%" h="100%"
        bg="linear-gradient(171.54deg, #413785 1.36%, #DA58A7 97.46%)"
        color="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="absolute"
      >
        <Image
          mt="-6"
          mb="4"
          src="https://cdn.discordapp.com/attachments/855298047760269312/1089960548961099866/logo.png"
        />
        <Text fontSize="3xl" fontWeight="black">it&apos;s a match!</Text>
        <Text fontSize="md">you and {data?.pairedName || "michael"} have liked each other.</Text>
        <Box
          my="10"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="full"
        >
          <Avatar
            border="5px solid white"
            size="xl"
            src={`https://drive.google.com/uc?export=view&id=${data?.meAva}`}
          />
          <Avatar
            position="absolute"
            zIndex={1}
            size="md"
            src="https://cdn.discordapp.com/attachments/855298047760269312/1089959138630570094/Group_21.png"
          />
          <Avatar
            border="5px solid white"
            size="xl"
            src={`https://drive.google.com/uc?export=view&id=${data?.pairedAva}`}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="full"
          padding="0 5em"
          height="24"
        >
          <Button bgColor="white" color="black" m="2" p="4" boxSizing="content-box">
            <Text fontSize="md">Start Messaging</Text>
          </Button>
          <Button bgColor="rgba(0,0,0,0.23)" m="2" p="4" boxSizing="content-box"
            onClick={onKeepSwiping}
          >
            <Text fontSize="md">Keep Swiping</Text>
          </Button>
        </Box>
      </Box>
    </Slide>
  );
};

export default Match;
