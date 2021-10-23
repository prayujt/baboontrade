import React, { useContext, useEffect, useState } from "react";
import { signInWithGoogle } from "../authentication/firebase";
import { UserContext } from "../UserProvider";
import { Redirect, Route } from "react-router-dom";

export default function Login() {
    const user = useContext(UserContext)
    const [redirect, setredirect] = useState(null)

    useEffect(() => {
        if (user) {
            setredirect('/')
        }
        
    }, [user]);

    if(redirect) {
        return <Redirect to={redirect}/>   
    }


    return (
        <div>
            <button className="button" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>
        </div>
    )
}