import cors from "cors";

const FRONTEND_ORIGIN = process.env.FRONTEND_URL ?? "http://localhost:3000";

export const corsMiddleware = cors({
  origin: FRONTEND_ORIGIN,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});
