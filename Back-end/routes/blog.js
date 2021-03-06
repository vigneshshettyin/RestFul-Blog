const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const auth = require("../token/verifyToken");
const { v4: uuidv4 } = require("uuid");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");

router.post("/", auth, upload.none(), async (req, res) => {
  const { title, content, displayPicture, category, markdown } = req.body;
  if (!title || !content || !displayPicture || !category || !markdown) {
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
      markdown: markdown,
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

router.get("/", async (req, res) => {
  const blogUUID = req.query.blogUUID;
  const blog = await Blog.findOne({ uuid: blogUUID });
  if (blog) {
    res.json(blog);
  } else {
    return res.status(422).send({
      error: "Blog not found.",
    });
  }
});

router.get("/get-update-post/:blogUUID", auth, async (req, res) => {
  const blogUUID = req.params.blogUUID;
  const blog = await Blog.findOne({ uuid: blogUUID, userUUID: req.user.uuid });
  if (blog) {
    res.json(blog);
  } else {
    return res.status(422).send({
      error: "Blog not found.",
    });
  }
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

router.get("/user/all", auth, async (req, res) => {
  const blog = await Blog.find({ userUUID: req.user.uuid });
  res.json(blog);
});

router.put("/update/:blogUUID", auth, upload.none(), async (req, res) => {
  const blogUUID = req.params.blogUUID;
  const { title, content, displayPicture, markdown, category } = req.body;
  if (!title || !content || !displayPicture || !markdown || !category) {
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
      author: blogCheck.author,
      authorImage: blogCheck.authorImage,
      content: content,
      markdown: markdown,
      category: category,
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

var uploadImg = upload.single("profile");
router.post("/upload", async (req, res) => {
  uploadImg(req, res, async function (err) {
    if (!req.file) {
      return res.status(422).send({
        error: "No image uploaded!",
      });
    } else {
      if (err) {
        return res.status(401).send({
          error: "Image not on valid format!",
        });
      } else {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.json(result);
      }
    }
  });
});

module.exports = router;
