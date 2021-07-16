const router = require("express").Router();
const User = require("../models/user");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
var cloudinary = require("cloudinary").v2;
const saltRounds = 10;
const upload = multer();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
  secure: true,
});

const createAvatar = (name) => {
  const url =
    "https://ui-avatars.com/api/?background=random&rounded=true&size=128&name=";
  return `${url}${name}`;
};

router.post("/", upload.none(), async (req, res) => {
  // const formData = req.body;
  // console.log("form data", formData);
  const { userName, email, password, phone } = req.body;
  if (!userName || !email || !password || !phone) {
    return res.status(422).send({
      error: "All fields are required.",
    });
  } else {
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const userCheck = await User.findOne({ email: email });

    if (userCheck) {
      return res.status(422).send({
        error: "User already have a account.",
      });
    }

    const user = new User({
      uuid: uuidv4(),
      userName: userName,
      email: email,
      password: hashedPassword,
      phone: phone,
      displayURL: createAvatar(userName),
    });
    const response = await user.save();
    res.json({ message: "User created successfully!" });
  }
});

router.get("/all", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;

// For Login
// var check = bcrypt.compareSync("alike", hash);
// "alike" is user password & hash is hashed value.
