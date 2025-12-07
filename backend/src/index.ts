import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Port (prend PORT du .env sinon 4000)
const PORT = process.env.API_PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from ScrumForge backend" });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`✅ serveur Express démarré sur http://localhost:${PORT}`);
});
