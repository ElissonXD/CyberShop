import axios from "axios"
import { useContext, useEffect, useState } from "react"
import ItemBox from "../../components/ItemBox/ItemBox"
import './MainPage.css'
import { SearchContext } from "../../contexts/SearchContext"
import FilterBar from "../../components/FilterBar/FilterBar"

function MainPage(){
    
    const {search} = useContext(SearchContext)
    const [filter, setFilter] = useState({category:'', min:'', max:''})

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        const req = async () => {
            try {
                const res = await axios.post('/api/fakestore', {search, filter})
                setItems(res.data)
            } catch (error){
                setError(true)
            }
            setLoading(false)
    }
    req()
}, [search, filter])

function handleFilter(e){
    e.preventDefault()
    const filterData = new FormData(e.currentTarget)
    let newFilter = {...filter}
    for (const data of filterData.entries()){
        newFilter = {...newFilter, [data[0]]: data[1]}
    }
    setFilter(newFilter)
}


    return (
        <div className="MainPage">
            <FilterBar handlePost={handleFilter} />
            {loading && <div>Loading</div>}
            {error && <div>Failed to fetch items, please try again</div>}
            {!error && !loading && (
                items.length > 0 ? (
                    <div className="Items">
                        {items.map((item, id) => (
                            <ItemBox key={id} item = {item} />
                        ))}
                    </div>
                ) : (
                    <div>No items found... </div>
                )
            )}
        
        </div>
    )
}


export default MainPage