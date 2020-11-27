const express = require("express");
const router = express();
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
  res.send(result);
});

module.exports = router;
