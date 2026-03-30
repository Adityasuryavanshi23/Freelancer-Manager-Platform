import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return console.log("already connected");
    }

    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("Database connected ✅✅✅");
  } catch (error) {
    console.log("error connecting to mongodb", error);
  }
};
