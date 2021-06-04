import ContactModel from "../models/ContactModel.js";

export const getContact = async (req, res) => {
  try {
    const ContactModel = await ContactModel.find();
    res.status(200).json(ContactModel);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  const contact = req.body;

  const newContact = new ContactModel(contact);

  console.log(req.body);

  try {
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getTest = async (req, res) => {
  res.send("this is contact test");
};
