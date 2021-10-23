import React, { useState, useEffect, createContext } from "react";
import { auth } from "./authentication/firebase"
export const UserContext = createContext({ user: null })
export default (props) => {
    const [user, setuser] = useState(null)
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            const { displayName, email } = user;
            setuser({
                displayName,
                email
            })
        })
    }, [])
    return (
        <UserContext.Provider value={{currentUser: user}}>{props.children}</UserContext.Provider>
    )
}