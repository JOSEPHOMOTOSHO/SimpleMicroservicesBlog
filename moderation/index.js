const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());


const handleEvents = async (type, data) => {
  if (type === "CommentCreated") {
    let status = data.content.includes("orange") ? "rejected" : "approved";
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }
};

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  handleEvents((type, data));
  res.send({});
});

app.listen(4003, async () => {
  console.log("i am listening on port 4003");
  const result = await axios.get("http://localhost:4005/events");

  for (let event of result.data) {
    console.log("i am processing", event);
    handleEvents(event.type, event.data);
  }
});
