import React from 'react'

function BookingCard({ booking, handleDeleteBooking }) {


    
    return (
        
            <div className="booking-card">
                <img className="booking-image" src={booking.listing.image} alt={booking.listing.title} />
                <h2 className="booking-title">{booking.listing.title}</h2>
                <p className="booking-dates">{booking.check_in_date} - {booking.check_out_date}</p>
                <button className="delete-btn" onClick={() => handleDeleteBooking(booking)}>Cancel This Trip</button>
            </div>
    
    )
}

export default BookingCard