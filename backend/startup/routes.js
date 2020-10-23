const express = require("express");
const articles = require("../routes/articles");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/articles", articles);
};
