import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#ffffff",
        borderTop: "1px solid #e5e7eb",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 2.5 }}>
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: "#6b7280",
            fontSize: { xs: "0.85rem", sm: "0.95rem" },
          }}
        >
          Built with React + Vite + TypeScript
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;