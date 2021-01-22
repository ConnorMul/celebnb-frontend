import React, { useState } from 'react'
import FilterSort from './FilterSort'
import ListingCard from './ListingCard'

function ListingsContainer({ listings }) {
    const [checkPool, setCheckPool] = useState(false)
    const [checkWaitStaff, setCheckWaitStaff] = useState(false)
    const [checkHotTub, setCheckHotTub] = useState(false)

    const listingItems = listings.map(listing => {
        return ( 
        <ListingCard
            key={listing.id}
            listing={listing}
        />
        )
    })
        if (checkPool){
            const sortedBy = listingItems.filter(listing => {
                return listing.pool === true
            })
        } else if (checkHotTub) {
            const sortedBy = listingItems.filter(listing => {
                return listing.hot_tub === true
            })
        } else if (checkWaitStaff) {
            const sortedBy = listingItems.filter(listing => {
                return listing.wait_staff === true
            })
        } else if (checkPool && checkHotTub && checkWaitStaff) {
            listingItems.filter(listing => {
                return listing.pool === true && listing.hot_tub === true && listing.wait_staff === true
            })
            
        }
    
    return (
        <div>
             <FilterSort
                checkPool={checkPool}
                checkHotTub={checkHotTub}
                checkWaitStaff={checkWaitStaff}
                setCheckHotTub={setCheckHotTub}
                setCheckPool={setCheckPool}
                setCheckWaitStaff={setCheckWaitStaff}
            />
            {listingItems}
        </div>
    )
}

export default ListingsContainer