const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({ username: String, password: String });
const PostSchema = new mongoose.Schema({ title: String, content: String });

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);

module.exports = { User, Post };
