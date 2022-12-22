const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
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
});

httpServer.listen(3001, () => {
  console.log("listening on localhost:3001");
});
