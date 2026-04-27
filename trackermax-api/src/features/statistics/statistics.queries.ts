import { pool } from "../../config/db";

export const statisticsQueries = {
  getSummary: async () => {
    const { rows } = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM tickets WHERE status != 'closed') AS open_tickets,
        (SELECT COUNT(*) FROM tickets WHERE status = 'closed') AS closed_tickets,
        (SELECT COUNT(*) FROM projects) AS total_projects,
        (SELECT COUNT(*) FROM users) AS total_members
    `);
    return rows[0];
  },

  getTicketsByStatus: async () => {
    const { rows } = await pool.query(`
      SELECT status, COUNT(*) as count
      FROM tickets
      GROUP BY status
    `);
    return rows;
  },

  getTicketsByPriority: async () => {
    const { rows } = await pool.query(`
      SELECT priority, COUNT(*) as count
      FROM tickets
      GROUP BY priority
    `);
    return rows;
  },

  getRecentTickets: async () => {
    const { rows } = await pool.query(`
      SELECT t.id, t.title, t.status, t.priority, t.created_at,
             u.first_name, u.last_name
      FROM tickets t
      LEFT JOIN users u ON t.creator_id = u.id
      ORDER BY t.created_at DESC
      LIMIT 5
    `);
    return rows;
  },
};
