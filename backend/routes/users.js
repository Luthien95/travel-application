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
  res.send(true);
});

router.post("/login", function (req, res) {
  const { name, password } = req.body;

  User.findOne({ name: req.body.name, password: req.body.password }, function (
    err,
    user
  ) {
    if (user) {
      res.redirect("/");
      res.send(true);
    } else {
      res.status(400).json({ text: "Login failed" });
      return;
    }
  });
  /*
  if (user) {
    //const authToken = generateAuthToken();

    // Store authentication token
    // authTokens[authToken] = user;

    // Setting the auth token in cookies
    //res.cookie("AuthToken", authToken);

    // Redirect user to the protected page
    res.redirect("/articleList");
  } else {
    res.status(400).json({ text: "Login failed" });
    return;
  }*/
});

module.exports = router;
