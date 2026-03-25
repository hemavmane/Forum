import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Posts from './pages/Posts'
import Layout from './component/layout'
import Home from './pages/home'
import CreatePosts from './pages/CreatePost'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetails from './pages/PostDetails'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<Posts />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="submit-post" element={<CreatePosts />} />
          <Route path="/edit-post/:id" element={<CreatePosts />} />
          <Route path="comments/:id/:page_slug" element={<PostDetails />} />
        </Route>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
