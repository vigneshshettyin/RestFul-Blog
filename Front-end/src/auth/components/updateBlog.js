import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { components } from "../../components/blog/detail/viewBlog";
import { useHistory, useParams } from "react-router-dom";
import { SERVER_URL } from "../../ServerLink";
// Material Tabs
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// Material Tabs
const ReactMarkdown = require("react-markdown");
const gfm = require("remark-gfm");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const UpdateBlog = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
    markdown: "",
    category: "React",
    displayPicture: "",
  });

  //Material Tab
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  //Material Tab

  const history = useHistory();

  const { id } = useParams();

  const access_token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/blog/get-update-post/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setData({
          title: response.data.title,
          content: response.data.content,
          markdown: response.data.markdown,
          category: response.data.category,
          displayPicture: response.data.displayPicture,
        });
      })
      .catch((error) => {
        history.push("/dashboard");
      });
  }, [history, id]);

  const OnChangeValue = (e) => {
    const { value, name } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const postDataToServer = (data) => {
    axios
      .put(`${SERVER_URL}/api/blog/update/${id}`, data, {
        headers: {
          Authorization: access_token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          swal({
            title: "Success!",
            text: "Blog has been updated successfully!",
            icon: "success",
            button: "Okay!",
          });

          history.push(`/dashboard`);
        }
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("displayPicture", data.displayPicture);
    formData.append("markdown", data.markdown);
    postDataToServer(formData);
  }

  return (
    <>
      <div className="col-md-8 container-fluid my-markdown-custom-font">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              required
              value={data.title}
              name="title"
              onChange={OnChangeValue}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Content
            </label>
            <textarea
              type="text"
              required
              value={data.content}
              name="content"
              onChange={OnChangeValue}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Display Image URL
            </label>
            <input
              type="text"
              required
              value={data.displayPicture}
              name="displayPicture"
              onChange={OnChangeValue}
              className="form-control"
            />
          </div>
          <div id="emailHelp" className="form-text mb-3">
            Please use a valid link preferably https.
          </div>
          <div>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Markdown" {...a11yProps(0)} />
                <Tab label="Preview" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <textarea
                  required
                  className="form-control full-width"
                  value={data.markdown}
                  name="markdown"
                  onChange={OnChangeValue}
                  id="exampleFormControlTextarea1"
                  rows="10"
                ></textarea>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <ReactMarkdown
                  components={components}
                  remarkPlugins={[gfm]}
                  children={data.markdown}
                  renderers={{
                    link: (href, title, children) => (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                  }}
                />
              </TabPanel>
            </SwipeableViews>
          </div>
          <center>
            <div className="p-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </center>
        </form>
      </div>
    </>
  );
};

export default UpdateBlog;
