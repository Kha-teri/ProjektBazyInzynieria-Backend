import "dotenv/config";
import express from "express";
import cors from "cors";
import prisma from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
  res.json({ status: "ok", database: "connected" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error while starting the server!");
  } else {
    console.log(`Server is running at: http://localhost:${PORT}`);
  }
});
