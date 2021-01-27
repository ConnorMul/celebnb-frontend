import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from './Home'
import ListingsContainer from './ListingsContainer'
import './App.css';
import ListingDetail from './ListingDetail'
import BookingList from "./BookingList";
import Login from "./Login"

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState("")
  const [listings, setListings] = useState([])
  const [sortBy, setSortBy] = useState("All")
  const [bookings, setBookings] = useState([])
  const [wallet, setWallet] = useState(null)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/listings`)
    .then(r => r.json())
    .then(setListings)
  }, [])

  function handleLogin() {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/login`)
      .then((r) => r.json())
      .then(userObj => {
        setCurrentUser(userObj)
        setBookings(userObj.bookings)
        setWallet(userObj.money_in_wallet)
      });
  }

  function handleLogout() {
    setCurrentUser(null);
  }

  function handleSearchChange(newSearch){
    setSearch(newSearch)
  }

  function handleDeleteBooking(bookingToDelete) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/bookings/${bookingToDelete.id}`, {
        method: "DELETE"
    })
    .then(r => r.json())
    .then(bookingObj => {
      setBookings(bookings.filter((booking) => booking.id !== bookingToDelete.id))
      fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          money_in_wallet: wallet + bookingToDelete.total_price
        })
      })
      .then(r => r.json())
      .then(updatedUserObj => setWallet(updatedUserObj.money_in_wallet))
    })
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
        wallet={wallet}
        />

      <Switch>
        <Route exact path="/">
          <Home 
            listings={listings}
          />
        </Route>
        <Route exact path="/listings/:id">
          <ListingDetail 
            currentUser={currentUser}
            listings={listings}
            setBookings={setBookings}
            bookings={bookings}
            wallet={wallet}
            setWallet={setWallet}
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
        <Route path="/bookings">
          <BookingList 
            bookings={bookings} 
            handleDeleteBooking={handleDeleteBooking}
          />
        </Route>
        <Route path="/login">
          <Login 
            currentUser={currentUser} 
            onLogin={handleLogin} 
          />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
