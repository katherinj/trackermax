import {
  Box,
  Typography,
  Paper,
  Divider,
  Switch,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [prefs, setPrefs] = useState({
    emailNotifications: true,
    ticketUpdates: true,
    teamInvites: true,
    weeklyDigest: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggle = (key: keyof typeof prefs) =>
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <Box
      sx={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 3 }}
    >
      {/* Notifications */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "0.5px solid rgba(63,77,103,0.1)",
          borderRadius: 3,
        }}
      >
        <Typography
          sx={{ fontWeight: 600, fontSize: 14, color: "#3f4d67", mb: 0.5 }}
        >
          Notifications
        </Typography>
        <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 2 }}>
          Control what you get notified about
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {[
          {
            key: "emailNotifications",
            label: "Email notifications",
            desc: "Receive notifications via email",
          },
          {
            key: "ticketUpdates",
            label: "Ticket updates",
            desc: "Get notified when tickets are updated",
          },
          {
            key: "teamInvites",
            label: "Team invites",
            desc: "Get notified when invited to a team",
          },
          {
            key: "weeklyDigest",
            label: "Weekly digest",
            desc: "Receive a weekly summary of activity",
          },
        ].map(({ key, label, desc }) => (
          <Box
            key={key}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              py: 1.5,
              borderBottom: "0.5px solid rgba(63,77,103,0.06)",
            }}
          >
            <Box>
              <Typography
                sx={{ fontSize: 13, fontWeight: 500, color: "#3f4d67" }}
              >
                {label}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                {desc}
              </Typography>
            </Box>
            <Switch
              checked={prefs[key as keyof typeof prefs]}
              onChange={() => toggle(key as keyof typeof prefs)}
              size="small"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: "#778fd3" },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  bgcolor: "#778fd3",
                },
              }}
            />
          </Box>
        ))}
      </Paper>

      {/* Danger zone */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "0.5px solid rgba(244,67,54,0.2)",
          borderRadius: 3,
        }}
      >
        <Typography
          sx={{ fontWeight: 600, fontSize: 14, color: "error.main", mb: 0.5 }}
        >
          Danger Zone
        </Typography>
        <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 2 }}>
          These actions are irreversible
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: 13, fontWeight: 500, color: "#3f4d67" }}
            >
              Delete account
            </Typography>
            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
              Permanently delete your account and all data
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            size="small"
            sx={{ fontWeight: 600, fontSize: 12 }}
          >
            Delete
          </Button>
        </Box>
      </Paper>

      {saved && (
        <Alert severity="success" sx={{ fontSize: 13 }}>
          Settings saved
        </Alert>
      )}

      <Button
        variant="contained"
        onClick={handleSave}
        sx={{ fontWeight: 600, fontSize: 13, alignSelf: "flex-start" }}
      >
        Save Settings
      </Button>
    </Box>
  );
}
