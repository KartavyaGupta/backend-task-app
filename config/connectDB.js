import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
  mongoose.connection.on("connected", () => {
    // This will print the actual database name, e.g. 'task'
  });
  try {
    const DB_OPTIONS = {
      dbName: "task",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
  } catch (error) {
  }
};
export default connectDB;
