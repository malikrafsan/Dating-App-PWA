import React from "react";

import { ReloadPrompt } from "../../components";
import styles from "./index.module.css";
import { ThemeContextProvider } from "../../context-providers";

interface IBaseLayoutProps {
  children: React.ReactNode;
}

const { ThemeProvider } = ThemeContextProvider;

const BaseLayout = (props: IBaseLayoutProps) => {
  const { children } = props;

  return (
    <ThemeProvider>
      <div className={styles.container}>
        {children}
        <ReloadPrompt />
      </div>
    </ThemeProvider>
  );
};

export default BaseLayout;
