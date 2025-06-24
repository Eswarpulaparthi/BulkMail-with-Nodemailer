import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const attachmentPath = path.join(
  __dirname,
  "..",
  "attachments",
  "EswarResume.pdf"
);

export const sendBulkEmails = async (req, res) => {
  const { app_password, subject, body, recipients } = req.body;
  if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).json({ error: "Recipients are required" });
  }
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user.email,
        pass: app_password,
      },
    });
    const results = [];
    for (let recipient of recipients) {
      try {
        const info = await transporter.sendMail({
          from: user.email,
          to: recipient.email,
          subject,
          text: body,
          attachments: [
            {
              filename: "EswarResume.pdf",
              path: attachmentPath,
            },
          ],
        });
        results.push({
          to: recipient.email,
          status: "sent",
          id: info.messageId,
        });
      } catch (err) {
        results.push({
          to: recipient.email,
          status: "failed",
          error: err.message,
        });
      }
    }
    return res.json({
      message: "Bulk email sending completed",
      results,
    });
  } catch (err) {
    console.error("Email sending error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
