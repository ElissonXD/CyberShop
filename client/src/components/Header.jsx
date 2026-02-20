import "./Header.css"
import searchIcon from '../assets/icons/search.png'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { SearchContext } from "../contexts/SearchContext"
import carticon from "../assets/icons/shopping-cart.png"
import axios from "axios"
import { UserRound } from "lucide-react"


function Header(){

    const {search, setSearch} = useContext(SearchContext)
    const {total} = useContext(UserContext)

    function handleSearch(e){
        setSearch(e.target.value)
    }

    const {user, login} = useContext(UserContext)

    let navigate = useNavigate()

    function handleRedirectSignUp(){
        navigate('/sign-up')
    }

    function handleRedirectLogin(){
        navigate('/login')
    }

    function handleRedirectSearch(){
        navigate('/')
    }

    function handleRedirectCart(){
        navigate('/cart')
    }


    return (
        <div className="Header">
            <Link className="HeaderText" to='/'>Cyber Shop</Link>
            <div className="SearchBar">
                <img onClick={handleRedirectSearch} src= {searchIcon}></img>
                <input value = {search} onChange={handleSearch} placeholder="Search..."/>
            </div>
            {login ? (
            <div className="HeaderOptions">
                <div className="CartIMG" onClick={handleRedirectCart} >
                    <img src={carticon}></img>
                    <div className="CartPop">{total}</div>
                </div>
                <div className="HeaderName">{user?.username}</div>
                {user?.picture_url ? (<img onClick={() => navigate('/profile')} src = {user.picture_url} className='pfp'/>) : <UserRound onClick={() => navigate('/profile')} className='pfp'/>}
            </div>)
            : (<div className="HeaderOptions">
                <button className="HeaderButton" onClick={handleRedirectSignUp}>Sign-up</button>
                <button className="HeaderButton" onClick={handleRedirectLogin}>Log-in</button>
            </div>)}
            </div>
    )
}

export default Header