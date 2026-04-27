import { pool } from "../../config/db";

export const teamsQueries = {
  getAll: async () => {
    const { rows } = await pool.query(`
      SELECT t.*,
             u.first_name as creator_first_name, u.last_name as creator_last_name,
             COUNT(DISTINCT tm.user_id) as member_count
      FROM teams t
      LEFT JOIN users u ON t.creator_id = u.id
      LEFT JOIN team_members tm ON tm.team_id = t.id
      GROUP BY t.id, u.first_name, u.last_name
      ORDER BY t.created_at DESC
    `);
    return rows;
  },

  getById: async (id: string) => {
    const { rows } = await pool.query(
      `
      SELECT t.*,
             u.first_name as creator_first_name, u.last_name as creator_last_name
      FROM teams t
      LEFT JOIN users u ON t.creator_id = u.id
      WHERE t.id = $1
    `,
      [id],
    );
    return rows[0] ?? null;
  },

  getMembers: async (teamId: string) => {
    const { rows } = await pool.query(
      `
      SELECT u.id, u.first_name, u.last_name, u.email
      FROM team_members tm
      JOIN users u ON tm.user_id = u.id
      WHERE tm.team_id = $1
    `,
      [teamId],
    );
    return rows;
  },

  create: async (data: { name: string; creator_id: string }) => {
    const { rows } = await pool.query(
      `
      INSERT INTO teams (name, creator_id)
      VALUES ($1, $2)
      RETURNING *
    `,
      [data.name, data.creator_id],
    );
    return rows[0];
  },

  addMember: async (teamId: string, userId: string) => {
    await pool.query(
      `
      INSERT INTO team_members (team_id, user_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
    `,
      [teamId, userId],
    );
  },

  removeMember: async (teamId: string, userId: string) => {
    await pool.query(
      `
      DELETE FROM team_members WHERE team_id = $1 AND user_id = $2
    `,
      [teamId, userId],
    );
  },

  delete: async (id: string) => {
    await pool.query("DELETE FROM teams WHERE id = $1", [id]);
  },
};
