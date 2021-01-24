import React from 'react'

function Search({ search, handleSearchChange }) {
    return (
        <div>
            <input
            type="text"
            placeholder={"Search By Country"}
            className="search-field"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
      />
        </div>
    )
}

export default Search 