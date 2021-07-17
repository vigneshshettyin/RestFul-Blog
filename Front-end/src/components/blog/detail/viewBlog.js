import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blog/${id}`).then((response) => {
      setBlog(response.data);
    });
  }, []);
  return (
    <>
      <div>{blog ? JSON.stringify(blog) : null}</div>
    </>
  );
};

export default ViewBlog;
