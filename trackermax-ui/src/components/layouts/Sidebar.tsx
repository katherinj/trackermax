import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BugReportIcon from "@mui/icons-material/BugReport";
import FolderIcon from "@mui/icons-material/Folder";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthStore } from "../../store/authStore";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: <DashboardIcon fontSize="small" />,
    path: "/dashboard",
  },
  {
    label: "Tickets",
    icon: <BugReportIcon fontSize="small" />,
    path: "/tickets",
  },
  {
    label: "Projects",
    icon: <FolderIcon fontSize="small" />,
    path: "/projects",
  },
  { label: "Teams", icon: <GroupsIcon fontSize="small" />, path: "/teams" },
  { label: "Profile", icon: <PersonIcon fontSize="small" />, path: "/profile" },
  {
    label: "Settings",
    icon: <SettingsIcon fontSize="small" />,
    path: "/settings",
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const width = collapsed ? 64 : 240;

  return (
    <Box
      sx={{
        width,
        flexShrink: 0,
        bgcolor: "#3f4d67",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        transition: "width 0.2s ease",
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          px: collapsed ? 0 : 2.5,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}
      >
        {!collapsed && (
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: -0.3,
            }}
          >
            TrackerMax
          </Typography>
        )}
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{ color: "rgba(255,255,255,0.6)", p: 0.75 }}
        >
          {collapsed ? (
            <ChevronRightIcon fontSize="small" />
          ) : (
            <ChevronLeftIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      {/* Nav items */}
      <Box
        sx={{
          flex: 1,
          py: 1.5,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          px: 1,
        }}
      >
        {NAV_ITEMS.map(({ label, icon, path }) => {
          const active = location.pathname === path;
          return (
            <Tooltip
              key={path}
              title={collapsed ? label : ""}
              placement="right"
            >
              <Box
                onClick={() => navigate(path)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                  bgcolor: active ? "rgba(119,143,211,0.2)" : "transparent",
                  color: active ? "#778fd3" : "rgba(255,255,255,0.6)",
                  transition: "all 0.15s",
                  justifyContent: collapsed ? "center" : "flex-start",
                  "&:hover": {
                    bgcolor: active
                      ? "rgba(119,143,211,0.25)"
                      : "rgba(255,255,255,0.06)",
                    color: active ? "#778fd3" : "#fff",
                  },
                }}
              >
                {icon}
                {!collapsed && (
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: active ? 600 : 400,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </Typography>
                )}
              </Box>
            </Tooltip>
          );
        })}
      </Box>

      {/* User + logout */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          p: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          gap: 1,
        }}
      >
        {!collapsed && (
          <Box>
            <Typography
              sx={{
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              {user?.first_name} {user?.last_name}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>
              {user?.email}
            </Typography>
          </Box>
        )}
        <Tooltip title="Logout" placement="right">
          <IconButton
            onClick={handleLogout}
            sx={{
              color: "rgba(255,255,255,0.5)",
              p: 0.75,
              "&:hover": { color: "#fff" },
            }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
