import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from './Home'
import ListingDetail from './ListingDetail'
import ListingsContainer from './ListingsContainer'
import Login from './Login'
// import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/listings/:id">
          <ListingDetail />
        </Route>
        <Route path="/listings">
          <ListingsContainer />
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
