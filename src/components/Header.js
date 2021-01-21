import React from 'react'
import { NavLink, Link } from "react-router-dom";

function Header() {
    return (
        <div>
            <nav>
            <h1>celebnb</h1>
            <Link exact to="/listings" className="button">
                Listings
            </Link>
            
            <Link exact to="/login" className="button">
                Login
            </Link>
            </nav>
        </div>
    )
}

export default Header