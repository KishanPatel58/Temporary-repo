import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/authentication/Login'
import Signup from './components/authentication/Signup'
import Deshboard from './components/Deshboard'
import Contact from './components/Contact'
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Deshboard" element={<Deshboard />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App