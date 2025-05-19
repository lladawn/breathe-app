import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("🌿 Welcome to the Breathe backend");
});

app.listen(PORT, () => {
  console.log(`🌀 Breathe Server running on http://localhost:${PORT}`);
});
