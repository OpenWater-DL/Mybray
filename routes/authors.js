const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// All authors route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i"); // i代表忽略大小写 , 这个正则构造函数，相当于一个创建正则表达式的工具。
  }

  try {
    const authors = await Author.find(searchOptions); // 查找其实靠的是这个逻辑，因为searchOptions把匹配模式定义了。
    res.render("authors/index", {
      authors: authors,
      keyWords: req.query, // 这里只是起到显示关键词在搜索框里的作用
    });

    console.log(req.query)
  } catch {
    res.redirect("/");
    console.log('无搜索')

  }
});

//New Author route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author({ name: "test" }) });
});

//creat author route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await author.save();
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});

module.exports = router;
