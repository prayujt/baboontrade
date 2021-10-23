import React, { useState, useEffect, createContext } from "react";
import { auth } from "./authentication/firebase"
export const UserContext = createContext({ user: null })
export default (props) => {
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [user, setUser] = useState(null)


    useEffect(() => {
        auth.onAuthStateChanged(async (newUser) => {
          if(newUser) {
              const token = await newUser
              newUser = {
                  uid: newUser.uid,
                  name: newUser.displayName,
                  email: newUser.email
              }
              console.log(newUser)
              setisLoggedIn(true)
              setUser(newUser)
          }
          
        })
    }, [])

    const value = {
        currentUser: user,
        loggedIn: isLoggedIn
    }

    
    return (
        <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
    )
}