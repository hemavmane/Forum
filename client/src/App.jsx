import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Posts from './pages/Posts'
import Layout from './component/layout'
import Home from './pages/home'
import CreatePosts from './pages/CreatePost'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/" element={<Layout />}>
          <Route index element={<Home />} />
         <Route path="create" element={<Posts />} />
         <Route path="submit-post" element={<CreatePosts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
