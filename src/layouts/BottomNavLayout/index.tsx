import React from "react";
import { useNavigate } from "react-router";

import BaseLayout from "../BaseLayout";
import { BottomNav } from "../../components";
import styles from "./index.module.css";
import { Box } from "@chakra-ui/react";
import { GiLovers } from "react-icons/gi";
import {CgProfile} from "react-icons/cg";
import {BsFillChatDotsFill} from "react-icons/bs";

interface IBottomNavLayoutProps {
  children: React.ReactNode;
  noNav?: boolean;
  noLovesIcon?: boolean;
}

const pages = {
  left: {
    icon: CgProfile,
    url: "/profile",
  },
  middle: {
    icon: GiLovers,
    url: "/pair",
  },
  right: {
    icon: BsFillChatDotsFill,
    url: "/matchlist",
  }
};

const BottomNavLayout = (props: IBottomNavLayoutProps) => {
  const { children, noNav, noLovesIcon } = props;

  const router = useNavigate();

  if (noNav) {
    return (
      <BaseLayout>
        {children}
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Box className={styles.container}>
        <Box className={styles.childrenContainer}>{children}</Box>
        <BottomNav
          left={{
            icon: pages.left.icon,
            onClick: () => router(pages.left.url),
          }}
          middle={{
            icon: pages.middle.icon,
            onClick: () => router(pages.middle.url),
          }}
          right={{
            icon: pages.right.icon,
            onClick: () => router(pages.right.url),
          }}
          noLovesIcon={noLovesIcon}
        />
      </Box>
    </BaseLayout>
  );
};

export default BottomNavLayout;
