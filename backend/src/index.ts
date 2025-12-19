import express from "express";
import dotenv from "dotenv";
import { setupSwagger } from "./lib/swagger";
import { logRequests } from "./middlewares/logRequest";
import { corsMiddleware } from "./middlewares/cors";
import cookieParser from "cookie-parser";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./lib/appError";

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

/** Inject Swagger in App */
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`✅ serveur Express démarré sur http://localhost:${PORT}`);
});

/** Global Error Handler */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: {
        code: err.code,
        status: err.status,
        details: err?.details,
      },
    });
  }

  return res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    },
  });
});
