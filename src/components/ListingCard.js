import React from 'react'
import { NavLink, Link } from "react-router-dom";

function ListingCard() {
    return (
        <div>
            <Link to="/listings/:id" >
                See More Details on this Listing
            </Link>
        </div>
    )
}

export default ListingCard