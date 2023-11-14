import  { createContext, useContext } from "react";
import { io, Socket } from 'socket.io-client';
import { UserAPI } from "../constants/api";


const BACKEND_URL = UserAPI
export const socketConnection = io(BACKEND_URL)
// export const socketConnection = io("http://localhost:4005/")
export const WebSocketContext = createContext(socketConnection)
export const WebSocketProvider = WebSocketContext.Provider