import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Lottie from "react-lottie";
import { defaultOptions } from "../../../Home";
import { SERVER_URL } from "../../../ServerLink";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
const ReactMarkdown = require("react-markdown");
const gfm = require("remark-gfm");

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={atomDark}
        wrapLines={true}
        showLineNumbers={true}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    ) : (
      <code className={className} {...props} />
    );
  },
};

const convertDate = (date) => {
  var d = new Date(parseFloat(date));
  return d.toDateString();
};

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [flag, setFlag] = useState(false);

  let histroy = useHistory();

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/blog/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setBlog(response.data);
          setFlag(true);
        }
      })
      .catch((error) => {
        histroy.push("/");
      });
  }, [histroy, id]);
  return (
    <>
      {flag ? (
        <div>
          <div className="col-lg-8 container-fluid pt-3">
            <div className="row mb-2 ml-1">
              {/* eslint-disable-next-line */}
              <img
                className="d-inline-block mb-2 userImage"
                src={blog.authorImage}
                draggable="false"
                alt="My Awesome Image"
              />
              <h5
                className="authorName text-muted pt-2"
                style={{ marginLeft: "10px" }}
              >
                {blog.author}
              </h5>
            </div>
            <h3 class="mb-0 title text-dark">{blog.title}</h3>
            <div class="text-date mb-1 text-muted">
              {convertDate(Date.parse(blog.updatedAt).toString())}
            </div>
          </div>

          <div className="my-markdown-custom-font col-md-8 container-fluid">
            <ReactMarkdown
              components={components}
              remarkPlugins={[gfm]}
              children={blog.markdown}
              renderers={{
                link: (href, title, children) => (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </div>
      ) : (
        <center>
          <div>
            <div className="div-center">
              <Lottie options={defaultOptions} height={200} width={200} />
            </div>
          </div>
        </center>
      )}
    </>
  );
};

export default ViewBlog;

export { components };
