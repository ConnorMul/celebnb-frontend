import React, { useState } from 'react'

function FilterSort({ sortBy, setSortBy }) {
    

    return(
        <div>
            <select className="filter-menu"value={sortBy} onChange={(evt) => setSortBy(evt.target.value)}> 
                  <option name="All">All</option>
                  <option name="Pool">Pool</option>
                  <option name="Hot Tub">Hot Tub</option>
                  <option name="Wait Staff">Wait Staff</option>
              </select>
        </div>
    )
}

export default FilterSort