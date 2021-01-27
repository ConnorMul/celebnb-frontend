import React from 'react'
import { NavLink, Link } from "react-router-dom";
import globe from '../assets/glo.png'


function Header({ onLogin, onLogout, currentUser, wallet }) {

    return (
        <div id="header">
            <p className="site-logo">
                Celebnb</p> 

            <nav role="navigation" id="nav-main" className="okayNav">
                <ul>
                    <li><Link exact to="/listings">
                    <img className="globe" src={globe} alt="globe"/>
                        </Link>
                    </li>
                    <li>{currentUser ?
                 <NavLink to="/bookings">Current Bookings</NavLink> 
                 : null }</li>
                    <li><Link className="logo" exact to="/">Home</Link> </li>
                    <li>{currentUser ?
                    <NavLink className="login-button" to="/" onClick={onLogout}>Log out</NavLink>
                : null }</li>
                    <li>{currentUser ? null : <NavLink className="login-button" to="/login">Log in</NavLink> } </li>
                    
                </ul>
            </nav>
            {currentUser ? <h1>Welcome, {currentUser.username}</h1> : null}
            {wallet  && currentUser ? <h4>${wallet} remaining</h4> : null}
        </div>
    )
}


export default Header