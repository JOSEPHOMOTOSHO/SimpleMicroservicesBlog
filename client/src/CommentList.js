import React, { useEffect, useState } from "react";
import axios from "axios";

<<<<<<< HEAD
export default ({ comments }) => {
=======
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

>>>>>>> 6dbeae157c34fd8dea8e49515f3cb0ac4909135b
  const renderedComments = comments
    ? comments.map((comment) => <li key={comment.id}>{comment.content}</li>)
    : null;
  //   console.log(Array.isArray(renderedComments));
  return <ul>{renderedComments}</ul>;
};
