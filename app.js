import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import entryRoutes from "./routes/entryRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
dotenv.config();

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json());
app.use("/auth", userRoutes);
app.use("/tasks", entryRoutes);

connectDB(DATABASE_URL);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/");

app.listen(port, () => {
});
