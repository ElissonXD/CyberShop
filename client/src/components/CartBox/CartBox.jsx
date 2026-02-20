import toast from 'react-hot-toast';
import './CartBox.css'
import axios from 'axios';
import trashicon from '../../assets/icons/trash-2.png'

function CartBox({item, handleAdd, handleDecrement, handleDelete}){

    return (
        <div className="CartBox">
            <div className="CartContent">
                <img src={item.image}></img>
                <div className="TitleCart">{item.title}</div>
                <div className="PriceCart">$ {item.price}</div>
            </div>
            <div className="Increment">
                <button onClick={() => handleDecrement(item)}>-</button>
                <p>{item.quantity}</p>
                <button onClick={() => handleAdd(item)}>+</button>
            </div>
            <div className="Trash">
                <img onClick={() => handleDelete(item)} src = {trashicon}></img>
            </div>
        </div>
    )
}

export default CartBox;