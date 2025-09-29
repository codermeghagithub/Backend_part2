import express from "express";
import { WebSocketServer } from "ws";

const app = express();

const httpServer = app.listen(8080, () =>
  console.log("Server is running on port 8080")
);

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws, req) => {
  console.log("New web connection from :", req.socket.remoteAddress);

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log("received :", data);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "broadcast",
            message: data.message,
            timeStamp: new Date().toISOString(),
          })
        );
      }
    });
  });

  ws.on("Close", () => {
    console.log("client Disconnect ");
  });
});
