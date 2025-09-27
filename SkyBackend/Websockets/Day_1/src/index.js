import Websocket, {WebSocketServer} from "ws";
import http from "http";


const server =http.createServer((req,res)=>{
  console.log((new Data())+ "Received request for " +req.url);
  res.end("Hello World")
  
})


const wss=new WebSocketServer({server});
wss.on("connection",(ws)=>{
  console.log("Client connected");
  ws.on("message",(message)=>{
    console.log("receive: %s",message);
    
  })
  ws.send("Hello Friends")
  
})

server.listen(8000,()=>
  console.log("Server is running on port 8000")
);