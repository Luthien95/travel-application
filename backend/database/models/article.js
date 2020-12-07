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
    country: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: String,
      required: true,
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
