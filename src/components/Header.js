import React from 'react'
import { NavLink, Link } from "react-router-dom";

function Header({ onLogin, onLogout, currentUser }) {
    return (
        <div className="header-container">
            <nav className="navbar">
                <h1 className="logo">celebnb</h1> 
                <Link exact to="/listings" className="button">
                    Listings
                </Link>
                {currentUser ?
                    <button className="login-button" onClick={onLogout}>Log out</button>
                :
                    <button className="login-button" onClick={onLogin}>Log in</button>}
                {currentUser ? <h1>Welcome, {currentUser.username}</h1> : null}
            </nav>
        </div>
    )
}

export default Header