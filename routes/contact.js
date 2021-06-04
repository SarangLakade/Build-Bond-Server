import express from "express";

import { getContact, createContact, getTest } from "../controller/contact.js";

const router = express.Router();

router.get("/", getContact);
router.post("/", createContact);
router.get("/test", getTest);
export default router;
