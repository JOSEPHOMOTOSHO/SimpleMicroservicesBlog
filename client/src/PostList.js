import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";
import CommentList from "./CommentList";
export default () => {
  const [data, setData] = useState({});
  useEffect(async () => {
    try {
      const result = await axios.get("http://localhost:4000/posts");
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const renderedPost = Object.values(data).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList postId={post.id} />
          <CreateComment postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPost}
    </div>
  );
};
