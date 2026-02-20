import './FilterBar.css'

function FilterBar({handlePost}){

    let data = {category: '', min:0, max:0}

    function handleChange(e){
        const name = e.target.name
        const value = e.target.value
        data = {...data,  [name]: value}
    }

    return (
        <div className="FilterBar">
            <h2>Filter</h2>
            <form onSubmit={handlePost}>
                <legend>Category</legend>
                <div className="Options">
                    <div className="radiolabel">
                            <input type='radio' id='all' name='category' value = 'all'defaultChecked/>
                            <label htmlFor="all">All</label>
                        </div>

                        <div className="radiolabel">
                            <input type='radio' id='eletronics' name='category' value = 'electronics' />
                            <label htmlFor="eletronics">Electronics</label>
                        </div>

                        <div className="radiolabel">
                            <input type='radio' id='jewelery' name='category' value = 'jewelery'/>
                            <label htmlFor="jewelery">Jewelery</label>
                        </div>

                        <div className="radiolabel">
                            <input type='radio' id='men' name='category' value = "men's clothing"/>
                            <label htmlFor="men">Men's clothing</label>
                        </div>

                        <div className="radiolabel">
                            <input type='radio' id='woman' name='category' value = "women's clothing"/>
                            <label htmlFor="woman">Women's clothing</label>
                        </div>
                </div>

                <legend>Price</legend>
                <div className="PriceRange">
                    <div className='InputLabel'>
                        <label htmlFor="min">Min value</label>
                        <input type = 'number' id="min" name='min'></input>
                    </div>
                    
                    <div className='InputLabel'>
                        <label htmlFor="max">Max value</label>
                        <input type = 'number' id="max" name='max'></input>
                    </div>
                </div>

                <button type="submit">Apply</button>
            </form>
        </div>
    )
}

export default FilterBar