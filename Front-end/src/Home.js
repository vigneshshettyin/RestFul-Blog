import React, { useEffect, useState } from "react";
import Blog from "../src/components/blog/blog";
import styled from "styled-components";
import axios from "axios";
import "./index.css";

const Title = styled.button`
  font-family: "Rock Salt", cursive;
  font-size: 20px;
  color: palevioletred;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const fetchPosts = async () => {
    axios.get("http://localhost:5000/api/blog/all").then((response) => {
      setPosts(response.data);
    });
  };

  const searchTitle = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <center>
        <Title>Featured Blogger</Title>

        <div className="col-md-8 search-card">
          <input
            className="form-control"
            onChange={searchTitle}
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Type to search..."
          />
          <datalist id="datalistOptions">
            {posts.map((post, index) => {
              return <option key={index} value={post.title} />;
            })}
          </datalist>
        </div>
        {posts
          .filter((post) =>
            post.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((filteredPost, index) => (
            <Blog
              key={index}
              uuid={filteredPost.uuid}
              title={filteredPost.title}
              author={filteredPost.author}
              date={filteredPost.updatedAt}
              image={filteredPost.displayPicture}
              authorImage={filteredPost.authorImage}
              content={filteredPost.content}
            />
          ))}
      </center>
    </>
  );
};

export default Home;
