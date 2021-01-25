import React from 'react'
import BookingCard from './BookingCard'

function BookingList({ bookings, handleDeleteBooking }) {
    
    const bookingItems = bookings.map((booking) => {
        return (<BookingCard 
            key={booking.id}
            booking={booking}
            handleDeleteBooking={handleDeleteBooking}
        />
        )
    })

    return(
        <div className="booking-container">
            <h1> Current bookings </h1>
            {bookingItems.length > 0 ? bookingItems : "You have no bookings yet, check out our listings!"}
        </div>
    )
}

export default BookingList