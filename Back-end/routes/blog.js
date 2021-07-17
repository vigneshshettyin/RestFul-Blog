const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const auth = require("../token/verifyToken");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const upload = multer();

router.post("/", auth, upload.none(), async (req, res) => {
  const { title, content, displayPicture, category } = req.body;
  if (!title || !content || !displayPicture || !category) {
    return res.status(422).send({
      error: "All fields are required.",
    });
  } else {
    const user = await User.findOne({ uuid: req.user.uuid });
    console.log(user);
    const blog = new Blog({
      uuid: uuidv4(),
      title: title,
      content: content,
      author: user.userName,
      authorImage: user.displayURL,
      category: category,
      displayPicture: displayPicture,
      userUUID: req.user.uuid,
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

router.delete("/:blogUUID", auth, async (req, res) => {
  const blogUUID = req.params.blogUUID;
  const blog = await Blog.findOne({ uuid: blogUUID, userUUID: req.user.uuid });
  if (blog) {
    const blog = await Blog.deleteOne({ uuid: blogUUID });
    return res.json({ message: "Blog deleted successfully!" });
  } else {
    return res.status(401).send({
      error:
        "You are not authorized to delete this blog or blog doesn't exist!",
    });
  }
});

router.get("/user/:userUUID", async (req, res) => {
  const userUUID = req.params.userUUID;
  const blog = await Blog.find({ userUUID: userUUID });
  res.json(blog);
});

router.put("/update/:blogUUID", auth, upload.none(), async (req, res) => {
  const blogUUID = req.params.blogUUID;
  const { title, content, displayPicture } = req.body;
  if (!title || !content || !displayPicture) {
    return res.status(422).send({
      error: "All fields are required.",
    });
  }

  const blogCheck = await Blog.findOne({
    uuid: blogUUID,
    userUUID: req.user.uuid,
  });

  if (blogCheck) {
    const deleteBlog = await Blog.deleteOne({
      uuid: blogUUID,
      userUUID: req.user.uuid,
    });

    const blog = new Blog({
      uuid: blogUUID,
      title: title,
      content: content,
      displayPicture: displayPicture,
      userUUID: req.user.uuid,
    });
    const response = await blog.save();

    res.json({
      message: "Blog updated successfully!",
    });
  } else {
    return res.status(401).send({
      error:
        "You are not authorized to update this blog or blog doesn't exist!",
    });
  }
});

module.exports = router;