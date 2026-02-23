import './Profile.css'
import { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import axios from 'axios'
import HistoryBox from '../../components/HistoryBox/HistoryBox'
import toast from 'react-hot-toast'
import { UserRound } from 'lucide-react';

function Profile(){

    const {login, user, setUser, loading} = useContext(UserContext)
    const navigate = useNavigate()

    const [data, setData] = useState({cart: []})
    const [error, setError] = useState(false)
    const [load, setLoading] = useState(true)

    const [pfp, setPfp] = useState('')
    const dialogRef = useRef(null)

    useEffect(() => {
        setLoading(true)
         const req = async () => {
            try {
                const res = await axios.get('/api/history')
    
                setData(res.data) 
            } catch(error){
                setError(true)
            }
            setLoading(false)
        }

        req()
    }, [])

    useEffect(() => {
        if (!login && !loading){
            toast.error("Must be logged in to acess this page!")
            navigate('/')
        }
    }, [loading, navigate])

    function handlePfp(e){
        e.preventDefault()
        const postPromisse = axios.post('/api/profile', {picture: pfp})
        toast.promise(postPromisse, {
            success: "Changed picture! Refresh to see changes",
            error: "Failed to change the picture",
            loading: "Changing picture..."
        })
        
        const req = async () => {
                try{
                    const res = await postPromisse

                }catch(error){
                    if (error.response) toast.error(error.response.data.errors)
                }
            }
            req()
    }

    function handleLogout(){
        const postPromisse = axios.get('/api/profile')
        toast.promise(postPromisse, {
            success: "Logged out!",
            error: "Failed to log out",
            loading: "Logging off..."
        })
        const req = async () => {
            try{
                const res = await postPromisse

                if (res.data.success){
                    setUser(null)
                    dialogRef.current?.close();
                    navigate('/')
                }

            }catch(error){
                if (error.response) toast.error(error.response.data.errors)
                dialogRef.current?.close();
            }
        }
        req()
    }

    function openLogoutModal() {
        dialogRef.current?.showModal();
    }

    const [select, setSelect] = useState(0)

    return (
        <div className='Profile'>
            {loading && (<div>Loading...</div>)}
            {(error && !loading) && (<div>Something went wrong, please, try again</div>)}
            {(!error && !loading ) && ( <>
            <div className='ProfileTitle'>
                <h2>Profile</h2>
            </div>
            <div className='SideBar'>
                {user?.picture_url ? (<img src = {user.picture_url} className='pfp'/>) : <UserRound className='pfp'/>}
                <div className={select === 0 ? "SideSelected" : "SideOption"} key={0} onClick={() => {setSelect(0)}}>Information</div>
                <div className={select === 1 ? "SideSelected" : "SideOption"} key={1} onClick={() => {setSelect(1)}}>Purchase History</div>
                <div className="LogOut" onClick={openLogoutModal}>Log out</div>
                <dialog ref = {dialogRef} className="dialog">
                    <div>Do you really want to log out?</div>
                    <div>Your current cart will be lost</div>
                    <div className='Buttons'>
                        <button onClick={() => {dialogRef.current.close()}}>Cancel</button>
                        <button className='ButtonLogout' onClick={handleLogout}>Log out</button>
                    </div>
                </dialog>
            </div>
                {select === 0 ? (
                    <div className='InformationBar'>
                        <div className='LabelInfo'> 
                            <div className='LabelTitle'>Username</div>
                            <div className='LabelContent'>{user?.username}</div>
                        </div>

                        <div className='LabelInfo'> 
                            <div className='LabelTitle'>Email</div>
                            <div className='LabelContent'>{user?.email}</div>
                        </div>

                        <div className='LabelInfo'> 
                            <div className='LabelTitle'>Profile picture</div>
                            <form onSubmit={handlePfp}>
                                <input className='LabelContent' value = {pfp} onChange={(e) => {setPfp(e.target.value)}} name = 'picture'/>
                                <button type='submit'>Change picture</button>
                            </form>
                            <div className='PictureWarning'>Please send a valid url picture</div>
                            <div className='PictureWarning'>(Leave it blank to use the default pfp)</div>
                        </div>

                    </div>


                ) : (
                <div className='ContentBar'>
                    {data.cart.length > 0 ? (
                        data.cart.map((cart, id) => (
                        <HistoryBox key = {id} purchase = {cart}/>
                        ))
                    ) : (
                        <div>No purchase made...</div>
                        )}
                </div>
            )}
            </>
            )}</div>
    )
}



export default Profile