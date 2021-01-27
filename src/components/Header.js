import React from 'react'
import { NavLink, Link } from "react-router-dom";
import globe from '../assets/glo.png'


function Header({ onLogin, onLogout, currentUser, wallet }) {

    return (
        <>
        <h1 className="maintitle"><Link className="logo" exact to="/">Celebnb</Link></h1>
        <div id="container">
                <nav>
                    <ul>
                        <li><NavLink exact to="/listings">
                            Listings
                            </NavLink>
                        </li>
                        <li>{currentUser ?
                        <NavLink to="/bookings">Current Bookings</NavLink> 
                        : null }
                        </li>
                        <li>{currentUser ?
                        <NavLink className="login-button" to="/" onClick={onLogout}>Log out</NavLink>
                        : null }</li>
                        <li>{currentUser ? null : <NavLink className="login-button" to="/login">Log in</NavLink> } </li>
                    </ul>
            </nav>
            {currentUser ? <h1 className="welcome-user">Welcome, {currentUser.username}! You have ${wallet} to spend</h1> : null}
        </div>
        </>
    )
}


export default Header