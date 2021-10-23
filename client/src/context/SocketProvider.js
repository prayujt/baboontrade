import React, {createContext, useEffect, useState} from 'react'
import { io } from "socket.io-client";

export const SocketContext = createContext({socket: null})
export const socket = io("http://localhost:8000")

export default (props) => {
const [uid, setuid] = useState('')
const [userName, setuserName] = useState('')
const [email, setemail] = useState('')

const [gameID, setgameID] = useState('')
const [lobby, setlobby] = useState('')



useEffect(() => {
    console.log(socket)
})

return(
    <SocketContext.Provider value={socket}>{props.children}</SocketContext.Provider>
)

}