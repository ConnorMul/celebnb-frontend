import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from './Home'
import ListingsContainer from './ListingsContainer'
import Login from './Login'
import './App.css';
import Search from './Search'
import ListingDetail from './ListingDetail'
import FilterSort from "./FilterSort";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState("")
  const [listings, setListings] = useState([])

  useEffect(() => {
    fetch("http://localhost:3002/listings")
    .then(r => r.json())
    .then(setListings)
  }, [])

  function handleLogin() {
    fetch("http://localhost:3000/autologin")
      .then((r) => r.json())
      .then(setCurrentUser);
  }

  function handleLogout() {
    setCurrentUser(null);
  }
  function handleSearchChange(newSearch){
    setSearch(newSearch)
  }

  const displayedListings = listings.filter(listing => listing.location.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="App">
      <Header 
        onLogin={handleLogin}
        onLogout={handleLogout} 
        currentUser={currentUser}
        />
      <Search search={search} handleSearchChange={handleSearchChange}/>
     
      
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/listings/:id">
          <ListingDetail listings={listings}/>
        </Route>
        <Route path="/listings">
          <ListingsContainer listings={displayedListings}/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
