import swaggerUi from "swagger-ui-express";

import { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition: swaggerJSDoc.SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Parking Space Backend",
    description: "Nodejs API for managing parking space reservations",
    version: "1.0.0",
  },
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: ["src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerSetup = (app: Application) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
