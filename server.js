const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { User, Post } = require("./models");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/blogdb");

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) user = await User.create({ username, password: await bcrypt.hash(password, 10) });
    res.send(user);
});

app.post("/post", async (req, res) => {
    const { title, content } = req.body;
    await Post.create({ title, content });
    res.send({ message: "Post Created" });
});

app.get("/posts", async (_, res) => {
    const posts = await Post.find();
    res.send(posts);
});

app.listen(3000, () => console.log("Server running on port 3000"));
