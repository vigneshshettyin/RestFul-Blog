import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./blog.css";
const ReactMarkdown = require("react-markdown");
const gfm = require("remark-gfm");

const markdown = `### Hello`;

const Button = styled(Link)`
font-family: 'Pacifico', cursive;
font-size: 15px;
color: palevioletred;
padding: 5px;
border: 2px solid palevioletred;
border-radius: 3px;
  }
`;

const convertDate = (date) => {
  var d = new Date(parseFloat(date));
  return d.toDateString();
};

const Blog = (props) => {
  return (
    <>
      <div class="col-md-8 blog-card">
        <div class="card flex-md-row mb-4 box-shadow h-md-250">
          <div class="card-body d-flex flex-column align-items-start">
            <div className="row mb-2 ml-1">
              {/* eslint-disable-next-line */}
              <img
                className="d-inline-block mb-2 userImage"
                src={props.authorImage}
                draggable="false"
                alt="My Awesome Image"
              />
              <h5
                className="authorName text-muted pt-2"
                style={{ marginLeft: "10px" }}
              >
                {props.author}
              </h5>
            </div>
            <h3 class="mb-0 title text-dark">{props.title}</h3>
            <div class="text-date mb-1 text-muted">
              {convertDate(Date.parse(props.date).toString())}
            </div>
            <p
              style={{ textAlign: "left" }}
              class="card-para card-text mb-auto justify-content-lg-start"
            >
              {/* <ReactMarkdown remarkPlugins={[gfm]} children={markdown} /> */}
              {props.content} ....
            </p>
            <Button className="text-decoration-none" to={`/blog/${props.uuid}`}>
              Read more ...
            </Button>
          </div>
          {/* eslint-disable-next-line */}
          <img
            class="card-img-right flex-auto d-none d-md-block blog-card-img"
            alt="My Awesome Image"
            draggable="false"
            src={props.image}
          />
        </div>
      </div>
    </>
  );
};

export default Blog;
