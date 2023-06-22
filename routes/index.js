const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/", async (req, res) => {
  let books;
  try {
    //find一定要awaite 等等。不然会有响应不过来的问题
    books = await Book.find().sort({ createAt: "desc" }).limit(3).exec();
  } catch {
    books = [];
  }

  console.log(books);
  res.render("index", { books: books });
});

module.exports = router;
