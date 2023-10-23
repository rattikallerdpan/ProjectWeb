const express = require("express");
const bodyParser = require("body-parser");
const db = require("./configs/mongodb");
const Postsmodel = require("./configs/postmodel");
const app = express();
db();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/insert", (req, res) => {
  res.render("insert");
});
app.post("/insert", async (req, res) => {
  try {
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const SavePost = await new Postsmodel({
      title,
      image,
      description,
    });
    await SavePost.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
app.listen(3000, () => {
  console.log("server is running at port 3000");
});
