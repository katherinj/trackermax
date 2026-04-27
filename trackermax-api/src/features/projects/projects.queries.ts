import { pool } from "../../config/db";

export const projectsQueries = {
  getAll: async () => {
    const { rows } = await pool.query(`
      SELECT p.*,
             u.first_name as creator_first_name, u.last_name as creator_last_name,
             COUNT(DISTINCT t.id) as ticket_count
      FROM projects p
      LEFT JOIN users u ON p.creator_id = u.id
      LEFT JOIN tickets t ON t.project_id = p.id
      GROUP BY p.id, u.first_name, u.last_name
      ORDER BY p.created_at DESC
    `);
    return rows;
  },

  getById: async (id: string) => {
    const { rows } = await pool.query(
      `
      SELECT p.*,
             u.first_name as creator_first_name, u.last_name as creator_last_name
      FROM projects p
      LEFT JOIN users u ON p.creator_id = u.id
      WHERE p.id = $1
    `,
      [id],
    );
    return rows[0] ?? null;
  },

  create: async (data: {
    name: string;
    description: string;
    image_url?: string;
    creator_id: string;
  }) => {
    const { rows } = await pool.query(
      `
      INSERT INTO projects (name, description, image_url, creator_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
      [data.name, data.description, data.image_url ?? null, data.creator_id],
    );
    return rows[0];
  },

  update: async (
    id: string,
    data: Partial<{ name: string; description: string; image_url: string }>,
  ) => {
    const fields = Object.keys(data)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(", ");
    const values = Object.values(data);
    const { rows } = await pool.query(
      `UPDATE projects SET ${fields} WHERE id = $1 RETURNING *`,
      [id, ...values],
    );
    return rows[0];
  },

  delete: async (id: string) => {
    await pool.query("DELETE FROM projects WHERE id = $1", [id]);
  },
};
