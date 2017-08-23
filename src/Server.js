import GameBoard from "./GameBoard";
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    GameBoard.userChoice();
    ws.send(GameBoard.state.tiles);
  });

  ws.send("something");
});
