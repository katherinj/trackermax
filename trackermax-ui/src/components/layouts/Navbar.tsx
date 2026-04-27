import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/tickets": "Tickets",
  "/projects": "Projects",
  "/teams": "Teams",
  "/profile": "Profile",
  "/settings": "Settings",
};

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const title = PAGE_TITLES[location.pathname] ?? "TrackerMax";
  const initials = user
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : "?";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: 60,
        bgcolor: "#fff",
        borderBottom: "0.5px solid rgba(63,77,103,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Page title */}
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 16,
          color: "#3f4d67",
          letterSpacing: -0.3,
        }}
      >
        {title}
      </Typography>

      {/* Right side */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* Notifications */}
        <IconButton sx={{ color: "#3f4d67" }}>
          <Badge
            badgeContent={3}
            color="error"
            sx={{
              "& .MuiBadge-badge": { fontSize: 10, height: 16, minWidth: 16 },
            }}
          >
            <NotificationsNoneIcon fontSize="small" />
          </Badge>
        </IconButton>

        {/* Avatar */}
        <Avatar
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            width: 32,
            height: 32,
            bgcolor: "#778fd3",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            "&:hover": { bgcolor: "#5a73c7" },
          }}
        >
          {initials}
        </Avatar>

        {/* Dropdown menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                mt: 1,
                minWidth: 200,
                border: "0.5px solid rgba(63,77,103,0.12)",
                borderRadius: 2,
              },
            },
          }}
        >
          {/* User info */}
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography
              sx={{ fontWeight: 600, fontSize: 13, color: "#3f4d67" }}
            >
              {user?.first_name} {user?.last_name}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
              {user?.email}
            </Typography>
          </Box>

          <Divider />

          <MenuItem
            onClick={() => {
              navigate("/profile");
              setAnchorEl(null);
            }}
            sx={{ gap: 1.5, fontSize: 13, color: "#3f4d67", py: 1 }}
          >
            <PersonIcon fontSize="small" sx={{ color: "text.secondary" }} />
            Profile
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate("/settings");
              setAnchorEl(null);
            }}
            sx={{ gap: 1.5, fontSize: 13, color: "#3f4d67", py: 1 }}
          >
            <SettingsIcon fontSize="small" sx={{ color: "text.secondary" }} />
            Settings
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={handleLogout}
            sx={{ gap: 1.5, fontSize: 13, color: "error.main", py: 1 }}
          >
            <LogoutIcon fontSize="small" />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
