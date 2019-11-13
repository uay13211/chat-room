//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mySecret = process.env.MYSECRET;
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
const server = require("http").createServer(app);
const io = require("socket.io")(server);

//sql connection
const connection = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: "sql12311056"
});

// // create table
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected");
//   let createTable = "CREATE TABLE users (username VARCHAR(255), email VARCHAR(255), password VARCHAR(255))"
//   connection.query(createTable, (err, result)=>{
//     if(err) throw err;
//     console.log("table created")
//   })
// });

//when the socket.io is connected
io.on("connection", socket => {
  // do some stuff
  socket.on("send-message", data => {
    // send to all people
    socket.broadcast.emit("send-all", data);
  });
});

app.get("/api/users", (req, res) => {
  connection.query(`SELECT * FROM users`, (err, result) => {
    res.send(result);
  });
});

app.post("/api/login", (req, res) => {
  if (req.body) {
    let username = req.body.username;
    let password = req.body.password;
    connection.query(
      `SELECT * FROM users WHERE username = '${username}' OR email = '${username}'`,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        } else if (result.length === 0) {
          res.send("User does not exist");
          return;
        } else if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (err, corr) => {
            if (corr) {
              res.send("Success");
            } else {
              res.send("Incorrect password");
            }
          });
        }
      }
    );
  }
});

app.post("/api/signup", (req, res) => {
  if (req.body) {
    let username = req.body.username;
    let email = req.body.email;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      connection.query(
        `SELECT * FROM users WHERE username = ? OR email = ?`,
        [username, email],
        (err, foundUser) => {
          if (err) {
            console.log(err);
            return;
          } else if (foundUser.length > 0) {
            if (foundUser[0].username === username) {
              res.send("User already exist");
              return;
            } else if (foundUser[0].email === email) {
              res.send("Email already signup");
              return;
            }
          } else if (foundUser.length === 0) {
            connection.query(
              `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hash}')`,
              (err, result) => {
                if (!err) {
                  res.send("users signup!");
                } else {
                  console.log(err);
                }
              }
            );
          }
        }
      );
    });
  }
});

app.delete("/api/user/:username", (req, res) => {
  connection.query(
    `DELETE FROM users WHERE username = '${req.params.username}'`,
    (err, result) => {
      if (result) {
        console.log(result);
        res.send("Successfully delete");
      } else {
        console.log(err);
      }
    }
  );
});

server.listen(5000);
