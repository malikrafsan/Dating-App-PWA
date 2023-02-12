import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import {
  ChakraProvider,
} from '@chakra-ui/react'

import customTheme from './styles/theme'
import './index.css'
import Home from './pages/Home'
import About from './pages/About'
import Hi from './pages/hi/[name]'
import Register from './pages/Register'

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
          <Route path="/register" element={<Register />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)
