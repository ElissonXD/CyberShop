import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState, version } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import { UserContext } from "../../contexts/UserContext";
const apiUrl = import.meta.env.VITE_API_URL;

function Login() {

    
    const [data, setData] = useState({})
    const {login, setUser, loading} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (login && !loading){
            toast.error("Already logged in", {id: 'auth-toast'})
            navigate('/')
            }
        }, [loading, navigate])

    function handleDatachange(e){
        const name = e.target.name
        const value = e.target.value
        const newData = {...data, [name]: value}
        setData(newData)
    }

    async function handlePost(e){
        e.preventDefault()

        const postpromisse = axios.post(apiUrl + "/api/login", data)

        toast.promise(postpromisse, {
            success: "Logged in!",
            error: "Failed to Log in",
            loading: "Loggin in..."
        })
        
        try{
            const res = await postpromisse

            if (res.data.success){
                setUser(res.data.user)
                navigate('/')
            }


        } catch(error){
            console.log(error)
            if (error.response){
                toast.error(error.response.data.errors)
            }
        }
    }


    return (
        <div className="Login">
            <form onSubmit={handlePost}>
                <legend>Login</legend>
                    <div className="InputLabel">
                        <label htmlFor="email">Email</label>
                        <input name = "email" id="email" placeholder="Enter email..." required
                        onChange={handleDatachange}
                        value={data.email}/>
                    </div>

                    <div className="InputLabel">
                        <label htmlFor="password">Password</label>
                        <input name = "password" id="password" type="password" required
                        onChange={handleDatachange}
                        value={data.password}/>
                    </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}




export default Login;