import React, { useState } from 'react'
import { Redirect, useHistory } from "react-router-dom";

function BookingForm({ listing, currentUser, bookings, setBookings, setWallet, wallet }) {
    const [checkInDate, setCheckInDate] = useState("")
    const [checkOutDate, setCheckOutDate] = useState("")

    const history = useHistory()
    
    const numberOfNightsBetweenDates = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        let dayCount = 0
      
        while (end > start) {
          dayCount++
          start.setDate(start.getDate() + 1)
        }
        // setNumberOfNights(dayCount)
        return dayCount
      }

      const totalListingPriceForStay = listing.price * numberOfNightsBetweenDates(checkInDate, checkOutDate)
    

      const handleChange = (evt) => {
        if (evt.target.name === "check-in-date") {
            setCheckInDate(evt.target.value)
            setFormData({...formData, check_in_date: evt.target.value})
        } else if (evt.target.name === "check-out-date") {
            setCheckOutDate(evt.target.value)

            setFormData({
                ...formData, 
                check_out_date: evt.target.value
            })
        }
      }

    //   const handleNightsChange = (evt) => {
    //     setNumberOfNights(numberOfNightsBetweenDates(checkInDate, checkOutDate))
    //     setFormData({...formData, numberOfNights: numberOfNightsBetweenDates(checkInDate, checkOutDate)})
    //   }

    //   const handlePriceChange = (evt) => {
    //       setTotalPrice(totalListingPriceForStay)
    //       setFormData({...formData, totalPrice: totalListingPriceForStay})
    //   }

      const [formData, setFormData] = useState({
        check_in_date: "",
        check_out_date: "",
        number_of_nights: 0,
        total_price: 0,
        listing_id: listing.id,
        user_id: currentUser
    })

    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (wallet >= totalListingPriceForStay) {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/bookings/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    total_price: totalListingPriceForStay,
                    number_of_nights: numberOfNightsBetweenDates(checkInDate, checkOutDate),
                    listing_id: listing.id,
                    user_id: currentUser.id
                })
            })
            .then(resp => resp.json())
            .then(bookingObj => {
                setBookings([...bookings, bookingObj])
                
                    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${currentUser.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            money_in_wallet: wallet - totalListingPriceForStay
                        })
                    })
                    .then(r => r.json())
                    .then(updatedUserObj => setWallet(updatedUserObj.money_in_wallet))
                    history.push("/bookings")
                })
                } else {
                    alert("You don't have enough to book this listing lol poor")
                }
    }
        


      console.log(formData)
    return (
    <div>
        {/* {listing.title} */}
        <form className="booking-form" onSubmit={handleSubmit}>
            <label>
                Check-In Date:
                <input 
                    type="date" 
                    name="check-in-date" 
                    value={checkInDate} 
                    onChange={handleChange} 
                />
            </label>
            <br />
            <br />
            <label>
                Check-Out Date:
                <input 
                    type="date" 
                    name="check-out-date" 
                    value={checkOutDate} 
                    onChange={handleChange} 
                />
            </label>
            <br />
            <label>
                Number of Nights selected: 
                <input 
                    type="text" 
                    name="nights" 
                    value={numberOfNightsBetweenDates(checkInDate, checkOutDate)} 
                    // onChange={handleNightsChange} 
                />
            </label>
            <label>
                Total Price for this stay:
                <input 
                    type="text" 
                    name="price" 
                    value={totalListingPriceForStay} 
                    // onChange={handlePriceChange}
                    />
            </label>
            <input type="submit" value="Submit" />
            
        </form>
    
    </div>
    )
}


export default BookingForm