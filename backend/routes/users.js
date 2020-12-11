const express = require("express");
const router = express();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("./../database/models/user");

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.post("/signup", async (req, res) => {
  const user = new User({
    name: req.body.name,
    password: req.body.password,
  });

  User.findOne({ name: req.body.name }, function (err, user) {
    if (user) {
      res.status(400).json({ text: "This username is already taken." });
      return;
    }
  });

  const result = await user.save();
  res.send(true);
});

router.post("/login", function (req, res) {
  const { name, password } = req.body;

  User.findOne({ name: name, password: password }, function (err, user) {
    if (user) {
      const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

      res.json({
        token,
        name,
      });
    } else {
      res.status(400).json({ text: "Wrong username or password." });
      return;
    }
  });
});

module.exports = router;

// set travel-application_jwtPrivateKey=mySecureKey

/*


      /*res
        .header("x-auth-token", token)
        .send(_.pick(user, ["_id", "name", "password"]));*/
