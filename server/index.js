import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import uploadRoutes from "./router/upload.routes.js";
import authRoutes from "./router/auth.routes.js";
import { processAiQuery } from "./utils/gemini.js";
import { connectDB } from "./utils/dbconfig.js";
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

connectDB().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDb connection failed", error);
  }
});

app.use("/api/v1", uploadRoutes);
app.use("/api/v1/gemini", processAiQuery);
app.use("/api/v1/auth", authRoutes);
