import express from "express";

import {
  getAppointment,
  createAppointment,
  getTest,
} from "../controller/post.js";

const router = express.Router();

router.get("/", getAppointment);
router.post("/", createAppointment);
router.get("/test", getTest);
export default router;
