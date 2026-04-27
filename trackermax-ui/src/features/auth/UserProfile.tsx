import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
} from "@mui/material";
import { useAuthStore } from "../../store/authStore";
import { usersApi } from "./users.api";

export default function UserProfile() {
  const { user, setAuth } = useAuthStore();
  const token = localStorage.getItem("bugtracker_token") ?? "";

  const [form, setForm] = useState({
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const initials = user
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : "?";

  const handleUpdateProfile = async () => {
    setProfileError("");
    setProfileSuccess("");
    setProfileLoading(true);
    try {
      const { user: updated } = await usersApi.updateMe(form);
      setAuth(updated, token);
      setProfileSuccess("Profile updated successfully");
    } catch (err: any) {
      setProfileError(err.message);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    setPasswordError("");
    setPasswordSuccess("");
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    setPasswordLoading(true);
    try {
      await usersApi.updatePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword,
      );
      setPasswordSuccess("Password updated successfully");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setPasswordError(err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <Box
      sx={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 3 }}
    >
      {/* Avatar + name */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "0.5px solid rgba(63,77,103,0.1)",
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "#778fd3",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {initials}
          </Avatar>
          <Box>
            <Typography
              sx={{ fontWeight: 700, fontSize: 16, color: "#3f4d67" }}
            >
              {user?.first_name} {user?.last_name}
            </Typography>
            <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
              {user?.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography
          sx={{ fontWeight: 600, fontSize: 14, color: "#3f4d67", mb: 2 }}
        >
          Personal Information
        </Typography>

        {profileSuccess && (
          <Alert severity="success" sx={{ mb: 2, fontSize: 13 }}>
            {profileSuccess}
          </Alert>
        )}
        {profileError && (
          <Alert severity="error" sx={{ mb: 2, fontSize: 13 }}>
            {profileError}
          </Alert>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            fullWidth
            label="First name"
            size="small"
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Last name"
            size="small"
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          />
        </Box>

        <TextField
          fullWidth
          label="Email"
          size="small"
          value={user?.email ?? ""}
          disabled
          sx={{ mb: 2 }}
          helperText="Email cannot be changed"
        />

        <Button
          variant="contained"
          onClick={handleUpdateProfile}
          disabled={profileLoading}
          sx={{ fontWeight: 600, fontSize: 13 }}
        >
          {profileLoading ? "Saving..." : "Save Changes"}
        </Button>
      </Paper>

      {/* Password */}
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
          Change Password
        </Typography>

        {passwordSuccess && (
          <Alert severity="success" sx={{ mb: 2, fontSize: 13 }}>
            {passwordSuccess}
          </Alert>
        )}
        {passwordError && (
          <Alert severity="error" sx={{ mb: 2, fontSize: 13 }}>
            {passwordError}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="Current password"
            type="password"
            size="small"
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                currentPassword: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            label="New password"
            type="password"
            size="small"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Confirm new password"
            type="password"
            size="small"
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                confirmPassword: e.target.value,
              })
            }
          />
        </Box>

        <Button
          variant="contained"
          onClick={handleUpdatePassword}
          disabled={passwordLoading}
          sx={{ fontWeight: 600, fontSize: 13, mt: 2 }}
        >
          {passwordLoading ? "Updating..." : "Update Password"}
        </Button>
      </Paper>
    </Box>
  );
}
