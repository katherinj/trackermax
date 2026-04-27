import { pool } from "./config/db";
import bcrypt from "bcrypt";

async function seed() {
  console.log("🌱 Seeding database...");

  await pool.query(`
    DELETE FROM ticket_assignees;
    DELETE FROM team_members;
    DELETE FROM project_teams;
    DELETE FROM comments;
    DELETE FROM tickets;
    DELETE FROM teams;
    DELETE FROM projects;
    DELETE FROM users;
  `);

  const passwordHash = await bcrypt.hash("password123", 10);

  const { rows: users } = await pool.query(
    `
    INSERT INTO users (first_name, last_name, email, password_hash) VALUES
    ('Katherin', 'Jimenez', 'katherin@trackermax.com', $1),
    ('Chris', 'Cordero', 'chris@trackermax.com', $1),
    ('Alex', 'Rivera', 'alex@trackermax.com', $1),
    ('Jordan', 'Kim', 'jordan@trackermax.com', $1),
    ('Taylor', 'Morgan', 'taylor@trackermax.com', $1)
    RETURNING id, first_name, last_name, email
  `,
    [passwordHash],
  );

  const [katherin, chris, alex, jordan, taylor] = users;
  console.log("✅ Users created");

  const { rows: projects } = await pool.query(
    `
    INSERT INTO projects (name, description, creator_id) VALUES
    ('TrackerMax Web App', 'Main bug tracker application — frontend and backend.', $1),
    ('Mobile App', 'React Native mobile companion app for TrackerMax.', $2),
    ('API Gateway', 'Internal API gateway and authentication service.', $3),
    ('Design System', 'Shared component library and design tokens.', $4)
    RETURNING id, name
  `,
    [katherin.id, chris.id, alex.id, jordan.id],
  );

  const [trackermax, mobile, apiGateway, designSystem] = projects;
  console.log("✅ Projects created");

  const { rows: teams } = await pool.query(
    `
    INSERT INTO teams (name, creator_id) VALUES
    ('Frontend', $1),
    ('Backend', $2),
    ('Design', $3)
    RETURNING id, name
  `,
    [katherin.id, chris.id, jordan.id],
  );

  const [frontend, backend, design] = teams;
  console.log("✅ Teams created");

  // Team members — separate queries to avoid param confusion
  await pool.query(
    `INSERT INTO team_members (team_id, user_id) VALUES ($1, $2)`,
    [frontend.id, katherin.id],
  );
  await pool.query(
    `INSERT INTO team_members (team_id, user_id) VALUES ($1, $2)`,
    [frontend.id, alex.id],
  );
  await pool.query(
    `INSERT INTO team_members (team_id, user_id) VALUES ($1, $2)`,
    [backend.id, chris.id],
  );
  await pool.query(
    `INSERT INTO team_members (team_id, user_id) VALUES ($1, $2)`,
    [backend.id, taylor.id],
  );
  await pool.query(
    `INSERT INTO team_members (team_id, user_id) VALUES ($1, $2)`,
    [design.id, jordan.id],
  );
  await pool.query(
    `INSERT INTO team_members (team_id, user_id) VALUES ($1, $2)`,
    [design.id, taylor.id],
  );
  console.log("✅ Team members added");

  // Project teams — separate queries to avoid param confusion
  await pool.query(
    `INSERT INTO project_teams (project_id, team_id) VALUES ($1, $2)`,
    [trackermax.id, frontend.id],
  );
  await pool.query(
    `INSERT INTO project_teams (project_id, team_id) VALUES ($1, $2)`,
    [trackermax.id, backend.id],
  );
  await pool.query(
    `INSERT INTO project_teams (project_id, team_id) VALUES ($1, $2)`,
    [mobile.id, frontend.id],
  );
  await pool.query(
    `INSERT INTO project_teams (project_id, team_id) VALUES ($1, $2)`,
    [apiGateway.id, backend.id],
  );
  await pool.query(
    `INSERT INTO project_teams (project_id, team_id) VALUES ($1, $2)`,
    [designSystem.id, design.id],
  );
  console.log("✅ Project teams linked");

  const { rows: tickets } = await pool.query(
    `
    INSERT INTO tickets (title, description, category, priority, status, complexity, project_id, creator_id, assignee_id) VALUES
    ('Login page not redirecting after auth', 'After successful login the user stays on /login instead of being redirected to /dashboard.', 'bug', 'high', 'closed', 3, $1, $5, $6),
    ('Dashboard charts not rendering on Safari', 'Recharts PieChart throws a rendering error on Safari 16. Works fine on Chrome and Firefox.', 'bug', 'high', 'open', 5, $1, $6, $7),
    ('Add search bar to tickets page', 'Users need to be able to search tickets by title or description without scrolling through the full list.', 'feature', 'medium', 'in-progress', 4, $1, $5, $8),
    ('Ticket status filter resets on page refresh', 'When a status filter is applied and the page is refreshed, the filter resets to "all". Should persist via URL params.', 'bug', 'medium', 'open', 3, $1, $8, $6),
    ('Sidebar collapse state not persisting', 'The sidebar collapse state resets on every page navigation. Should be stored in localStorage.', 'improvement', 'low', 'in-progress', 2, $1, $7, $5),
    ('Add pagination to tickets list', 'The tickets list loads all tickets at once. Need to add server-side pagination for performance.', 'feature', 'high', 'open', 6, $1, $5, $7),
    ('Set up push notifications', 'Implement web push notifications for ticket assignments and status changes.', 'feature', 'medium', 'open', 8, $2, $8, $9),
    ('Mobile nav drawer not closing on route change', 'On mobile the navigation drawer stays open after tapping a nav item.', 'bug', 'high', 'in-review', 2, $2, $9, $8),
    ('JWT tokens not refreshing', 'Access tokens expire after 7 days with no refresh mechanism. Need to implement refresh token rotation.', 'bug', 'critical', 'in-progress', 7, $3, $6, $7),
    ('Rate limiting on auth endpoints', 'No rate limiting on /auth/login or /auth/register. Vulnerable to brute force attacks.', 'bug', 'critical', 'open', 5, $3, $7, $6),
    ('Add request validation middleware', 'API endpoints have no input validation. Need to add Zod or Joi schema validation across all routes.', 'improvement', 'high', 'open', 6, $3, $5, $8),
    ('Standardize button variants across components', 'Buttons are inconsistently styled across pages. Need to audit and align with the design system.', 'task', 'low', 'closed', 2, $4, $8, $9),
    ('Create icon library documentation', 'Document all available MUI icons used in the app with usage examples.', 'task', 'low', 'open', 1, $4, $9, $8),
    ('Dark mode support', 'Add dark mode toggle with system preference detection and localStorage persistence.', 'feature', 'medium', 'open', 5, $4, $5, $7),
    ('Ticket detail page', 'Clicking a ticket should open a detail page showing full description, comments, assignee, and history.', 'feature', 'high', 'in-progress', 7, $1, $6, $5)
    RETURNING id
  `,
    [
      trackermax.id,
      mobile.id,
      apiGateway.id,
      designSystem.id,
      katherin.id,
      chris.id,
      alex.id,
      jordan.id,
      taylor.id,
    ],
  );
  console.log("✅ Tickets created");

  // Comments
  await pool.query(
    `INSERT INTO comments (ticket_id, user_id, content) VALUES ($1, $2, $3)`,
    [
      tickets[0].id,
      katherin.id,
      "Confirmed on my end too. The redirect logic in the auth loader seems to be firing before the token is saved to localStorage.",
    ],
  );
  await pool.query(
    `INSERT INTO comments (ticket_id, user_id, content) VALUES ($1, $2, $3)`,
    [
      tickets[0].id,
      chris.id,
      "Fixed in PR #42 — moved the localStorage.setItem call before navigate(). Closing this one.",
    ],
  );
  await pool.query(
    `INSERT INTO comments (ticket_id, user_id, content) VALUES ($1, $2, $3)`,
    [
      tickets[1].id,
      alex.id,
      "Reproduced on Safari 16.4. Looks like a viewBox issue with the SVG renderer.",
    ],
  );
  await pool.query(
    `INSERT INTO comments (ticket_id, user_id, content) VALUES ($1, $2, $3)`,
    [
      tickets[1].id,
      jordan.id,
      "Might be worth swapping to Chart.js for the pie chart specifically since it has better Safari support.",
    ],
  );
  await pool.query(
    `INSERT INTO comments (ticket_id, user_id, content) VALUES ($1, $2, $3)`,
    [
      tickets[5].id,
      taylor.id,
      "We should implement cursor-based pagination instead of offset for better performance at scale.",
    ],
  );
  console.log("✅ Comments created");

  console.log("\n🎉 Seed complete! Login with any of these accounts:");
  console.log("   katherin@trackermax.com / password123");
  console.log("   chris@trackermax.com / password123");
  console.log("   alex@trackermax.com / password123");
  console.log("   jordan@trackermax.com / password123");
  console.log("   taylor@trackermax.com / password123");

  await pool.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
