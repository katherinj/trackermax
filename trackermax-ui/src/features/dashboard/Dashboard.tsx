import { Box, Typography, Paper, Chip } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import FolderIcon from "@mui/icons-material/Folder";
import GroupsIcon from "@mui/icons-material/Groups";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDashboardStats } from "../statistics/useStatistics";

const STAT_CARDS = (summary: any) => [
  {
    label: "Open Tickets",
    value: summary?.open_tickets ?? 0,
    icon: <BugReportIcon />,
    color: "#778fd3",
  },
  {
    label: "Closed Tickets",
    value: summary?.closed_tickets ?? 0,
    icon: <CheckCircleIcon />,
    color: "#4caf50",
  },
  {
    label: "Projects",
    value: summary?.total_projects ?? 0,
    icon: <FolderIcon />,
    color: "#ff9800",
  },
  {
    label: "Members",
    value: summary?.total_members ?? 0,
    icon: <GroupsIcon />,
    color: "#3f4d67",
  },
];

const STATUS_COLORS: Record<string, string> = {
  open: "#778fd3",
  "in-progress": "#ff9800",
  "in-review": "#9c27b0",
  closed: "#4caf50",
};

const PRIORITY_COLORS: Record<string, string> = {
  low: "#4caf50",
  medium: "#ff9800",
  high: "#f44336",
  critical: "#9c27b0",
};

export default function Dashboard() {
  const { data, isLoading } = useDashboardStats();

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
        }}
      >
        <Typography sx={{ color: "text.secondary" }}>Loading...</Typography>
      </Box>
    );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Stat cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 2,
        }}
      >
        {STAT_CARDS(data?.summary).map(({ label, value, icon, color }) => (
          <Paper
            key={label}
            elevation={0}
            sx={{
              p: 2.5,
              border: "0.5px solid rgba(63,77,103,0.1)",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                color,
                bgcolor: `${color}18`,
                p: 1.5,
                borderRadius: 2,
                display: "flex",
              }}
            >
              {icon}
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#3f4d67",
                  lineHeight: 1,
                }}
              >
                {value}
              </Typography>
              <Typography
                sx={{ fontSize: 12, color: "text.secondary", mt: 0.5 }}
              >
                {label}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Charts */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        {/* By status */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: "0.5px solid rgba(63,77,103,0.1)",
            borderRadius: 3,
          }}
        >
          <Typography
            sx={{ fontWeight: 600, fontSize: 14, color: "#3f4d67", mb: 2 }}
          >
            Tickets by Status
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data?.byStatus}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {data?.byStatus.map((entry) => (
                  <Cell
                    key={entry.status}
                    fill={STATUS_COLORS[entry.status] ?? "#ccc"}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(val, name) => [val, name]} />
            </PieChart>
          </ResponsiveContainer>
        </Paper>

        {/* By priority */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: "0.5px solid rgba(63,77,103,0.1)",
            borderRadius: 3,
          }}
        >
          <Typography
            sx={{ fontWeight: 600, fontSize: 14, color: "#3f4d67", mb: 2 }}
          >
            Tickets by Priority
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data?.byPriority}>
              <XAxis dataKey="priority" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data?.byPriority.map((entry) => (
                  <Cell
                    key={entry.priority}
                    fill={PRIORITY_COLORS[entry.priority] ?? "#ccc"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {/* Recent tickets */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "0.5px solid rgba(63,77,103,0.1)",
          borderRadius: 3,
        }}
      >
        <Typography
          sx={{ fontWeight: 600, fontSize: 14, color: "#3f4d67", mb: 2 }}
        >
          Recent Tickets
        </Typography>
        {data?.recentTickets.length === 0 ? (
          <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
            No tickets yet.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {data?.recentTickets.map((ticket) => (
              <Box
                key={ticket.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "#f4f7fa",
                }}
              >
                <Box>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 600, color: "#3f4d67" }}
                  >
                    {ticket.title}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
                    {ticket.first_name} {ticket.last_name} ·{" "}
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Chip
                    label={ticket.status}
                    size="small"
                    sx={{
                      fontSize: 11,
                      bgcolor: `${STATUS_COLORS[ticket.status]}18`,
                      color: STATUS_COLORS[ticket.status],
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label={ticket.priority}
                    size="small"
                    sx={{
                      fontSize: 11,
                      bgcolor: `${PRIORITY_COLORS[ticket.priority]}18`,
                      color: PRIORITY_COLORS[ticket.priority],
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
}
