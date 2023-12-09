import React from 'react'
import Navbar from './Components/Header/Header'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet/>
    </div>
  )
}

export default Layout
