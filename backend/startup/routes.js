const express = require("express");
const articles = require("../routes/articles");
const users = require("../routes/users");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/articles", articles);
  app.use("/api/users", users);
};
