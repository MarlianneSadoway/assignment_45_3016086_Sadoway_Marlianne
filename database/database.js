import mongoose from "mongoose";

mongoose.set('strictQuery', true);

export const connectDB = async () => {
  const url = `mongodb://localhost:27017`;
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL || url, {
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (e) {
    console.log("Failed to connect database:", e);
  }
};
