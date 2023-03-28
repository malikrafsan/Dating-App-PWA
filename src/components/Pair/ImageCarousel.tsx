import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import React, { Children, useCallback, useEffect } from "react";
import { AnimBox } from "../AnimComponents";

const mod = (n: number, m: number) => ((n % m) + m) % m;

interface ArrowParams {
    handleNav: () => void;
    activeIndex: number;
}

interface DotsParams {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}

interface ImageCarouselProps {
    autoPlay?: boolean;
    loop?: boolean;
    interval?: number;
    renderArrowLeft?: (params: ArrowParams) => React.ReactNode;
    renderArrowRight?: (params: ArrowParams) => React.ReactNode;
    renderDots?: (params: DotsParams) => React.ReactNode;
}

const ImageCarousel = (props: React.PropsWithChildren<ImageCarouselProps>) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [childrenLen, setChildrenLen] = React.useState(0);
  const { autoPlay=false, loop=true, interval=1000, renderArrowLeft, renderArrowRight, renderDots, children } = props;

  const handleNav = useCallback((isPrev: boolean) => {
    const advIdx = activeIndex + (isPrev ? -1 : 1);
    const loopedAdvIdx = loop ?
      mod(advIdx, childrenLen)
      : Math.min(Math.max(advIdx, 0), childrenLen);
    setActiveIndex(loopedAdvIdx);
  }, [childrenLen, activeIndex, loop]);

  const handlePrev = useCallback(() => {
    handleNav(true);
  }, [handleNav]);

  const handleNext = useCallback(() => {
    handleNav(false);
  }, [handleNav]);

  useEffect(() => {
    setChildrenLen(Children.count(props.children));
  }, [props.children]);

  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        handleNext();
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, handleNext]);

  return (
    <Box w="full" h="full">
      <AnimBox
        w="full" h="full"
        display="flex"
        animate={{
          x: -activeIndex * 100 + "%",
          transition: { duration: 0.5 }
        }}
      >
        {children}
      </AnimBox>
      {
        renderArrowLeft?.({
          handleNav: handlePrev,
          activeIndex,
        }) ||
                <Box
                  draggable={false}
                  position="absolute"
                  left="0"
                  top="0"
                  h="full"
                  w="24"
                  onClick={handlePrev}
                />
      }
      {
        renderArrowRight?.({
          handleNav: handleNext,
          activeIndex,
        }) ||
                <Box
                  draggable={false}
                  position="absolute"
                  right="0"
                  top="0"
                  h="full"
                  w="24"
                  onClick={handleNext}
                />
      }
      {
        renderDots?.({
          activeIndex,
          setActiveIndex,
        }) ||
                <Wrap
                  draggable={false}
                  position="absolute"
                  top="0"
                  w="full"
                  justify="center"
                  p="2"
                >
                  {Array.from({ length: childrenLen }).map((_, index) => (
                    <WrapItem
                      draggable={false}
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      cursor="pointer"
                      borderRadius="full"
                      flexGrow={1}
                      h="2"
                      bg={activeIndex === index ? "#E54162" : "#D9D9D9"}
                    />
                  ))}
                </Wrap>
      }
    </Box>
  );
};

export default ImageCarousel;
