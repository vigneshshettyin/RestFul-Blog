const express = require("express");
const ConnectDB = require("./db/config");
ConnectDB();
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Blog Rest API");
});

app.use("/api/user", require("./routes/user"));

app.use("/api/blog", require("./routes/blog"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 💯`);
});
