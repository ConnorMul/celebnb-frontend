import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"

function ListingDetail({listings}) {

const [listing, setListing] = useState(null)
const [isLoaded, setIsLoaded] =useState(false);

const params = useParams()

useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/listings/${params.id}`)
      .then((r) => r.json())
      .then((listing) => {
        setListing(listing);
        setIsLoaded(true);
      });
  }, [params.id]);

  if (!isLoaded) return <h2>Loading...</h2>;

  const { image, title, price, description, comment, num_of_guests, size, owner, wait_staff, hot_tub, pool } = listing;
        
        return (
            <div>
                <img src={image} alt={title} className="listing-detail-image"></img>
                <div className="listing-details-card">
                    <h2 className="listing-detail-title">{title}</h2>
                    <p className="listing-detail-description">{description}</p>
                    <p className="listing-detail-price">$ {price} per night </p>
                    <p className="listing-detail-guests">{num_of_guests} number of guests</p>
                    <p className="listing-detail-size">{size} Square feet </p>
                    <p className="listing-detail-owner">{owner}</p>
                    <p className="listing-detail-amenities">{wait_staff ? "Wait staff included" : "Wait staff is not included"}</p>
                    <p className="listing-detail-amenities">{hot_tub ? "Hot Tub included" : "Hot Tub not included"}</p>
                    <p className="listing-detail-amenities">{pool ? "Pool included" : "Pool not included"}</p>
                    <p className="listing-detail-comment">{comment}</p>
                </div>
                
            </div>
            )
}

export default ListingDetail 