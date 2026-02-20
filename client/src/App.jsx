import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from './contexts/UserContext'
import { SearchContext } from './contexts/SearchContext'
import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'

function App() {

  const [user, setUser] = useState(null)
  const [search, setSearch] = useState('')
  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const req = async () => {
      const res = await axios.get("/api/check");

      if (res.data.success){
        setUser(res.data.user)
        setTotal(res.data.cart.length)
      }
      setLoading(false)

    }
    req()
  }, [])

  const contextValue = {
    user,
    setUser,
    login: !!user,
    total,
    setTotal,
    loading
  }

  const searchContext = {
    search,
    setSearch
  }

  return (
    <>
    <Toaster  
    position='top-center'
    reverseOrder = {false}
    toastOptions={{
      style: {
        background: '#911A1A',
        color: 'white'
      }
    }}
    />
    <UserContext value = {contextValue}> 
      <SearchContext value = {searchContext}>
        <Header/>

        <Outlet />
      </SearchContext>
    </UserContext>
    </>
  )
}

export default App
