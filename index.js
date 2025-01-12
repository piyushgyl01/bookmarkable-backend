const express = require("express");
const app = express();
const { initialiseDatabase } = require("./db/db.connect.js");
const Bookmark = require("./models/bookmark.models.js");

initialiseDatabase();

app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("HELLO, DEVELOPER");
});

//SAVING SOME BOOKMARKS
// const bookmarks = [
//   {
//     name: "Google",
//     url: "https://www.google.co.in/",
//     category: "Web Dev",
//   },
//   {
//     name: "Microsoft",
//     url: "https://www.microsoft.com/en-in",
//     category: "App Dev",
//   },
//   {
//     name: "Apple",
//     url: "https://www.apple.com/in/",
//     category: "Web Dev",
//   },
// ];

// async function createNewBookmarks(newBookmarks) {
//   try {
//     const bookmarks = await Bookmark.insertMany(newBookmarks);
//     console.log("YEAH SAVED BOOKMARKS IN THE DB ARE THESE: ", bookmarks);
//   } catch (error) {
//     console.log("You suck lmao see this error while saving to DB lol", error);
//   }
// }

// createNewBookmarks(bookmarks);

//CRUD FOR BOOKMARKS

//CREATE
app.post("/bookmarks", async (req, res) => {
  try {
    const newBookmark = new Bookmark(req.body);
    const savedBookmark = await newBookmark.save();
    res.status(201).json(savedBookmark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//READ
app.get("/bookmarks", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({});
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//EDIT
app.put("/bookmarks/:id", async (req, res) => {
  try {
    const updatedBookmark = await Bookmark.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBookmark) {
      return res.status(404).json({ error: "BOOKMARK NOT FOUND" });
    }

    res.json(updatedBookmark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DELETE
app.delete("/bookmarks/:id", async (req, res) => {
  try {
    const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);

    if (!deletedBookmark) {
      return res.status(404).json({ error: "BOOKMARK NOT FOUND" });
    }

    res.json({
      message: "BOOKMARK DELETED SUCCESSFULLY",
      bookmark: deletedBookmark,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT yeahhhh ${PORT}`);
});
