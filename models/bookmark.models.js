const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    url: {
      type: String,
      requied: true,
    },
    category: {
      type: String,
      requied: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bookmark = mongoose.model("Bookmark", BookmarkSchema);
module.exports = Bookmark;
