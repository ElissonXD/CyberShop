import { useState, useEffect, useContext} from "react"
import "./Sign-up.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import { UserContext } from "../../contexts/UserContext"
const apiUrl = import.meta.env.VITE_API_URL;

function SignUp() {

    let navigate = useNavigate()
    const {login, loading} = useContext(UserContext)

    // Check if the user is logged
    
    useEffect(() => {
        if (login && !loading){
            toast.error("Already logged in", {id: 'auth-toast'})
            navigate('/')
            }
        }, [login, loading])


    const [data, setData] = useState({username:'', email:'', password:''})

    function handleDatachange(e) {
        const name = e.target.name
        const value = e.target.value
        const newData = {...data, [name]: value}
        setData(newData)
    }

    async function handlePost(e){
        e.preventDefault()
        const postpromisse = axios.post(apiUrl + "/api/sign-up", data);
        
        toast.promise(postpromisse, {
            loading: 'Creating user...',
            success: "User created!",
            error: "Could not create the user."
        })


        try {
            const res = await postpromisse

            if (res.data.sucess){
                navigate('/')
            }

        } catch(err){
            console.log(err.response.data)
            if (err.response){
                toast.error(<span className="ToastDiv">{err.response.data.errors.map((error, id) => (
                    <div>{id+1}. {error.msg}</div>
                ))}
                <button onClick={() => toast.dismiss(toast.id)}>Dismiss</button>
                </span>, 
                {duration: Infinity, 
                })

            }
        }
    }


    return (
        <div className="SignUp">
            <form onSubmit={handlePost}>
                <legend>Sign up</legend>
                    <div className="InputLabel">
                        <label htmlFor="username">Username</label>
                        <input name = "username" id="username" placeholder="Enter username..." required
                        onChange={handleDatachange}
                        value={data.username}/>
                    </div>

                    <div className="InputLabel">
                        <label htmlFor="email">Email</label>
                        <input name = "email" id="email" type = 'email' required placeholder="Enter a valid email..."
                        onChange={handleDatachange}
                        value={data.email}/>
                    </div>

                    <div className="InputLabel">
                        <label htmlFor="password">Password</label>
                        <input name = "password" id="password" type="password" required
                        onChange={handleDatachange}
                        value={data.password}/>
                    </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )

}


export default SignUp