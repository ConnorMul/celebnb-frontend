import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom"

function ListingDetail({listings}) {

const [listing, setListing] = useState(null)
const [isLoaded, setIsLoaded] =useState(false);

const params = useParams()
console.log(params)

useEffect(() => {
    fetch(`http://localhost:3002/listings/${params.id}`)
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
                <img src={image} alt={title}></img>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>$ {price} per night </p>
                <p>{num_of_guests} number of guests</p>
                <p>{size} Square feet </p>
                <p>{owner}</p>
                <p>{wait_staff ? "Wait staff included" : "Wait staff is not included"}</p>
                <p>{hot_tub ? "Hottub included" : "Hottub not included"}</p>
                <p>{pool ? "Pool inlucuded" : "Pool not included"}</p>
                <div>
                <ul>
                    <li>{comment}</li>
                </ul>
                </div>
            </div>
            )
    
}

export default ListingDetail 