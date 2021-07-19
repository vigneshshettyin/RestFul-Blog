import React from "react";
import Header from "./components/Header";
import swal from "sweetalert";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import Edit from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Panel = () => {
  const [posts, setPosts] = React.useState();

  const access_token = localStorage.getItem("token");

  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, [access_token]);

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
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this blog!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Success! Your blog has been deleted! 😒", {
          icon: "success",
        });
        axios
          .delete(`http://localhost:5000/api/blog/${uuid}`, {
            headers: {
              Authorization: access_token,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              fetchData();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        swal("Your blog is safe! 😸");
      }
    });
  }

  function updateBlog(uuid) {
    history.push(`/update-blog/${uuid}`);
  }

  function createBlogPost() {
    history.push(`/create-blog`);
  }

  return (
    <>
      <Header />
      <div className="floating-button d-none d-sm-block">
        <Fab onClick={createBlogPost} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
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
                      <IconButton
                        aria-label="Edit"
                        onClick={() => updateBlog(post.uuid)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                    </td>
                    <td>
                      <IconButton
                        aria-label="Delete"
                        onClick={() => deleteBlog(post.uuid)}
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
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
