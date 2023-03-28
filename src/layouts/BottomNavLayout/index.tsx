import React from "react";
import { useNavigate } from "react-router";

import BaseLayout from "../BaseLayout";
import { BottomNav } from "../../components";
import styles from "./index.module.css";
import { Box } from "@chakra-ui/react";

interface IBottomNavLayoutProps {
  children: React.ReactNode;
  noNav?: boolean;
  noLovesIcon?: boolean;
}

const pages = {
  right: {
    urlIcon: "images/icon/profile-icon.png",
    url: "/profile",
    altImg: "right button",
  },
  middle: {
    urlIcon: "images/icon/pair-icon.png",
    url: "/pair",
    altImg: "middle button",
  },
  left: {
    urlIcon: "images/icon/channel-icon.png",
    url: "/channel",
    altImg: "left button",
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
            urlIcon: pages.left.urlIcon,
            onClick: () => router(pages.left.url),
            altImg: pages.left.altImg,
          }}
          middle={{
            urlIcon: pages.middle.urlIcon,
            onClick: () => router(pages.middle.url),
            altImg: pages.middle.altImg,
          }}
          right={{
            urlIcon: pages.right.urlIcon,
            onClick: () => router(pages.right.url),
            altImg: pages.right.altImg,
          }}
          noLovesIcon={noLovesIcon}
        />
      </Box>
    </BaseLayout>
  );
};

export default BottomNavLayout;
