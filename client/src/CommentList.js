import React, { useEffect, useState } from "react";
import axios from "axios";

export default ({ comments }) => {
  const renderedComments = comments
    ? comments.map((comment) => <li key={comment.id}>{comment.content}</li>)
    : null;
  //   console.log(Array.isArray(renderedComments));
  return <ul>{renderedComments}</ul>;
};
