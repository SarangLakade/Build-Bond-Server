// import mongoose from "mongoose";
const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
  name: String,
  email: String,
  place: String,
  phone: String,
  subject: String,
  message: String,
});

const ContactModel = mongoose.model("ContactModel", contactSchema);

module.exports.ContactModel = ContactModel;
