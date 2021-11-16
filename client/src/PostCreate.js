import React, { useState } from "react";
import axios from "axios";
export default () => {
  const [title, setTitle] = useState("");
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/posts", { title: title });
    setTitle("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <br />
          <input
            className="form-control"
            type="text"
            id="title"
            placeholder="type post title here"
            onChange={(e) => handleChange(e)}
            value={title}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
