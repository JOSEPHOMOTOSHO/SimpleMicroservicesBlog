import React, { useEffect, useState } from "react";
import axios from "axios";

export default ({ comments }) => {
  const renderedComments = comments
    ? comments.map((comment) => {
        let content;
        if (comment.status === "approved") {
          content = comment.content;
        }
        if (comment.status === "pending") {
          content = "This comment is awaiting moderation";
        }
        if (comment.status === "rejected") {
          content = "This comment has been rejected";
        }

        return <li key={comment.id}>{content}</li>;
      })
    : null;
  //   console.log(Array.isArray(renderedComments));
  return <ul>{renderedComments}</ul>;
};
