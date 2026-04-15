import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  actionLabel?: string;
  onActionClick?: () => void;
  actionIcon?: React.ReactNode;
  actionDisabled?: boolean;
};

function AppHeader({
  title,
  subtitle,
  onBack,
  actionLabel,
  onActionClick,
  actionIcon,
  actionDisabled = false,
}: AppHeaderProps) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(14px)",
        color: "#111827",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "1400px",
          width: "100%",
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          py: 0.7,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
          {onBack && (
            <IconButton
              onClick={onBack}
              sx={{
                borderRadius: 3,
                bgcolor: "#f8fafc",
                border: "1px solid #e5e7eb",
                color: "#111827",
                flexShrink: 0,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#eef2f7",
                  transform: "translateX(-2px)",
                },
              }}
            >
              <ArrowBackRoundedIcon />
            </IconButton>
          )}

          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 3,
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "#ffffff",
              boxShadow: "0 10px 20px rgba(59,130,246,0.24)",
              flexShrink: 0,
            }}
          >
            <AutoAwesomeRoundedIcon sx={{ fontSize: 22 }} />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "0.92rem", sm: "1rem" },
                color: "#2563eb",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Nexora
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.08rem" },
                color: "#111827",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  color: "#6b7280",
                  mt: 0.1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>

        {actionLabel && onActionClick && (
          <Button
            variant="contained"
            startIcon={actionIcon}
            onClick={onActionClick}
            disabled={actionDisabled}
            sx={{
              textTransform: "none",
              borderRadius: 3,
              px: 3,
              py: 1,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {actionLabel}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;