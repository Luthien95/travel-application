const express = require("express");
const articles = require("../routes/articles");
const users = require("../routes/users");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (app) {
  app.use(express.json());

  /*app.use(function (req, res, next) {
    //const token =
    //  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmJlMjQ5NDE3OGIzMjQ4Y2M3MjdmMTMiLCJpYXQiOjE2MDcwOTEyNzB9.-KKUkCNTb-LZV_PCrXuj0Mr323CGATMnXB3kT_Mi0Y4";
    //const token = jwt.sign({ _id: "cycuszki" }, config.get("jwtPrivateKey"));
    //console.log(token);
    //console.log(req.headers.token);
    console.log(req.url);
    if (req.url === "/api/users/login" || req.url === "/api/users/register") {
      // next();
      console.log("fsf");
    } else {
      jwt.verify(req.headers.token, config.get("jwtPrivateKey"), function (
        err,
        decodedToken
      ) {
        if (err) {
          console.log(err);
        } else {
          console.log("2");
          console.log(decodedToken);
          req.userId = decodedToken._id; // Add to req object
          console.log(decodedToken._id);
          next();
        }
        console.log("3");
      });
    }
  });*/

  app.use("/api/articles", articles);
  app.use("/api/users", users);
};
