import { useEffect, useState } from "react"
import {ChevronDown, ChevronUp} from 'lucide-react'
import "./HistoryBox.css"

function HistoryBox({purchase}){

    const [expand, setExpand] = useState(false)
    const [price, setPrice] = useState(0)
    const [date, setDate] = useState('')

    useEffect(() => {
        let totalprice = 0;
        for (const item of purchase.itens){
            totalprice += parseFloat(item.price) * item.quantity
        }

        purchase.buy_date = new Intl.DateTimeFormat('en-US', {
            dateStyle: "medium",
            timeStyle: "short"
        }).format(new Date(purchase.buy_date))
        setPrice(totalprice)
        setDate(purchase.buy_date)
    }, [])

    function handleExpand(){
        setExpand(!expand)
    }

    return (
        <div className="HistoryBox">
            <div className="Top">
                <div>ID # {purchase.id}</div>
                <div>Total price: $ {price.toFixed(2)}</div>
                <div>{date}</div>
                {expand ? (<ChevronUp className = "Chevron"onClick={handleExpand} />) : (<ChevronDown className = "Chevron" onClick={handleExpand} />)}
            </div>
            {expand && (
                <div className="Content">
                    {purchase.itens.map((item, id) => (
                        <div className="ContentItem" key={id}> 
                            <img src={item.image} />
                            <div>{item.title}</div>
                            <div>$ {item.price}</div>
                            <div>Quantity: {item.quantity}</div>
                        </div>
                    ))}

                </div>
            )}


        </div>
    )
}

export default HistoryBox