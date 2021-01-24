import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from './Home'
import ListingsContainer from './ListingsContainer'
import './App.css';
import ListingDetail from './ListingDetail'
import BookingForm from "./BookingForm";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState("")
  const [listings, setListings] = useState([])
  const [sortBy, setSortBy] = useState("All")

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/listings`)
    .then(r => r.json())
    .then(setListings)
  }, [])

  function handleLogin() {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/login`)
      .then((r) => r.json())
      .then(setCurrentUser);
  }

  function handleLogout() {
    setCurrentUser(null);
  }
  function handleSearchChange(newSearch){
    setSearch(newSearch)
  }

  const displayedListings = listings.filter(listing => 
    listing.location.toLowerCase().includes(search.toLowerCase()))
    .filter(listing => {
      if (sortBy === "All") {
        return listing
      } else if (sortBy === "Pool") {
        return listing.pool
      } else if (sortBy === "Hot Tub") {
        return listing.hot_tub
      } else if (sortBy === "Wait Staff") {
        return listing.wait_staff
      }
    })

  return (
    <div className="App">
      <Header 
        onLogin={handleLogin}
        onLogout={handleLogout} 
        currentUser={currentUser}
        />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/listings/:id">
          <ListingDetail 
            listings={listings}
          />
        </Route>
        <Route path="/listings">
          <ListingsContainer 
            listings={displayedListings}
            sortBy={sortBy}
            setSortBy={setSortBy}
            search={search} 
            handleSearchChange={handleSearchChange}
          />
        </Route>
        <Route path="/bookings/new">
          <BookingForm />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
