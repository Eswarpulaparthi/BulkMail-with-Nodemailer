import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { sendBulkEmails } from "../controllers/email.controller.js";

const router = express.Router();

router.post("/send", authenticate, sendBulkEmails);

export default router;
