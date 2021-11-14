import React, { useEffect, useState } from "react";
import axios from "axios";

export default ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(async () => {
    try {
      const result = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );
      setComments(result.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const renderedComments = comments
    ? comments.map((comment) => <li key={comment.id}>{comment.content}</li>)
    : null;
  //   console.log(Array.isArray(renderedComments));
  return <ul>{renderedComments}</ul>;
};
