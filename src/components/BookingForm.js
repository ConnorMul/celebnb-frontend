import React, { useState } from 'react'

function BookingForm({ listing }) {
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

      console.log(listing)

    //   console.log(numberOfNightsBetweenDates("01/01/2001", "01/10/2001"))

    return (
    <div>
        {/* {listing.title} */}
        <form className="booking-form">
            <label>
                Check-In Date:
            <input type="date" name="date" value={checkInDate} onChange={(evt) => setCheckInDate(evt.target.value)} />
            </label>
            <br />
            <br />
            <label>
                Check-Out Date:
            <input type="date" name="date" value={checkOutDate} onChange={(evt) => setCheckOutDate(evt.target.value)} />
            </label>
            <br />
            <input type="submit" value="Submit" />
        </form>
        Number of Nights selected: 
        <p>{numberOfNightsBetweenDates(checkInDate, checkOutDate)}</p>
    </div>
    )
}


export default BookingForm