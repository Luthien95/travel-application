const mongoose = require("mongoose");

const Article = mongoose.model(
  "Article",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    img: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
  })
);
/*
Article.Schema.methods.toString = function () {
  console.log(this.title);
};
*/

exports.Article = Article;
