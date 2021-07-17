const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    uuid: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    displayPicture: { type: String, required: true },
    userUUID: { type: String, required: true },
    author: { type: String, required: true },
    authorImage: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
