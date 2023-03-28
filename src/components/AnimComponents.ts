import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

export const AnimBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export const AnimPath = chakra(motion.path, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});
