import express from "express";
import dotenv from "dotenv";
import installationRouter from "./modules/installation/installation.router";
import { setupSwagger } from "./lib/swagger";
import { logRequests } from "./middlewares/logRequest";
import { corsMiddleware } from "./middlewares/cors";
dotenv.config();

const PORT = process.env.API_PORT || 4000;

const app = express();

/** App setup */
app.use(express.json());
app.use(logRequests);
app.use(corsMiddleware);

/** App Router */
app.use("/api/installation", installationRouter);

/** Inject Swagger in App */
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`✅ serveur Express démarré sur http://localhost:${PORT}`);
});
