import React from "react";
import { useNavigate } from "react-router";

import BaseLayout from "../BaseLayout";
import { BottomNav } from "../../components";
import styles from "./index.module.css";

interface ILoggedInLayoutProps {
  children: React.ReactNode;
}

const pages = {
  right: {
    urlIcon: "images/logo/logo-blue.png",
    url: "/login",
    altImg: "right button",
  },
  middle: {
    urlIcon: "images/logo/logo-loves.png",
    url: "/",
    altImg: "middle button",
  },
  left: {
    urlIcon: "images/logo/logo-pink-circle.png",
    url: "/register",
    altImg: "left button",
  }
};

const LoggedInLayout = (props: ILoggedInLayoutProps) => {
  const { children } = props;

  const router = useNavigate();

  return (
    <BaseLayout>
      <div className={styles.container}>
        <div className={styles.childrenContainer}>{children}</div>
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
        />
      </div>
    </BaseLayout>
  );
};

export default LoggedInLayout;
