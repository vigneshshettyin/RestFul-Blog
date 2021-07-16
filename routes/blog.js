const router = require("express").Router();
const Blog = require("../models/blog");
const { v4: uuidv4 } = require("uuid");

router.post("/", async (req, res) => {
  const { title, content, displayPicture, userUUID } = req.body;
  if (!title || !content || !displayPicture || !userUUID) {
    return res.status(422).send({
      error: "All fields are required.",
    });
  } else {
    const blog = new Blog({
      uuid: uuidv4(),
      title: title,
      content: content,
      displayPicture: displayPicture,
      userUUID: userUUID,
    });
    const response = await blog.save();
    res.json({ message: "Blog created successfully!" });
  }
});

router.get("/all", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

router.get("/:blogUUID", async (req, res) => {
  const blogUUID = req.params.blogUUID;
  const blog = await Blog.findOne({ uuid: blogUUID });
  res.json(blog);
});

router.get("/user/:userUUID", async (req, res) => {
  const userUUID = req.params.userUUID;
  const blog = await Blog.find({ userUUID: userUUID });
  res.json(blog);
});

module.exports = router;
