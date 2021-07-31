const express = require("express");

const {
  getContact,
  createContact,
  getTest,
} = require("../controller/contact.js");
const router = express.Router();
