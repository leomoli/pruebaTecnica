import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import User from '../pages/User'
import P404 from '../pages/P404'

const Approutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/user/:id' element={<User />} />
      <Route path='*' element={<P404 />}/>
    </Routes>
  )
}

export default Approutes
