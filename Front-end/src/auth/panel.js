import React from "react";
import Header from "./components/Header";
import axios from "axios";
import { useEffect } from "react";

const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiM2FlODQwNTMtMGZjYi00NzJhLWJhZWUtYmZmYTQyYzM3YzkzIiwiaWF0IjoxNjI2NjA5NTgwfQ.WnPvOLdHOMBE7g9_ze9SO6wFebQjDPdn2lWpD16Dz-k";

const Panel = () => {
  const [posts, setPosts] = React.useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/blog/user/all", {
        headers: {
          Authorization: access_token,
        },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        setPosts(error);
      });
  };

  function deleteBlog(uuid) {
    alert(uuid);
  }

  function updateBlog(uuid) {
    alert(uuid);
  }

  return (
    <>
      <Header />
      <div className="col-md-8 container-fluid p-2">
        {posts ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{post.title}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => updateBlog(post.uuid)}
                        className="btn btn-warning"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => deleteBlog(post.uuid)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No Data</p>
        )}
      </div>
    </>
  );
};

export default Panel;
