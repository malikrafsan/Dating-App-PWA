import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import customTheme from "./styles/theme";
import "./index.css";
import "@fontsource/poppins";
import Hi from "./pages/hi/[name]";
import { Home, About, Register, Login, Profile, Channel, MatchList, ChatDetail } from "./pages";
import { AuthProvider } from "./context-providers/AuthProvider";
import { Pair } from "./pages";
import { MessagingProvider, GeoLocationProvider } from "./context-providers";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("app")!).render(
  <ChakraProvider theme={customTheme}>
    <BrowserRouter>
      <AuthProvider>
        <MessagingProvider>
          <GeoLocationProvider>
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
                <Route path="/pair" element={<Pair />} />
                <Route path="/channel" element={<Channel />} />
                <Route path="/matchlist" element={<MatchList />} />
                <Route path="/chat">
                  <Route path=":id" element={<ChatDetail />} />
                </Route>
              </Route>
            </Routes>
          </GeoLocationProvider>
        </MessagingProvider>
      </AuthProvider>
    </BrowserRouter>
  </ChakraProvider>
);
