const query = require('../db/query')

async function postHistory(req, res) {
    try{
        const history = {
            id: req.user.id,
            items: req.session.cart,
            date: new Date()
        }
        await query.createHistory(history)
        req.session.cart = []
        return res.status(200).json({success: true})

    } catch (error){
        console.log(error)
        return res.status(400).json({errors: "Something went wrong, please try again"})
    }
}


async function getHistory(req, res) {
    try{
        const rows = await query.getHistory(req.user.id)
        return res.status(200).json({success: true, cart: rows})

    } catch (error){
        return res.status(400).json({errors: "Something went wrong, please try again"})
    } 
}



module.exports = {
    postHistory,
    getHistory
}