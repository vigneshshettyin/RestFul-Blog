const router = require("express").Router();
const Blog = require("../models/blog");
const auth = require("../token/verifyToken");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const upload = multer();

router.post("/", auth, upload.none(), async (req, res) => {
  const { title, content, displayPicture, userUUID } = req.body;
  if (!title || !content || !displayPicture) {
    return res.status(422).send({
      error: "All fields are required.",
    });
  } else {
    const blog = new Blog({
      uuid: uuidv4(),
      title: title,
      content: content,
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

module.exports = router;
