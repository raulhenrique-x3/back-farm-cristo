import { DataSource } from "typeorm";
import { Farmaceutico } from "../modules/auth/entities/Farmaceutico";
import { Person } from "../modules/auth/entities/Person";
import { Product } from "../modules/auth/entities/Product";
import { Withdrawal } from "../modules/auth/entities/Withdrawal";

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
    Person,
    Product,
    Withdrawal
  ],
});