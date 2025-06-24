import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URI, {
      dbName: "Nodemailer",
    });
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error message: ${error.message}`);
    process.exit(1);
  }
};
