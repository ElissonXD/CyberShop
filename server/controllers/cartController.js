async function postItem(req, res){
    try{
    if (req.session.cart.some(item => item.id === req.body.id)){
        return res.status(400).json({errors: "Item already in the cart!"})
    } else {
        const item = {id: req.body.id, title: req.body.title, price: req.body.price, image:req.body.image, quantity: 1}
        req.session.cart.push(item)
        return res.status(200).json({success: true})
    }
    } catch(error){
        return res.status(400).json({errors: "Something went wrong, please try again"})
    }
}

async function getCart(req, res) {

    if (req.session.cart){
        let price = 0;

        for (const item of req.session.cart){
            price += parseFloat(item.price) * item.quantity
        }

        return res.status(200).json({cart: req.session.cart, price: price})
    } 
    
    else {
        
        return res.status(400).json({errors: "not logged in"})
    }
}

async function updateCart(req, res) {

    try {
        const id = req.body.id

        const index = req.session.cart.findIndex(item => item.id === id)

        if (req.body.value === 0) req.session.cart.splice(index, 1)
        else req.session.cart[index].quantity = req.body.value

        return res.status(200).json({success:true})

    }catch(error){
        return res.status(400).json({errors: "Something went wrong, please try again"})
    }
    
}

async function deleteCart(req, res) {
    try{
        req.session.cart = []
        return res.status(200).json({success: true})
    
    } catch(error){
        return res.status(400).json({errors: "Something went wrong, please try again"})
    }

    
}





module.exports = {
    postItem,
    getCart,
    updateCart,
    deleteCart
}