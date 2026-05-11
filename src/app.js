import "dotenv/config";
import express from "express";
import cors from "cors";
import prisma from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error while starting the server!");
  } else {
    console.log(`Server is running at: http://localhost:${PORT}`);
  }
});
