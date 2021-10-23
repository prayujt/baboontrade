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
      <UserProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/">
              <Login/>
            </Route>
            <Route path="/lobby">
              <Login/>
            </Route>
          </Switch>
        </div>
      </Router>
      </UserProvider>
  );
}

export default App;
