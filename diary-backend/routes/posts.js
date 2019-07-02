var express = require("express");
var dateFormat = require("dateformat");
var router = express.Router();

/* Our Mock little database with Model */
let posts = [];
function BlogPost(title, content) {
  this.title = title;
  this.content = content;
  this.datePublished = dateFormat(new Date(), "mm-dd-yyyy");
}

/* GET all Blog Posts */
router.get("/all", function(req, res, next) {
  res.status(200).json({ posts: posts });
});

/* POST to create a blog post */
router.post("/createPost", function(req, res, next) {
  const { body } = req;
  const { title, content } = body;
  let errors = [];

  if (!body.title || body.title.length == 0) {
    errors.push("Title is missing");
  }

  if (!body.content || body.content.length == 0) {
    errors.push("Content is missing");
  }

  if (errors.length) {
    res.status(422).send(errors);
  } else {
    posts.unshift(new BlogPost(title, content)); //adds to front of array so it's sorted by default
    res.status(200).send("Successfully added post");
  }
});

module.exports = router;
