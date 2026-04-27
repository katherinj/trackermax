import { pool } from "../../config/db";

export const authQueries = {
  findByEmail: async (email: string) => {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return rows[0] ?? null;
  },

  createUser: async (
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
  ) => {
    const { rows } = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password_hash)
      VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email`,
      [firstName, lastName, email, passwordHash],
    );
    return rows[0];
  },

  findById: async (id: string) => {
    const { rows } = await pool.query(
      "SELECT id, first_name, last_name, email FROM users WHERE id = $1",
      [id],
    );
    return rows[0] ?? null;
  },
};
