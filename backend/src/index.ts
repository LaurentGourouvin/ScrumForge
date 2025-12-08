import express from "express";
import dotenv from "dotenv";
import installationRouter from "./modules/installation/installation.router";
import { setupSwagger } from "./lib/swagger";
dotenv.config();
const app = express();

const PORT = process.env.API_PORT || 4000;

app.use(express.json());

/** App Router */
app.use("/api/installation", installationRouter);

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`✅ serveur Express démarré sur http://localhost:${PORT}`);
});
