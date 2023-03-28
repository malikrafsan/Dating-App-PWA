import React from "react";

import { ReloadPrompt } from "../../components";
import styles from "./index.module.css";
import { ThemeContextProvider } from "../../context-providers";
import { Box } from "@chakra-ui/react";

interface IBaseLayoutProps {
  children: React.ReactNode;
}

const { ThemeProvider } = ThemeContextProvider;

const BaseLayout = (props: IBaseLayoutProps) => {
  const { children } = props;

  return (
    <ThemeProvider>
      <Box overflowX="hidden" className={styles.container}>
        {children}
        <ReloadPrompt />
      </Box>
    </ThemeProvider>
  );
};

export default BaseLayout;
