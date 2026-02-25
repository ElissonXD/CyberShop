async function getItems(req, res) {
    try{
        const {search, filter} = req.body
        console.log(filter)
        console.log(req.session)

        const response = await fetch('https://fakestoreapi.com/products')
        
        if (!response.ok){
            return res.status(400).json({errors: "Failed to fetch the API"})
        }

        let data = await response.json()
        
 
        if (search) data = data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
        
        if (filter.category !== 'all' && filter.category !== ''){
            data = data.filter(item => item.category === filter.category)
        }

        if (filter.min){
            data = data.filter(item => parseFloat(item.price) >= parseFloat(filter.min))
        }

        if (filter.max){
            data = data.filter(item => parseFloat(item.price) <= parseFloat(filter.max))
        }


        return res.status(200).json(data)

    }catch(error){
        return res.status(400).json({errors: "Failed to load itens, please try again"})
    }
}


module.exports = {
    getItems
}