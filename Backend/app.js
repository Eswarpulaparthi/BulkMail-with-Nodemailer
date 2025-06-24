import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import gmailRoutes from "./routes/gmail.route.js";
const app = express();
dotenv.config();
console.log(process.env.GMAIL_CLIENT_ID);
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/email", gmailRoutes);
app.listen(3000, () => {
  connectDB();
  console.log("Server running on http://localhost:3000");
});
