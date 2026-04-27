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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTickets, useCreateTicket, useDeleteTicket } from "./useTickets";
import { type CreateTicketDto } from "./tickets.api";
import { useProjects } from "../projects/useProjects";

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

const EMPTY_FORM: CreateTicketDto = {
  title: "",
  description: "",
  category: "bug",
  priority: "medium",
  status: "open",
  complexity: 1,
  project_id: "",
};

export default function TicketsPage() {
  const { data: tickets, isLoading } = useTickets();
  const createTicket = useCreateTicket();
  const deleteTicket = useDeleteTicket();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CreateTicketDto>(EMPTY_FORM);
  const [filterStatus, setFilterStatus] = useState("all");

  const { data: projects } = useProjects();

  const handleCreate = async () => {
    if (!form.title || !form.project_id) return;
    await createTicket.mutateAsync(form);
    setForm(EMPTY_FORM);
    setOpen(false);
  };

  const filtered = tickets?.filter((t) =>
    filterStatus === "all" ? true : t.status === filterStatus,
  );

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
        <Box>
          <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
            {tickets?.length ?? 0} total tickets
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ fontWeight: 600, fontSize: 13 }}
        >
          New Ticket
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
        {["all", "open", "in-progress", "in-review", "closed"].map((s) => (
          <Chip
            key={s}
            label={s === "all" ? "All" : s}
            onClick={() => setFilterStatus(s)}
            variant={filterStatus === s ? "filled" : "outlined"}
            sx={{
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              bgcolor: filterStatus === s ? "#3f4d67" : "transparent",
              color: filterStatus === s ? "#fff" : "#3f4d67",
              borderColor: "rgba(63,77,103,0.2)",
            }}
          />
        ))}
      </Box>

      {/* Ticket list */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 8 }}>
          <CircularProgress size={32} />
        </Box>
      ) : filtered?.length === 0 ? (
        <Box sx={{ textAlign: "center", pt: 8 }}>
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            No tickets yet. Create your first one.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {filtered?.map((ticket) => (
            <Paper
              key={ticket.id}
              elevation={0}
              sx={{
                p: 2.5,
                border: "0.5px solid rgba(63,77,103,0.1)",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                "&:hover": { borderColor: "rgba(63,77,103,0.25)" },
                transition: "border-color 0.15s",
              }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#3f4d67",
                    mb: 0.5,
                  }}
                >
                  {ticket.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "text.secondary",
                    mb: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {ticket.description}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip
                    label={ticket.status}
                    size="small"
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      bgcolor: `${STATUS_COLORS[ticket.status]}18`,
                      color: STATUS_COLORS[ticket.status],
                    }}
                  />
                  <Chip
                    label={ticket.priority}
                    size="small"
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      bgcolor: `${PRIORITY_COLORS[ticket.priority]}18`,
                      color: PRIORITY_COLORS[ticket.priority],
                    }}
                  />
                  <Chip
                    label={ticket.category}
                    size="small"
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      bgcolor: "rgba(63,77,103,0.08)",
                      color: "#3f4d67",
                    }}
                  />
                  {ticket.project_name && (
                    <Chip
                      label={ticket.project_name}
                      size="small"
                      sx={{
                        fontSize: 11,
                        bgcolor: "rgba(63,77,103,0.05)",
                        color: "text.secondary",
                      }}
                    />
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  flexShrink: 0,
                }}
              >
                <Typography
                  sx={{ fontSize: 11, color: "text.secondary", mr: 1 }}
                >
                  {ticket.creator_first_name} {ticket.creator_last_name}
                </Typography>
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ color: "error.main" }}
                  onClick={() => deleteTicket.mutate(ticket.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {/* Create ticket dialog */}
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
          New Ticket
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
            label="Title"
            size="small"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
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
          <FormControl size="small" fullWidth>
            <InputLabel>Project</InputLabel>
            <Select
              value={form.project_id}
              label="Project"
              onChange={(e) => setForm({ ...form, project_id: e.target.value })}
            >
              {projects?.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={form.category}
                label="Category"
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <MenuItem value="bug">Bug</MenuItem>
                <MenuItem value="feature">Feature</MenuItem>
                <MenuItem value="improvement">Improvement</MenuItem>
                <MenuItem value="task">Task</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={form.priority}
                label="Priority"
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={form.status}
                label="Status"
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="in-review">In Review</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Complexity (1-10)"
              size="small"
              type="number"
              value={form.complexity}
              onChange={(e) =>
                setForm({ ...form, complexity: Number(e.target.value) })
              }
              slotProps={{
                htmlInput: { min: 1, max: 10 },
              }}
            />
          </Box>
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
            disabled={createTicket.isPending}
            sx={{ fontWeight: 600 }}
          >
            {createTicket.isPending ? "Creating..." : "Create Ticket"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
