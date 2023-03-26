import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import customTheme from "./styles/theme";
import "./index.css";
import "@fontsource/poppins";
import Hi from "./pages/hi/[name]";
import { Home, About, Register, Login, Profile, Chat, ChatDetail, Channel } from "./pages";
import { AuthProvider } from "./context-providers/AuthProvider";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("app")!).render(
  <ChakraProvider theme={customTheme}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/hi">
              <Route path=":name" element={<Hi />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/channel" element={<Channel />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/chat/:key" element={<ChatDetail />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </ChakraProvider>
);
