import React, {useState, useEffect, useContext} from "react"
import { Redirect } from "react-router"
import { logout } from "../authentication/firebase"
import { UserContext } from "../UserProvider"

export default function Lobby() {

    const user = useContext(UserContext);
    const [redirect, setredirect] = useState(null);
    

    useEffect(() => {
        if(!user) {
            setredirect("/")
            console.log(user)
        }
    });

    const handleClick = () => {
        logout();
        window.location.reload(false)
     
    }

    if(!user.loggedIn) {
        return <Redirect to={redirect}/>
    };

    return (
        <button onClick={handleClick}>Sign Out</button>
    );
};