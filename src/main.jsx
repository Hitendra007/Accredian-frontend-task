import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SignIn from './Components/Login/Login.jsx'
import SignUp from './Components/Signup/Signup.jsx'
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Components/Home/Home.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<SignUp/>}></Route>
      <Route path='home' element={<Home/>}></Route>
      <Route path='SignIn' element={<SignIn></SignIn>}></Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      
    </RouterProvider>
  </React.StrictMode>,
)
