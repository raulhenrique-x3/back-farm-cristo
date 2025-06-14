import { pool } from "../../../config/database";

export class UserRepository {
  async findByEmail(email: string) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }

  async create({
    name,
    email,
    password,
    role,
  }: {
    name: string;
    email: string;
    password: string;
    role: "master" | "common";
  }) {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [name, email, password, role]
    );

    return result.rows[0];
  }
}
