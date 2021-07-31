// import PostMessage from "../models/postMessage.js";
const PostMessage = require("../models/postMessage.js");
module.exports.getAppointment = async (req, res) => {
  try {
    const PostMessages = await PostMessage.find();
    res.status(200).json(PostMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.createAppointment = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  console.log(req.body);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
module.exports.getTest = async (req, res) => {
  res.send("this is something");
};
