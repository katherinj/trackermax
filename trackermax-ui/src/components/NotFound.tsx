import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 2,
      }}
    >
      <Typography sx={{ fontSize: 64, fontWeight: 800, color: "#3f4d67" }}>
        404
      </Typography>
      <Typography sx={{ fontSize: 16, color: "text.secondary" }}>
        Page not found
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{ fontWeight: 600, mt: 1 }}
      >
        Go home
      </Button>
    </Box>
  );
}
