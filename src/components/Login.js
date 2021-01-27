import React from 'react'
import { Link } from "react-router-dom";

function Login({ onLogin }) {
    return (
        <div className="inner-container">
        <div className="box">
	    <h1>Login</h1>
        <form method="post">
    	    <input type="text" name="u" placeholder="Username"  />
            <input type="password" name="p" placeholder="Password"  />
            <Link type="submit" to="/listings" onClick={onLogin}>Log in</Link>
        </form>
        </div>
        </div>
    )
}

                
export default Login 
