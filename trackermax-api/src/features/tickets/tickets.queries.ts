import { pool } from "../../config/db";

export const ticketsQueries = {
  getAll: async () => {
    const { rows } = await pool.query(`
      SELECT t.*, 
             u.first_name as creator_first_name, u.last_name as creator_last_name,
             a.first_name as assignee_first_name, a.last_name as assignee_last_name,
             p.name as project_name
      FROM tickets t
      LEFT JOIN users u ON t.creator_id = u.id
      LEFT JOIN users a ON t.assignee_id = a.id
      LEFT JOIN projects p ON t.project_id = p.id
      ORDER BY t.created_at DESC
    `);
    return rows;
  },

  getById: async (id: string) => {
    const { rows } = await pool.query(
      `
      SELECT t.*,
             u.first_name as creator_first_name, u.last_name as creator_last_name,
             a.first_name as assignee_first_name, a.last_name as assignee_last_name,
             p.name as project_name
      FROM tickets t
      LEFT JOIN users u ON t.creator_id = u.id
      LEFT JOIN users a ON t.assignee_id = a.id
      LEFT JOIN projects p ON t.project_id = p.id
      WHERE t.id = $1
    `,
      [id],
    );
    return rows[0] ?? null;
  },

  create: async (data: {
    title: string;
    description: string;
    category: string;
    priority: string;
    status: string;
    complexity: number;
    project_id: string;
    creator_id: string;
    assignee_id?: string;
  }) => {
    const { rows } = await pool.query(
      `
      INSERT INTO tickets (title, description, category, priority, status, complexity, project_id, creator_id, assignee_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `,
      [
        data.title,
        data.description,
        data.category,
        data.priority,
        data.status,
        data.complexity,
        data.project_id,
        data.creator_id,
        data.assignee_id ?? null,
      ],
    );
    return rows[0];
  },

  update: async (
    id: string,
    data: Partial<{
      title: string;
      description: string;
      category: string;
      priority: string;
      status: string;
      complexity: number;
      assignee_id: string;
    }>,
  ) => {
    const fields = Object.keys(data)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(", ");
    const values = Object.values(data);
    const { rows } = await pool.query(
      `UPDATE tickets SET ${fields}, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, ...values],
    );
    return rows[0];
  },

  delete: async (id: string) => {
    await pool.query("DELETE FROM tickets WHERE id = $1", [id]);
  },
};
