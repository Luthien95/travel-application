const express = require("express");
const router = express();
const { ArticleLike } = require("./../database/models/articleLike");

router.get("/", async function (req, res, next) {
  ArticleLike.countDocuments({ articleId: req.query.articleId }, function (
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      ArticleLike.findOne(
        { articleId: req.query.articleId, userId: req.userId },
        function (err, user) {
          if (user) {
            res.json({ numberOfLikes: result, ifUserLiked: true });
            return;
          } else {
            res.json({ numberOfLikes: result, ifUserLiked: false });
          }
        }
      );
    }
  });
});

router.post("/addLikeToArticle", async (req, res) => {
  const articleLike = new ArticleLike({
    articleId: req.body.articleId,
    userId: req.userId,
  });

  if (req.body.userId === req.userId) {
    res.status(400).json({ text: "You cant like your own article." });
    return;
  }

  ArticleLike.findOne(
    { articleId: req.body.articleId, userId: req.userId },
    function (err, user) {
      if (user) {
        res.status(400).json({ text: "You already like that article." });
        return;
      } else {
        const result = articleLike.save();
        res.send(result);
      }
    }
  );
});

router.delete("/removeLikeFromArticle", async (req, res) => {
  const articleLike = await ArticleLike.deleteOne({
    articleId: req.query.articleId,
    userId: req.userId,
  });

  if (!articleLike) return res.status(404).send("The like was not found");
  res.send(articleLike);
});

module.exports = router;
