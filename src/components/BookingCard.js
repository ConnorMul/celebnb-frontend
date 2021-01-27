import React from 'react'

function BookingCard({ booking, handleDeleteBooking }) {


    
    return (
        
            <div className="booking-card">
                <img src={booking.listing.image} alt={booking.listing.title} />
                <h2>{booking.listing.title}</h2>
                <h5>Dates of your trip:</h5>
                <p>{booking.check_in_date} - {booking.check_out_date}</p>
                <button className="delete-btn" onClick={() => handleDeleteBooking(booking)}>Cancel This Trip</button>
            </div>
    
    )
}

export default BookingCard