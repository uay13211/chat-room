//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
// socket io
const server = require("http").createServer(app);
const io = require("socket.io")(server);

//sql connection
const connection = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//when the socket.io is connected
io.on("connection", socket => {
  // do some stuff
  socket.on("send-message", data => {
    // send to all people
    socket.broadcast.emit('send-all', data)
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log("sended");
});

server.listen(3000);
