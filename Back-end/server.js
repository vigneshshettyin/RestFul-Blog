const express = require("express");
const ConnectDB = require("./db/config");
const serverless = require("serverless-http");
ConnectDB();
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.status({
    message: "Welcome to the Blog API",
    author: "Vignesh Shetty",
    linktree: "https://lt.vigneshcodes.in",
    CLIENT_URL: process.env.CLIENT_URL,
  });
});

app.use("/api/user", require("./routes/user"));

app.use("/api/blog", require("./routes/blog"));

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT} 💯`);
// });

module.exports.handler = serverless(app);
