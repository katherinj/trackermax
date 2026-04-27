import { pool } from "../../config/db";

export const usersQueries = {
  getById: async (id: string) => {
    const { rows } = await pool.query(
      `SELECT id, first_name, last_name, email, image_url, created_at FROM users WHERE id = $1`,
      [id],
    );
    return rows[0] ?? null;
  },

  update: async (
    id: string,
    data: Partial<{ first_name: string; last_name: string; image_url: string }>,
  ) => {
    const fields = Object.keys(data)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(", ");
    const values = Object.values(data);
    const { rows } = await pool.query(
      `UPDATE users SET ${fields} WHERE id = $1 RETURNING id, first_name, last_name, email, image_url`,
      [id, ...values],
    );
    return rows[0];
  },

  updatePassword: async (id: string, passwordHash: string) => {
    await pool.query(`UPDATE users SET password_hash = $2 WHERE id = $1`, [
      id,
      passwordHash,
    ]);
  },
};
