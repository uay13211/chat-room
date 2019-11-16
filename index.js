//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const User = require("./user.model");
const Message = require("./message.model");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("db connected");
});

//when the socket.io is connected
io.on("connection", socket => {
  socket.on("send-message", message => {
    const newMessage = new Message({
      message: message.message,
      username: message.username
    });
    newMessage.save((err, savedMsg) => {
      // send to all people except sender
      io.emit("send-all", savedMsg);
    });
  });
});

app.get("/api/user", (req, res) => {
  User.find({}, (err, foundUsers) => {
    res.send(foundUsers);
  });
});

app.post("/api/user/login", (req, res) => {
  if (req.body) {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne(
      { $or: [{ email: username }, { username: username }] },
      (err, foundUser) => {
        if (err) {
          console.log(err);
          return;
        } else if (!foundUser) {
          res.send("User does not exist");
          return;
        } else if (foundUser) {
          bcrypt.compare(password, foundUser.password, (err, corr) => {
            if (corr) {
              res.send({ message: "Success", username: foundUser.username });
            } else {
              res.send("Incorrect password");
            }
          });
        }
      }
    );
  }
});

app.post("/api/user/signup", (req, res) => {
  if (req.body) {
    let username = req.body.username;
    let email = req.body.email;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
        return;
      } else {
        User.findOne({ username: username }, (err, foundUser) => {
          if (err) {
            console.log(err);
            return;
          } else if (foundUser) {
            res.send("Username already signup");
            return;
          } else if (!foundUser) {
            User.findOne({ email: email }, (err, foundEmail) => {
              if (err) {
                console.log(err);
                return;
              } else if (foundEmail) {
                res.send("Email already signup");
                return;
              } else if (!foundEmail) {
                const newUser = new User({
                  username: username,
                  email: email,
                  password: hash
                });
                newUser.save((err, savedUser) => {
                  if (!err) {
                    res.send("User signup!");
                  } else {
                    console.log(err);
                    res.status(400);
                    return;
                  }
                });
              }
            });
          }
        });
      }
    });
  }
});

app.delete("/api/user/:username", (req, res) => {
  User.deleteOne({ username: req.params.username }, err => {
    if (err) {
      console.log(err);
    }
  });
});

app.post("/api/message", (req, res) => {
  const newMessage = new Message({
    message: req.body.message,
    username: req.body.username
  });
  newMessage.save((err, savedMsg) => {
    res.send(savedMsg);
  });
});

app.get("/api/message", (req, res) => {
  Message.find({}, (err, AllMessage) => {
    if (!err) {
      res.send(AllMessage);
    } else {
      console.log(err);
    }
  });
});

server.listen(5000);
