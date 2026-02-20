import './ItemBox.css'
import axios from 'axios'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { UserContext } from '../../contexts/UserContext'


function ItemBox({item}){

    const {login, setTotal, total} = useContext(UserContext)
    
    async function handleAddItem(){
        if (login){

            try {
                const postPromisse = axios.post('/api/cart', item)
                toast.promise(postPromisse, {
                    success:"Item added to the cart!",
                    error: "Could not add the item to the cart",
                    loading: "Adding to the cart..."
                })

                const res = await postPromisse;
                setTotal(total + 1)

            } catch(error) {
                if (error.response){
                    toast.error(error.response.data.errors)
                }
            }
            
        } else {
            toast.error("You must be logged in to buy items!")
        }
    }



    return (
        <div className="ItemBox">
            <img src={item.image}/>
            <div className='ItemContent'>
                <div className="ItemTitle">{item.title}</div>
                <div className="ItemTitle">Price: ${item.price}</div>
                <div className="ItemText">{item.description}</div>
                <div className="ItemText">Category: {item.category}</div>
                <button onClick={handleAddItem}>Add to cart</button> 
            </div>
        </div>
    )
}

export default ItemBox