import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

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
        if (currentUser && wallet >= totalListingPriceForStay) {
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
                } else if (currentUser === null) {
                   alert("You must be logged in to book a trip")
                } else {
                    alert("You don't have enough to book this listing lol poor")
                }
    }

      console.log(formData)
    return (
    <div className="booking-widget">

            <form onSubmit={handleSubmit}>
                <br />
                <ul className='booking-widget__form'>
                    <li>
                        <label for='check-in'> Check in </label>
                        <div id='check-in' className='form-field'>
                            <input 
                                type="text" 
                                name="check-in-date" 
                                value={checkInDate} 
                                onChange={handleChange} 
                                placeholder="01/01/2021"
                            />
                        </div>

                    </li>
                    <li>
                         <label for='check-in'>Check out</label>
                         <div id='check-out' className='form-field'>
                            <input 
                                type="text" 
                                name="check-out-date" 
                                value={checkOutDate} 
                                onChange={handleChange} 
                                placeholder="01/31/2021"
                            />
                        </div>

                    </li>

                    <li>
                     <div class='form__dropdown'id="night">
                        <label for='childrenAmount'>Total Nights</label>
                      <div class='form-field'> 
                            <input 
                            type="text" 
                            name="nights" 
                            value={numberOfNightsBetweenDates(checkInDate, checkOutDate)} 
                            // onChange={handleNightsChange} 
                            />
                      </div>
                    </div>
                    </li>


                    <li>
                     <div class='form__dropdown' id="cost">
                        <label for='childrenAmount'>Total Cost</label>

                      <div class='form-field'>
                            <input
                            type="text"
                            name="price"
                            value={totalListingPriceForStay} 
                            // onChange={handlePriceChange}
                            />
                      </div>
                    </div>
                    </li>
                    <li>
                        <input type="submit" value="Submit" id='bookingSubmit' class='form__submit'  />
                    </li>
                </ul>
            </form>
        </div>
    
    )
}


export default BookingForm

