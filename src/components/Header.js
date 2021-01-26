import React from 'react'
import { NavLink, Link } from "react-router-dom";

function Header({ onLogin, onLogout, currentUser, wallet }) {
    

    return (
        <div className="header-container">
            <nav className="navbar">
                <Link className="logo" exact to="/">celebnb</Link> 
                <Link exact to="/listings" className="listings-button">
                    Listings
                </Link>
                {currentUser ?
                 <NavLink to="/bookings">Current Bookings</NavLink> 
                 : null }
                
                {wallet  && currentUser ? <h4>You have ${wallet} available to spend</h4> : null}
                
                {currentUser ?
                    <NavLink className="login-button" to="/" onClick={onLogout}>Log out</NavLink>
                : null }
                {currentUser ? null : <NavLink className="login-button" to="/login">Log in</NavLink> }
                {currentUser ? <h1>Welcome, {currentUser.username}</h1> : null}
            </nav>
        </div>
    )
}

export default Header