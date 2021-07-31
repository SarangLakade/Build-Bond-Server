// import mongoose from "mongoose";
const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
});

const PostMessage = mongoose.model("PostMessage", postSchema);

module.exports.PostMessage = PostMessage;
