import { DataSource } from "typeorm";
import { Farmaceutico } from "../modules/auth/entities/Farmaceutico";
import { Idoso } from "../modules/auth/entities/Idoso";
import { Produto } from "../modules/auth/entities/Produto";
import { RegistroEntrega } from "../modules/auth/entities/RegistroEntrega";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost", // usa postgres no Docker
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "farm_cristo",
  synchronize: true, // cuidado: true só pra desenvolvimento
  logging: true,
  entities: [
    Farmaceutico,
    Idoso,
    Produto,
    RegistroEntrega
  ],
});