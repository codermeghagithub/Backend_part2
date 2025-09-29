// import React, {useEffect,useState,useRef} from 'react'
// import { connectWs} from './ws';
// const App = () => {
//   const socket=useRef(null);
//   useEffect(()=>{
//     connectWs
//   },[])
//   return (
//     <div className='text-green-600'>App</div>
//   )
// }

// export default App

import { useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  useEffect(() => {
    // connect to backend server
    const socket = io("http://localhost:4600");

    // log connection success + socket id
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
    });

    // cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return <h1 className="text-2xl font-bold">Chat App</h1>;
}

export default App;
