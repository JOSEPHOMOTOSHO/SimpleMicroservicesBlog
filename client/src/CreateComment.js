import React, { useState, useEffect } from "react";
import axios from "axios";
export default ({ postId }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setContent("");
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Comments</label>
        <br />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control"
        />
      </div>
      <button className="btn btn-primary"> Submit</button>
    </form>
  );
};
