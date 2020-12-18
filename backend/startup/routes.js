const express = require("express");
const articles = require("../routes/articles");
const articleLikes = require("../routes/articleLikes");
const users = require("../routes/users");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (app) {
  app.use(express.json());

  app.use(function (req, res, next) {
    if (req.url === "/api/users/login" || req.url === "/api/users/register") {
      next();
      return;
    }

    console.log("2");
    console.log(req.headers.authorization);

    jwt.verify(
      req.headers.authorization,
      config.get("jwtPrivateKey"),
      function (err, decodedToken) {
        if (err) {
          console.log(err);
          res.status(401).send("No token.");
          return;
        } else {
          req.userId = decodedToken._id;
          console.log("loguje");
          next();
        }
      }
    );
  });

  app.use("/api/articles", articles);
  app.use("/api/users", users);
  app.use("/api/likes", articleLikes);
};

/*

//const token = jwt.sign({ _id: "cycuszki" }, config.get("jwtPrivateKey"));
    //console.log(req.headers.token);
    //console.log(req.headers.authorization);
//console.log(decodedToken);
*/
