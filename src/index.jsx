import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home/Home'
import GlobalStyle from './styles/GlobalStyles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Posts from './pages/Posts'
import Header from './components/Header'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <GlobalStyle />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
