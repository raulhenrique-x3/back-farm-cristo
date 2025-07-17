import { DataSource } from "typeorm";
import { User } from "../modules/user/entities/User";
import { Withdrawal } from "../modules/auth/entities/Withdrawal";
import { Pharmaceutical } from "../modules/auth/entities/Pharmaceutical";
import { Product } from "../modules/products/entities/Product";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost", // usa postgres no Docker
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "farm_cristo",
  synchronize: true, // cuidado: true só pra desenvolvimento
  logging: true,
  entities: [Pharmaceutical, User, Product, Withdrawal],
});
