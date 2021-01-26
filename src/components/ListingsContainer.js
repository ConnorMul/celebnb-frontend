import React, { useState } from 'react'
import FilterSort from './FilterSort'
import ListingCard from './ListingCard'
import MyMap from './MyMap'
import Search from './Search'
function ListingsContainer({ listings, sortBy, setSortBy, search, handleSearchChange }) {

    const listingItems = listings.map(listing => {
        return (
        <ListingCard
            key={listing.id}
            listing={listing}
        />
        )
    })

    return (
        <>
            <Search 
                search={search} 
                handleSearchChange={handleSearchChange}
            />
            <FilterSort
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
        
            <div className="listings-container">
                <MyMap listings={listings}/>
            </div>
        </>
    )
}

export default ListingsContainer