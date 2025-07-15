import express from "express";
import { router } from "./routes";
import { setupSwagger } from "./config/swagger";
import "reflect-metadata";

const app = express();

app.use(express.json());
app.use(router);

setupSwagger(app);

export { app };
