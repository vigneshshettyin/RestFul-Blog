const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../token/verifyToken");
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const upload = multer();

// Cloud Upload

// var cloudinary = require("cloudinary").v2;
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
//   api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
//   secure: true,
// });

const createAvatar = (name) => {
  const url =
    "https://ui-avatars.com/api/?background=random&rounded=true&size=128&name=";
  return `${url}${name}`;
};

router.post("/", upload.none(), async (req, res) => {
  const { userName, email, password, phone } = req.body;
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(422).send({
      error: error.details[0].message,
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

router.get("/all", auth, async (req, res) => {
  const users = await User.find();
  console.log(JSON.stringify(req.user));
  res.json(users);
});

router.post("/login", upload.none(), async (req, res) => {
  const { email, password } = req.body;
  console.log("email", email);
  const { error } = loginValidation(req.body);
  const userCheck = await User.findOne({ email: email });
  if (error) {
    return res.status(422).send({
      error: error.details[0].message,
    });
  } else if (userCheck) {
    var check = bcrypt.compareSync(password, userCheck.password);
    if (check) {
      const token = jwt.sign(
        {
          uuid: userCheck.uuid,
        },
        process.env.TOKEN_SECRET
      );
      res.header("auth-token", token);
      res.send({
        token: token,
        message: "User logged in successfully!",
      });
    } else {
      res.status(401).send({
        error: "Wrong Password",
      });
    }
  } else {
    return res.status(422).send({
      error: "User not found!",
    });
  }
});

module.exports = router;
