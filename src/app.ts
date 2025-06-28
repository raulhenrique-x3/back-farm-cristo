import express from "express";
import { router } from "./routes";
import { setupSwagger } from "./config/swagger";
import idosoRoutes from "./modules/auth/routes/idoso.routes";
import "reflect-metadata";

const app = express();

app.use(express.json());
app.use(router);

app.use("/idosos", idosoRoutes);

setupSwagger(app);

export { app };
