import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState, useEffect } from 'react'
import './index.css'
import App from './App.jsx'
import Header from './components/Header'
import SignUp from './views/Sign-up/Sign-up.jsx'
import Login from './views/Login/Login.jsx'
import MainPage from './views/MainPage/MainPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'
import Cart from './views/Cart/Cart.jsx'
import Profile from './views/Profile/Profile.jsx'

axios.defaults.withCredentials = true

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />
      },
    
      {
      path: "/sign-up",
      element: <SignUp /> 
      }, 
      {
      path: "/login",
      element: <Login />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path:"/profile",
        element: <Profile />
      }
  ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
