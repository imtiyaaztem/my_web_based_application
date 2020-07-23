const Express = require("express");
const Users = Express.Router();
const Cors = require("cors");
const Jwt = require("jsonwebtoken");
const Bcrypt = require("bcrypt");

const user = require("../Models/User");
const { Mongoose } = require("mongoose");
Users.use(Cors());

process.env.Secret_Key = "secret";

Users.post("/register", (req, res) => {
  const UserData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    password: req.body.password,
  };

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        Bcrypt.hash(req.body.password, 20, (err, hash) => {
          UserData.password = hash;
          User.create(UserData)
            .then((user) => {
              res.json({ status: User.email + "registered" });
            })
            .catch((err) => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ err: "user already exist, please contact us for help" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

Users.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((User) => {
      if (User) {
        if (Bcrypt.compareSync(req.body.password, User.password)) {
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          };
          let Token = Jwt.sign(payload, process.env.Secret_Key, {
            expiresIn: 5000,
          });
          res.send(Token);
        } else {
          res.json({ error: "User does not exits, please register" });
        }
      } else {
        res.json({ error: "User does not exits, please register" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});
module.exports = Users;
