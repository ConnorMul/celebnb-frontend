import React, { useState } from 'react'

function FilterSort(props) {
    

    return(
        <div>
            <input
                className="sort-by"
                type="checkbox"
                value={props.checkPool}
                onChange={(e) => props.setCheckPool(e.target.value)}
            />
            <label>Pool</label>
            <input 
                className="sort-by"
                type="checkbox"
                value={props.checkWaitStaff}
                onChange={(e) => props.setCheckWaitStaff(e.target.value)}
            />
            <label>Wait Staff</label>
            <input 
                className="sort-by"
                type="checkbox"
                value={props.checkHotTub}
                onChange={(e) => props.setCheckHotTub(e.target.value)}
            />
            <label>Hot Tub</label>
        </div>
    )
}

export default FilterSort