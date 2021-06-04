import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  name: String,
  email: String,
  place: String,
  phone: String,
  subject: String,
  message: String,
});

const ContactModel = mongoose.model("ContactModel", contactSchema);

export default ContactModel;
