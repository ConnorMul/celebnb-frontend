import React, { useState } from 'react'

function BookingForm({ listing, currentUser }) {
    const [checkInDate, setCheckInDate] = useState("")
    const [checkOutDate, setCheckOutDate] = useState("")
   
    
    const numberOfNightsBetweenDates = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        let dayCount = 0
      
        while (end > start) {
          dayCount++
          start.setDate(start.getDate() + 1)
        }
      
        return dayCount
      }

      const totalListingPriceForStay = (currentListing) => {
        const totalPrice = currentListing.price * numberOfNightsBetweenDates(checkInDate, checkOutDate)

        return totalPrice
      }

      const handleChange = (evt) => {
        if (evt.target.name === "check-in-date") {
            setCheckInDate(evt.target.value)
            setFormData({...formData, checkInDate: evt.target.value})
        } else if (evt.target.name === "check-out-date") {
            setCheckOutDate(evt.target.value)
            setFormData({...formData, checkOutDate: evt.target.value})
        } else if (evt.target.name === "nights") {
            setFormData({...formData, numberOfNights: numberOfNightsBetweenDates(checkInDate, checkOutDate)})
        } else {
            setFormData({...formData, totalPrice: totalListingPriceForStay(listing)})
        }
      }

      const [formData, setFormData] = useState({
        checkInDate: "",
        checkOutDate: "",
        numberOfNights: numberOfNightsBetweenDates(checkInDate, checkOutDate),
        totalPrice: totalListingPriceForStay(listing),
        listing: listing,
        user: currentUser
    })

    const handleSubmit = (evt) => {
        evt.preventDefault()
        console.log(formData)
    }

      console.log(formData)
    return (
    <div>
        {/* {listing.title} */}
        <form className="booking-form" onSubmit={handleSubmit}>
            <label>
                Check-In Date:
                <input type="date" name="check-in-date" value={checkInDate} onChange={handleChange} />
            </label>
            <br />
            <br />
            <label>
                Check-Out Date:
                <input type="date" name="check-out-date" value={checkOutDate} onChange={handleChange} />
            </label>
            <br />
            <label>
            Number of Nights selected: 
                <input type="number" name="nights" value={numberOfNightsBetweenDates(checkInDate, checkOutDate)} />
            </label>
            <label>
                Total Price for this stay:
                <input type="number" name="total-price" value={totalListingPriceForStay(listing)}/>
            </label>
            <input type="submit" value="Submit" />
            
        </form>
    
    </div>
    )
}


export default BookingForm