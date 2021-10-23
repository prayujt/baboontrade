import React, { useState, useEffect, useContext } from 'react'
import Login from './components/Login';
import UserProvider from './UserProvider';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SocketProvider from './context/SocketProvider';
import Lobby from './components/Lobby';

function App() {



  // useEffect(() => {
  //   const socket = socketIOClient("http://localhost:8000/");
  //   //console.log(socket)
  // })

  return (
    // <UserProvider>
    // <Router>d

    // </Router>
    // </UserProvider>

    <UserProvider>
      <SocketProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/lobby" component={Lobby}/>
          </Switch>
        </Router>
      </SocketProvider>
    </UserProvider>


  );
}

export default App;
