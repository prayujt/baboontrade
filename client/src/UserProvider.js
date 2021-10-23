import React, { useState, useEffect, createContext } from "react";
import { auth } from "./authentication/firebase"
export const UserContext = createContext({ user: null })
export default (props) => {
    const [user, setuser] = useState(null)

    const addUser = () => {
        
    }

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
          if(user) {
              const token = await user
              console.log(token)
          }
          
        })
    }, [])
    return (
        <UserContext.Provider value={{currentUser: user}}>{props.children}</UserContext.Provider>
    )
}