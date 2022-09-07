const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, "../public");

app.use(express.static(publicDirPath));

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  socket.emit("message", "Welcome!");
  socket.broadcast.emit("message", "A new user has joined!");

  socket.on("sendMessage", (message, callback) => {
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("profanity is not allowed!");
    }

    io.emit("message", message);
    callback();
  });

  socket.on("sendLocation", (coords, callback) => {
    io.emit(
      "sendLocation",
      `https://www.google.com/maps?q=${coords.lat},${coords.long}`
    );
    callback();
  });

  socket.on("disconnect", () => io.emit("message", "A user has left!"));
});

server.listen(port, () => console.log(`Server is up on port ${port}!`));