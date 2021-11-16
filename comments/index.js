const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const commentsById = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsById[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsById[req.params.id] = comments;
  //event emitter
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });
  res.status(201).json(comments);
});

app.get("/posts/:id/comments", (req, res) => {
  res.status(200).json(commentsById[req.params.id]);
});

//received event
app.post("/events", async (req, res) => {
  console.log(" I have received the event", req.body.type);
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { id, postId, content, status } = data;
    let commment = commentsById[postId].find((comment) => {
      return comment.id === id;
    });
    commment.status = status;
    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        content,
        postId,
        status,
      },
    });
  }

  return res.send({});
});

app.listen(4001, () => {
  console.log("i am running on port 4001");
});
