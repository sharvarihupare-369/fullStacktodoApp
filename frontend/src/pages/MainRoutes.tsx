import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import PrivateRoute from '../components/PrivateRoute'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={
        <PrivateRoute>
          <Home/>
        </PrivateRoute>
        }  />
        <Route path="/login" element={<Login/>}  />
        <Route path="/signup" element={<Signup/>}  />
    </Routes>
  )
}

export default MainRoutes