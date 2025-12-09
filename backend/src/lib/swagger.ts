import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import { installationPaths, installationSchemas } from "../modules/installation/installation.openapi";
dotenv.config();

const swaggerJSDoc = require("swagger-jsdoc");

export function setupSwagger(app: Express) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "ScrumForge API",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://localhost:${process.env.API_PORT}`,
        },
      ],
      components: {
        schemas: {
          ...installationSchemas,
        },
      },
      paths: {
        ...installationPaths,
      },
    },
    apis: [],
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
