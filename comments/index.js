const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const commentsById = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsById[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsById[req.params.id] = comments;

  res.status(201).json(comments);
});

app.get("/posts/:id/comments", (req, res) => {
  res.status(200).json(commentsById[req.params.id]);
});

app.listen(4001, () => {
  console.log("i am running on port 4001");
});
