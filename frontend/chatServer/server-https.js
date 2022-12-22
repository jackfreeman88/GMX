const express = require("express");
const { readFileSync } = require("fs");
const { createServer } = require("https");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(
  {
    key: readFileSync("ssl/key.pem"),
    cert: readFileSync("ssl/crt.pem"),
  },
  app
);

const io = new Server(httpServer, {
  cors: {
    origin: "https://www.greenmarketexchange.com",
  },
});
app.get("/", function (req, res) {
  res.send("Access Forbidden!");
});
io.on("connection", (socket) => {
  socket.on("joinRoom", function (user, callback) {
    socket.join(user.username);
  });
  socket.on("new_message", function (data) {
    io.to(data.receiver).emit("new_message", data);
  });
  socket.on("notificationRoom", function (user, callback) {
    socket.join(user.username);
  });
  socket.on("new_notification", function (data) {
    io.to(data.receiver).emit("new_notification", data);
  });
});

httpServer.listen(3007, () => {
  console.log("listening on localhost:3007");
});
