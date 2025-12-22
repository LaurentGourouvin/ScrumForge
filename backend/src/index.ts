import express from "express";
import dotenv from "dotenv";
import { setupSwagger } from "./lib/swagger";
import { logRequests } from "./middlewares/logRequest";
import { corsMiddleware } from "./middlewares/cors";
import { HandleGlobalError } from "./middlewares/handlerGlobalError";
import cookieParser from "cookie-parser";

/** Import Router */
import installationRouter from "./modules/installation/installation.router";
import authRouter from "./modules/auth/auth.router";
import teamsRouter from "./modules/teams/teams.router";
import usersRouter from "./modules/users/users.router";
import rolesRouter from "./modules/roles/roles.router";
/** ============= */

dotenv.config();
const PORT = process.env.API_PORT || 4000;
const app = express();

/** App setup */
app.use(express.json());
app.use(logRequests);
app.use(corsMiddleware);
app.use(cookieParser());
/** ============= */

/** App Router */
app.use("/api/installation", installationRouter);
app.use("/api/auth", authRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/users", usersRouter);
app.use("/api/roles", rolesRouter);
/** ============= */

/** Global Error Handler */
app.use(HandleGlobalError);

/** Inject Swagger in App */
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`✅ serveur Express démarré sur http://localhost:${PORT}`);
});
