const mongoose = require("mongoose");

const ArticleLike = mongoose.model(
  "ArticleLike",
  new mongoose.Schema({
    articleId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  })
);

exports.ArticleLike = ArticleLike;
