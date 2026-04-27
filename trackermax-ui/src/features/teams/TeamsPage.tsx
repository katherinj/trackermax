import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupsIcon from "@mui/icons-material/Groups";
import { useTeams, useCreateTeam, useDeleteTeam } from "./useTeams";

export default function TeamsPage() {
  const { data: teams, isLoading } = useTeams();
  const createTeam = useCreateTeam();
  const deleteTeam = useDeleteTeam();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) return;
    await createTeam.mutateAsync(name);
    setName("");
    setOpen(false);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
          {teams?.length ?? 0} teams
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ fontWeight: 600, fontSize: 13 }}
        >
          New Team
        </Button>
      </Box>

      {/* Teams grid */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 8 }}>
          <CircularProgress size={32} />
        </Box>
      ) : teams?.length === 0 ? (
        <Box sx={{ textAlign: "center", pt: 8 }}>
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            No teams yet. Create your first one.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 2,
          }}
        >
          {teams?.map((team) => (
            <Paper
              key={team.id}
              elevation={0}
              sx={{
                p: 3,
                border: "0.5px solid rgba(63,77,103,0.1)",
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                "&:hover": { borderColor: "rgba(63,77,103,0.25)" },
                transition: "border-color 0.15s",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "rgba(119,143,211,0.15)",
                    p: 1,
                    borderRadius: 2,
                    display: "flex",
                  }}
                >
                  <GroupsIcon sx={{ color: "#778fd3", fontSize: 20 }} />
                </Box>
                <IconButton
                  size="small"
                  sx={{ color: "error.main" }}
                  onClick={() => deleteTeam.mutate(team.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#3f4d67",
                    mb: 0.5,
                  }}
                >
                  {team.name}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                  Created by {team.creator_first_name} {team.creator_last_name}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: "auto",
                }}
              >
                <Chip
                  label={`${team.member_count} members`}
                  size="small"
                  sx={{
                    fontSize: 11,
                    bgcolor: "rgba(63,77,103,0.08)",
                    color: "#3f4d67",
                  }}
                />
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: "#778fd3",
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  {team.creator_first_name[0]}
                  {team.creator_last_name[0]}
                </Avatar>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {/* Create dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 3 } } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: 16, color: "#3f4d67" }}>
          New Team
        </DialogTitle>
        <DialogContent sx={{ pt: "16px !important" }}>
          <TextField
            fullWidth
            label="Team name"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{ color: "text.secondary" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={createTeam.isPending}
            sx={{ fontWeight: 600 }}
          >
            {createTeam.isPending ? "Creating..." : "Create Team"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
