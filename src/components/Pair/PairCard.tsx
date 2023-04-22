import { Box, Tag, Text, Icon, Image, Wrap, WrapItem, PropsOf } from "@chakra-ui/react";
import { MdLocationOn, MdSchool } from "react-icons/md";
import React, { useCallback } from "react";

import { AnimBox } from "../";
import { PanInfo, useAnimation, useDragControls, useMotionValue, useTransform } from "framer-motion";
import ImageCarousel from "./ImageCarousel";
import { AnimPath } from "../AnimComponents";

const formatDistance = (distance: number) => {
  if (distance < 1000) {
    return `${Math.round(distance)} m`;
  } else {
    return `${(distance / 1000).toFixed(2)} km`;
  }
};

export interface PairData {
    id: number;
    userPhoto: string[];
    name: string;
    age: number;
    distance: number;
    university: string;
    description: string[];
    userTag: string[];
}

interface PairCardProps {
    data: PairData;
    onPair?: (id: number, isPair: boolean) => void;
}

const PairCard = (props: PairCardProps & PropsOf<typeof AnimBox>) => {
  const cardX = useMotionValue(0);
  const cardY = useTransform(cardX, v => -Math.sqrt(600*600-v*v) + 600);
  const cardRot = useTransform(cardX, v => (Math.atan2(cardY.get(), v*2)) * 2 * 180 / Math.PI);
  const cardOpacity = useMotionValue(1);
  const statOpacity = useTransform(cardX, [-100, 0, 100], [1, 0, 1]);
  const statColor = useTransform(cardX, [-100, 0, 100], ["#ff000080", "#00000000", "#00ff0080"]);
  const acceptPath = useTransform(cardX, [0, 75], [0, 1]);
  const rejectPath = useTransform(cardX, [-75, 0], [1, 0]);
  const infoAnim = useAnimation();
  const cardAnim = useAnimation();
  const cardDrag = useDragControls();
  const infoY = useMotionValue(0);
  const [infoHeight, setInfoHeight] = React.useState(0);
  const fullInfo = React.useRef<HTMLDivElement>(null);
  const { data, onPair, ...others } = props;

  function onInfoDragEnd(event: PointerEvent, info: PanInfo) {
    const y = infoY.get();
    if (y > -150 && info.velocity.y > -40) infoAnim.start("hidden");
  }

  const onCardDragEnd = useCallback((event: MouseEvent, info: PanInfo) => {
    if (info.velocity.x > 400) {
      cardAnim.start("swipeRight");
    } else if (info.velocity.x < -400) {
      cardAnim.start("swipeLeft");
    }
  }, [cardAnim, onPair]);

  const onCardPairEnd = useCallback((name: string) => {
    if (name.substring(0, 5) !== "swipe") return;
    onPair?.(props.data.id, name === "swipeRight");
    cardOpacity.set(0);
    cardX.set(0);
    if (data) cardAnim.start("show");
  }, [data, onPair, cardOpacity, cardX, cardAnim]);

  const startDragCard = useCallback((event: React.PointerEvent<Element>) => {
    infoAnim.start("hidden");
    cardDrag.start(event);
  }, [cardDrag, infoAnim]);

  React.useEffect(() => {
    const elH = (fullInfo?.current?.clientHeight || -30) + 30;
    if (!elH) return;
    setInfoHeight(elH || 0);
  }, [fullInfo?.current?.clientHeight]);

  return (
    <AnimBox
      drag="x"
      style={{ 
        x: cardX, y: cardY, rotate: cardRot, opacity: cardOpacity, touchAction: "none"
      }}
      variants={{
        swipeRight: {
          x: 500,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        },
        swipeLeft: {
          x: -500,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        },
        show: {
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: "easeIn",
          },
        }
      }}
      animate={cardAnim}
      onAnimationComplete={onCardPairEnd}
      dragConstraints={{ left: 0, right: 0 }}
      dragControls={cardDrag}
      dragListener={false}
      draggable={false}
      onDragEnd={onCardDragEnd}
      position="absolute"
      top="14"
      left="14"
      right="14"
      bottom="14"
      bgColor="whitesmoke"
      overflow="hidden"
      borderRadius="2xl"
      boxShadow="0 0 20px 0 #00000033"
      {...others}
    >
      <AnimBox
        position="absolute"
        w="full" h="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        pointerEvents="none"
        zIndex="2"
        style={{
          opacity: statOpacity,
          backgroundColor: statColor,
          touchAction: "none",
        }}
      >
        <svg
          viewBox="0 0 50 50"
        >
          <AnimPath
            display="block"
            width="full"
            height="full"
            fill="none"
            strokeWidth="2"
            stroke="black"
            d="M14,26 L 22,33 L 35,16"
            strokeDasharray="0 1"
            style={{ pathLength: acceptPath }}
          />
          <AnimPath
            fill="none"
            strokeWidth="2"
            stroke="black"
            d="M17,17 L33,33"
            strokeDasharray="0 1"
            style={{ pathLength: rejectPath }}
          />
          <AnimPath
            fill="none"
            strokeWidth="2"
            stroke="black"
            d="M33,17 L17,33"
            strokeDasharray="0 1"
            style={{ pathLength: rejectPath }}
          />
        </svg>
      </AnimBox>
      <Box
        onPointerDown={startDragCard}
        userSelect="none"
        draggable={false}
        position="absolute"
        h="calc(100% - 100px)"
        w="full"
      >
        <ImageCarousel>
          {
            data.userPhoto.map((img, index) => (
              <Image
                key={index}
                draggable={false}
                w="full"
                h="full"
                flexShrink={0}
                alt="Profile image"
                objectFit="cover"
                objectPosition="center"
                src={`https://drive.google.com/uc?export=view&id=${img}`}
              />
            ))
          }
        </ImageCarousel>
      </Box>
      <AnimBox
        key={infoHeight}
        style={{ y: infoY, bottom: -infoHeight }}
        drag="y"
        variants={{
          hidden: { y: 0 },
        }}
        animate={infoAnim}
        dragConstraints={{
          top: -infoHeight,
          bottom: 0,
        }}
        dragMomentum={false}
        onDragEnd={onInfoDragEnd}
        userSelect="none"
        w="full"
        boxShadow="0px -12px 100px 4px #ff60af"
        clipPath="inset(-150px 0px 0px 0px)"
        borderTopRadius="30px"
        bottom="0"
        position="absolute"
        p="5"
        bgColor="whitesmoke"
      >
        <Box
          mx="auto"
          w="32"
          mt="-4"
          p="2"
        >
          <Box
            borderRadius="50px"
            h="8px"
            bgColor="#D9D9D9"
          />
        </Box>
        <Text fontSize="2xl" fontWeight="bold">{ data.name }, { data.age }</Text>
        <Box mt="2">
          <Box alignItems="center" display="flex">
            <Icon as={MdLocationOn} color="#E54162" h="6" w="6" mr="2" />
            <Text>{formatDistance(data.distance)} from you</Text>
          </Box>
          <Box mt="1" alignItems="center" display="flex">
            <Icon as={MdSchool} color="#E54162" h="6" w="6" mr="2" />
            <Text>{data.university}</Text>
          </Box>
        </Box>
        <Box ref={fullInfo} mt="5">
          <Box w="100" mt="2">
            <Text fontSize="1xl" fontWeight="bold" color="#E54162">About Me</Text>
            <Text>
              { data.description }
            </Text>
          </Box>
          <Wrap mt="4">
            {data.userTag.map((interest, index) => (
              <WrapItem key={index}>
                <Tag bgColor="#3E368494" color="white" rounded="full" py="1.5" px="3">
                  {interest}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </AnimBox>
    </AnimBox>
  );
};

export default PairCard;
