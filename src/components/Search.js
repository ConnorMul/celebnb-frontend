import React from 'react'

function Search({ search, handleSearchChange }) {
    return (
        <div class="container">
            <input 
                placeholder='Search by country' 
                class='js-search' 
                type="text" 
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
            />
            <i class="fa fa-search"></i>
        </div>
    )
}

export default Search 