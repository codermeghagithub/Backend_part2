import {createServer} from "http";
import {Server} from "socket.io";
import express from "express";
const app=express();
const server=createServer(app);

const io=new Server(server, {
  cors:{
  origin:"*",
},});


io.on("connection",(socket)=>{
  console.log("a user connected",socket.id);
  
})
app.get("/",(req,res)=>{
  res.send("<h1>Hello world</h1>");
});

server.listen(4600, () => {
  console.log("server running at http://localhost:4600");
});


