import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
} from '@chakra-ui/react'

import customTheme from './styles/theme'
import './index.css'
import Home from './pages/Home'
import About from './pages/About'
import Hi from './pages/hi/[name]'

createRoot(document.getElementById('app')!).render(
  <ChakraProvider theme={customTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/hi">
            <Route path=":name" element={<Hi />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)
