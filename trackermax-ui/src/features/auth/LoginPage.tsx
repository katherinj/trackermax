import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { authApi } from "./auth.api";
import { useAuthStore } from "../../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const { user, token } = await authApi.login(email, password);
      localStorage.setItem("trackermax_token", token);
      setAuth(user, token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
      }}
    >
      {/* Mobile header — only on small screens */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          bgcolor: "#3f4d67",
          px: 3,
          py: 2,
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
        <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
          Issue tracking, simplified
        </Typography>
      </Box>

      {/* Left panel — desktop only */}
      <Box
        sx={{
          width: 420,
          bgcolor: "#3f4d67",
          p: 6,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
          TrackerMax
        </Typography>
        <Box>
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 700,
              color: "#fff",
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Track bugs.
            <br />
            Ship faster.
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
            Manage your team's issues, projects, and tickets all in one place.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 4 }}>
          {[
            ["2.4k", "Tickets closed"],
            ["98%", "Uptime"],
            ["340+", "Teams"],
          ].map(([num, label]) => (
            <Box
              key={label}
              sx={{ borderTop: "1px solid rgba(255,255,255,0.15)", pt: 1.5 }}
            >
              <Typography
                sx={{ color: "#778fd3", fontWeight: 700, fontSize: 22 }}
              >
                {num}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 11,
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

      {/* Right panel — form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          bgcolor: "#f4f7fa",
          pt: { xs: 6, md: 4 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 5,
            width: "100%",
            maxWidth: 380,
            border: "0.5px solid rgba(63,77,103,0.1)",
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Welcome back
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 3 }}>
            Sign in to your workspace
          </Typography>

          {error && (
            <Typography sx={{ color: "error.main", fontSize: 13, mb: 2 }}>
              {error}
            </Typography>
          )}

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            size="small"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 1 }}
            size="small"
          />

          <Box sx={{ textAlign: "right", mb: 3 }}>
            <Typography
              component={Link}
              to="/forgot-password"
              sx={{ fontSize: 12, color: "#778fd3" }}
            >
              Forgot password?
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ py: 1.2, fontSize: 14, fontWeight: 600 }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <Typography
            sx={{
              textAlign: "center",
              mt: 3,
              fontSize: 13,
              color: "text.secondary",
            }}
          >
            Don't have an account?{" "}
            <Typography
              component={Link}
              to="/register"
              sx={{ color: "#778fd3", fontWeight: 600, fontSize: 13 }}
            >
              Create one
            </Typography>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
