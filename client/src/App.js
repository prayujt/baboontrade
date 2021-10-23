import React, {useState, useEffect} from 'react'
import socketIOClient from "socket.io-client";
import Login from './components/Login';
import UserProvider from './UserProvider';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {

  

  useEffect(() => {
    const socket = socketIOClient("http://localhost:8000/");
    //console.log(socket)
  })

  return (
      // <UserProvider>
      // <Router>

      // </Router>
      // </UserProvider>
      <Login/>
  );
}

export default App;
