import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BugReportIcon from "@mui/icons-material/BugReport";
import FolderIcon from "@mui/icons-material/Folder";
import GroupsIcon from "@mui/icons-material/Groups";
import BarChartIcon from "@mui/icons-material/BarChart";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import SpeedIcon from "@mui/icons-material/Speed";

const FEATURES = [
  {
    icon: <BugReportIcon sx={{ fontSize: 24, color: "#778fd3" }} />,
    title: "Ticket Tracking",
    desc: "Create, assign, and track bugs and tasks with priority levels, categories, and complexity scores.",
  },
  {
    icon: <FolderIcon sx={{ fontSize: 24, color: "#778fd3" }} />,
    title: "Project Management",
    desc: "Organize tickets into projects. Get a bird's-eye view of everything your team is working on.",
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 24, color: "#778fd3" }} />,
    title: "Team Collaboration",
    desc: "Build teams, add members, and assign tickets to the right people.",
  },
  {
    icon: <BarChartIcon sx={{ fontSize: 24, color: "#778fd3" }} />,
    title: "Dashboard Analytics",
    desc: "Visualize ticket status, priority distribution, and team velocity at a glance.",
  },
  {
    icon: <TaskAltIcon sx={{ fontSize: 24, color: "#778fd3" }} />,
    title: "Status Workflows",
    desc: "Move tickets through open, in-progress, in-review, and closed stages.",
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 24, color: "#778fd3" }} />,
    title: "Built for Speed",
    desc: "Fast, responsive, and designed to get out of your way so your team can ship.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "#f4f7fa", minHeight: "100vh" }}>
      {/* Navbar */}
      <Box
        sx={{
          bgcolor: "#3f4d67",
          px: { xs: 3, md: 6 },
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: -0.3,
          }}
        >
          TrackerMax
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            onClick={() => navigate("/login")}
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontSize: 13,
              fontWeight: 500,
              "&:hover": { color: "#fff" },
            }}
          >
            Sign in
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/register")}
            sx={{
              bgcolor: "#778fd3",
              fontSize: 13,
              fontWeight: 600,
              "&:hover": { bgcolor: "#5a73c7" },
            }}
          >
            Get started
          </Button>
        </Box>
      </Box>

      {/* Hero */}
      <Box
        sx={{
          bgcolor: "#3f4d67",
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
          px: 3,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 36, md: 52 },
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            letterSpacing: -1,
            mb: 2,
            maxWidth: 700,
            mx: "auto",
          }}
        >
          Track bugs.
          <br />
          Ship faster.
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 15, md: 17 },
            color: "rgba(255,255,255,0.55)",
            mb: 4,
            maxWidth: 480,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          TrackerMax helps your team manage issues, projects, and tickets — all
          in one clean, fast workspace.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/register")}
            sx={{
              bgcolor: "#778fd3",
              fontWeight: 700,
              fontSize: 14,
              px: 4,
              py: 1.5,
              "&:hover": { bgcolor: "#5a73c7" },
            }}
          >
            Get started free
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/login")}
            sx={{
              borderColor: "rgba(255,255,255,0.3)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              px: 4,
              py: 1.5,
              "&:hover": {
                borderColor: "#fff",
                bgcolor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            Sign in
          </Button>
        </Box>

        {/* Stats */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 4, md: 8 },
            justifyContent: "center",
            mt: 8,
            flexWrap: "wrap",
          }}
        >
          {[
            ["2.4k+", "Tickets closed"],
            ["98%", "Uptime"],
            ["340+", "Teams"],
          ].map(([num, label]) => (
            <Box key={label} sx={{ textAlign: "center" }}>
              <Typography
                sx={{ fontSize: 28, fontWeight: 800, color: "#778fd3" }}
              >
                {num}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 800,
            fontSize: { xs: 26, md: 34 },
            color: "#3f4d67",
            mb: 1,
            letterSpacing: -0.5,
          }}
        >
          Everything your team needs
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: 15,
            color: "text.secondary",
            mb: 6,
            maxWidth: 480,
            mx: "auto",
          }}
        >
          A focused set of tools designed to keep your team moving without the
          bloat.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 3,
          }}
        >
          {FEATURES.map(({ icon, title, desc }) => (
            <Box
              key={title}
              sx={{
                p: 3,
                bgcolor: "#fff",
                borderRadius: 3,
                border: "0.5px solid rgba(63,77,103,0.1)",
                "&:hover": {
                  borderColor: "rgba(63,77,103,0.25)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.15s",
              }}
            >
              <Box
                sx={{
                  mb: 1.5,
                  bgcolor: "rgba(119,143,211,0.1)",
                  p: 1,
                  borderRadius: 2,
                  display: "inline-flex",
                }}
              >
                {icon}
              </Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#3f4d67",
                  mb: 0.75,
                }}
              >
                {title}
              </Typography>
              <Typography
                sx={{ fontSize: 13, color: "text.secondary", lineHeight: 1.6 }}
              >
                {desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* CTA */}
      <Box
        sx={{
          bgcolor: "#3f4d67",
          py: { xs: 8, md: 10 },
          px: 3,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 26, md: 34 },
            fontWeight: 800,
            color: "#fff",
            mb: 1.5,
            letterSpacing: -0.5,
          }}
        >
          Ready to ship faster?
        </Typography>
        <Typography
          sx={{ fontSize: 15, color: "rgba(255,255,255,0.5)", mb: 4 }}
        >
          Join teams already using TrackerMax to stay on top of their work.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/register")}
          sx={{
            bgcolor: "#778fd3",
            fontWeight: 700,
            fontSize: 14,
            px: 5,
            py: 1.5,
            "&:hover": { bgcolor: "#5a73c7" },
          }}
        >
          Get started free
        </Button>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#2a3347", py: 3, px: 3, textAlign: "center" }}>
        <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
          © 2026 TrackerMax. Built with React, Node.js, and PostgreSQL.
        </Typography>
      </Box>
    </Box>
  );
}
