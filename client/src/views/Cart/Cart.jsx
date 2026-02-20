import { useContext, useEffect, useState } from 'react'
import './Cart.css'
import axios from 'axios'
import { UserContext } from '../../contexts/UserContext'
import { redirect, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import CartBox from '../../components/CartBox/CartBox'

function Cart(){
    const {login, total, setTotal, loading} = useContext(UserContext)
    const navigate = useNavigate()
    const [data, setData] = useState({cart: [], price: 0})
    const [error, setError] = useState(false)

    useEffect(() => {

         const req = async () => {
            try {
                const res = await axios.get('api/cart')
    
                setData(res.data) 
            } catch(error){
                setError(true)
            }
    
        }

        req()
    }, [])

    useEffect(() => {
        if (!login && !loading){
            toast.error("Must be logged in to acess this page!")
            navigate('/')
        }
    }, [loading, navigate])

    function updateCartItem(itemId, newQuantity){
        setData(prevData => {
            const newCart = prevData.cart.map(item => 
            item.id === itemId ? { ...item, quantity: newQuantity } : item
            ).filter(item => item.quantity > 0);

            const newPrice = newCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

            return {
            cart: newCart,
            price: newPrice
            };
        });
    }

    async function handleClear() {
        const prevData = {...data}
        const previous_value = total

        setData({cart:[], price: 0})
        setTotal(0)

        try{
            const res = await axios.delete('/api/cart')
        }catch(error){
            toast.error("Failed to update cart")
            setData(prevData)
            setTotal(previous_value)
        }
        
    }

    async function handleAdd(item) {
        
        const nextquanitty = item.quantity + 1;
        updateCartItem(item.id, nextquanitty)
        try{
            const res = await axios.patch('/api/cart', {...item, value: item.quantity + 1})
            
        }catch(error){
            toast.error("Failed to update value")
            updateCartItem(item.id, item.quantity)
        }
    }

    async function handleDecrement(item) {
        if (item.quantity > 1){
            const nextquanitty = item.quantity - 1;
            updateCartItem(item.id, nextquanitty)

            try{
                const res = await axios.patch('/api/cart', {...item, value: item.quantity - 1})
            
            }catch(error){
                toast.error("Failed to update value")
                updateCartItem(item.id, item.quantity)
            }
        }
    }

    async function handleDelete(item) {

        const previous_value = total
        updateCartItem(item.id, 0)
        setTotal(total - 1)

        try{
            const res = await axios.patch('/api/cart', {...item, value: 0})
        
        }catch(error){
            toast.error("Failed to update value")
            updateCartItem(item.id, item.quantity)
            setTotal(previous_value)
        }
    }

    async function handleSubmit() {

        if(data.cart.length === 0){
            return toast.error("Your cart is empty!")
        }

        const postPromisse = axios.post('/api/history')

        toast.promise(postPromisse, {
            success: "Sucessefull purchase!",
            error: "Could not proceed the purchase",
            loading: "Purchasing items..."
        })
        const prevTotal = total;
        setTotal(0)

        try{
            const res = await postPromisse
            if (res.data.success){
                navigate('/')
            }

        } catch(error){
            if (error.response){
                toast.error(error.response.data.errors)
                setTotal(prevTotal)
            }
        }
    }

    return (
        <div className='Cart'>
            <div className='LeftSide'>
                <h2>Cart</h2>
                {loading && <div>Loading</div>}
                {error && <div>Failed to fetch items, please try again</div>}
                {!error && !loading && (
                    data.cart.length > 0 ? (
                        <div className='CartItems'>
                            {data.cart.map((item, id) => (
                                <CartBox
                                key={item.id} 
                                item={item} 
                                handleAdd={handleAdd}
                                handleDecrement={handleDecrement}
                                handleDelete={handleDelete}/>
                            ))}
                        </div>
                    )
                    : (
                        <div>Your cart is empty </div>
                    )
                )}
            
            </div>
            <div className='RightSide'>
                <h2>Total price</h2>
                <div className='Price'>$ {data.price.toFixed(2)}</div>
                <h2>DISCLAIMER</h2>
                <p>This is a simulated checkout. All product details and prices are for display purposes only. No actual purchase will occur upon confirmation.</p>
                <button onClick={handleClear}>Clear cart</button>
                <button onClick={handleSubmit}>Confirm purchase</button>
            </div>
            

        </div>
    )

}

export default Cart