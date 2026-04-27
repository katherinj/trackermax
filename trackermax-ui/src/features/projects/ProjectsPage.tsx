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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import { useProjects, useCreateProject, useDeleteProject } from "./useProjects";
import { type CreateProjectDto } from "./projects.api";

const EMPTY_FORM: CreateProjectDto = {
  name: "",
  description: "",
};

export default function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CreateProjectDto>(EMPTY_FORM);

  const handleCreate = async () => {
    if (!form.name || !form.description) return;
    await createProject.mutateAsync(form);
    setForm(EMPTY_FORM);
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
          {projects?.length ?? 0} projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ fontWeight: 600, fontSize: 13 }}
        >
          New Project
        </Button>
      </Box>

      {/* Project grid */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 8 }}>
          <CircularProgress size={32} />
        </Box>
      ) : projects?.length === 0 ? (
        <Box sx={{ textAlign: "center", pt: 8 }}>
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            No projects yet. Create your first one.
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
          {projects?.map((project) => (
            <Paper
              key={project.id}
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
                  <FolderIcon sx={{ color: "#778fd3", fontSize: 20 }} />
                </Box>
                <IconButton
                  size="small"
                  sx={{ color: "error.main" }}
                  onClick={() => deleteProject.mutate(project.id)}
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
                  {project.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "text.secondary",
                    lineHeight: 1.5,
                  }}
                >
                  {project.description}
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
                  label={`${project.ticket_count} tickets`}
                  size="small"
                  sx={{
                    fontSize: 11,
                    bgcolor: "rgba(63,77,103,0.08)",
                    color: "#3f4d67",
                  }}
                />
                <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
                  {project.creator_first_name} {project.creator_last_name}
                </Typography>
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
        slotProps={{
          paper: {
            sx: { borderRadius: 3 },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: 16, color: "#3f4d67" }}>
          New Project
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: "16px !important",
          }}
        >
          <TextField
            fullWidth
            label="Project name"
            size="small"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Description"
            size="small"
            multiline
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
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
            disabled={createProject.isPending}
            sx={{ fontWeight: 600 }}
          >
            {createProject.isPending ? "Creating..." : "Create Project"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
