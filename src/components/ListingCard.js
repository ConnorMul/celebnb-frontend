import React, { useState } from 'react'
import {  Link } from "react-router-dom";

function ListingCard({ listing }) {
    const [likes, setLikes] = useState(listing.likes)

    function handleLike() {

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                likes: likes + 1 
            })
        }

        fetch(`${process.env.REACT_APP_API_BASE_URL}/listings/${listing.id}`, configObj)
        .then(r => r.json())
        .then(likeObj => {
            listing.likes = parseInt(listing.likes) + 1
            setLikes(likeObj.likes)
        })
    }

    return (
        <div className="listing-card">
            <img className="listing-image" src={listing.image} alt={listing.title}></img>
            
            <h4 className="listing-title">{listing.title}</h4>
            <p className="listing-price">${listing.price} a night</p>
            
            <p className="like-text">{listing.likes}</p>
            <button className="like-btn" onClick={handleLike}>
                 💜
            </button>
           
            
            <Link to={`listings/${listing.id}`} >
                <p className="listing-details-link">Book Your Stay</p>
            </Link>
            
            {/* <ListingDetail listing={listing}/> */}
            
        </div>
    )
}

export default ListingCard