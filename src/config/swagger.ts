import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API FarmCristo",
      version: "1.0.0",
      description:
        "Documentação da API para gestão de usuários, estoque e doações do Abrigo de Idosos do Alto do Cristo.",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["src/modules/**/*.ts"], // Caminho onde estão suas rotas e JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
