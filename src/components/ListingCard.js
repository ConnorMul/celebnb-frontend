import React from 'react'
import { NavLink, Link, useParams } from "react-router-dom";

function ListingCard({ listing }) {

    function handleLike() {
        console.log("liked")
    }

    const params = useParams(1)

    return (
        <div className="listing-card">
            <img className="listing-image" src={listing.image} alt={listing.title}></img>
            
            <h4 className="listing-title">{listing.title}</h4>
            <p className="listing-price">{listing.price}</p>
            <p className="listing-location">{listing.location}</p>
            <button className="like-btn" onClick={handleLike}>
                <p>{listing.likes} Likes</p>
            </button>
            <Link to={`listings/:id`} >
                See More Details on this Listing & Book your stay
            </Link>
            {/* <ListingDetail listing={listing}/> */}
        </div>
    )
}

export default ListingCard