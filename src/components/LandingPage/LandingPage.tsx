import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

type ProjectKey =
  | "landing"
  | "task-manager"
  | "resume-builder"
  | "voice-reminder";

type LandingPageProps = {
  onNavigate: (project: ProjectKey) => void;
};

const projects = [
  {
    key: "task-manager" as ProjectKey,
    title: "Task Manager",
    subtitle: "Productivity Dashboard",
    description:
      "Track tasks, manage workflow, and stay organized with a clean interactive interface.",
    icon: <AssignmentTurnedInRoundedIcon sx={{ fontSize: 32 }} />,
    accent: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    glow: "rgba(99, 102, 241, 0.24)",
    tags: ["Tasks", "Workflow", "Productivity"],
  },
  {
    key: "resume-builder" as ProjectKey,
    title: "Resume Builder",
    subtitle: "Career Creation Studio",
    description:
      "Build polished resumes with live preview, premium templates, and PDF export.",
    icon: <DescriptionRoundedIcon sx={{ fontSize: 32 }} />,
    accent: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    glow: "rgba(6, 182, 212, 0.22)",
    tags: ["Templates", "Preview", "PDF"],
  },
  {
    key: "voice-reminder" as ProjectKey,
    title: "Voxa",
    subtitle: "Smart Voice Reminder",
    description:
      "Create speaking reminders with snooze, repeat schedule, notifications, and voice personality.",
    icon: <CampaignRoundedIcon sx={{ fontSize: 32 }} />,
    accent: "linear-gradient(135deg, #f59e0b, #ef4444)",
    glow: "rgba(245, 158, 11, 0.24)",
    tags: ["Voice", "Reminders", "Assistant"],
  },
];

function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#040814",
        color: "#ffffff",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 14% 18%, rgba(59,130,246,0.22), transparent 24%), radial-gradient(circle at 86% 16%, rgba(168,85,247,0.18), transparent 24%), radial-gradient(circle at 52% 84%, rgba(34,211,238,0.12), transparent 28%)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage:
            "radial-gradient(circle at center, black 45%, transparent 95%)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          py: { xs: 6, md: 9 },
        }}
      >
        <Box
          sx={{
            mb: { xs: 5, md: 7 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.1fr 0.9fr" },
            gap: 4,
            alignItems: "center",
          }}
        >
          <Box>
            <Stack spacing={2.2}>
              <Chip
                icon={<AutoAwesomeRoundedIcon />}
                label="Nexora • Smart Productivity Suite"
                sx={{
                  alignSelf: "flex-start",
                  height: 36,
                  px: 1,
                  bgcolor: "rgba(255,255,255,0.08)",
                  color: "#dbeafe",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                }}
              />

              <Typography
                sx={{
                  fontSize: { xs: "2.5rem", md: "4.8rem" },
                  fontWeight: 800,
                  lineHeight: 0.97,
                  letterSpacing: "-0.05em",
                  maxWidth: 920,
                }}
              >
                One elegant home for your{" "}
                <Box
                  component="span"
                  sx={{
                    background:
                      "linear-gradient(135deg, #60a5fa, #22d3ee, #c084fc)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  tools, workflows, and smart apps
                </Box>
              </Typography>

              <Typography
                sx={{
                  color: "#94a3b8",
                  fontSize: { xs: "1rem", md: "1.12rem" },
                  maxWidth: 760,
                  lineHeight: 1.9,
                }}
              >
                Nexora brings your personal productivity products into one
                premium workspace — from career tools and task systems to
                voice-powered assistants.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ pt: 1 }}
              >
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 999,
                    px: 3.5,
                    py: 1.3,
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    boxShadow: "0 14px 30px rgba(59,130,246,0.28)",
                  }}
                >
                  Explore Modules
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 999,
                    px: 3.5,
                    py: 1.3,
                    color: "#e2e8f0",
                    borderColor: "rgba(255,255,255,0.16)",
                    bgcolor: "rgba(255,255,255,0.04)",
                    "&:hover": {
                      borderColor: "rgba(255,255,255,0.24)",
                      bgcolor: "rgba(255,255,255,0.06)",
                    },
                  }}
                >
                  More Coming Soon
                </Button>
              </Stack>
            </Stack>
          </Box>

          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 6,
                p: "1px",
                background:
                  "linear-gradient(135deg, rgba(96,165,250,0.7), rgba(34,211,238,0.45), rgba(168,85,247,0.5))",
                boxShadow: "0 30px 80px rgba(0,0,0,0.32)",
              }}
            >
              <Box
                sx={{
                  borderRadius: 6,
                  p: 3,
                  bgcolor: "rgba(9, 14, 28, 0.92)",
                  backdropFilter: "blur(18px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Stack spacing={2.2}>
                  <GlassMiniCard
                    title="Career Studio"
                    subtitle="Resume Builder with templates and export"
                    accent="linear-gradient(135deg, #06b6d4, #3b82f6)"
                  />
                  <GlassMiniCard
                    title="Productivity Flow"
                    subtitle="Task Manager for focused daily execution"
                    accent="linear-gradient(135deg, #3b82f6, #8b5cf6)"
                  />
                  <GlassMiniCard
                    title="Voice Assistant"
                    subtitle="Voxa smart reminders with speaking alerts"
                    accent="linear-gradient(135deg, #f59e0b, #ef4444)"
                  />
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#e2e8f0",
              mb: 0.8,
            }}
          >
            Nexora Modules
          </Typography>

          <Typography
            sx={{
              color: "#94a3b8",
              lineHeight: 1.8,
            }}
          >
            Launch your tools from one unified product experience.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {projects.map((project) => (
            <Box
              key={project.key}
              sx={{
                position: "relative",
                borderRadius: 6,
                p: "1px",
                background: project.accent,
                transition: "transform 0.28s ease, box-shadow 0.28s ease",
                boxShadow: `0 18px 40px ${project.glow}`,
                "&:hover": {
                  transform: "translateY(-8px) scale(1.01)",
                  boxShadow: `0 26px 54px ${project.glow}`,
                },
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  borderRadius: 6,
                  p: { xs: 2.5, md: 3 },
                  bgcolor: "rgba(8, 15, 30, 0.9)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Stack
                  direction="row"
                  sx={{ mb: 3, justifyContent:"space-between", alignItems:"flex-start" }}
                >
                  <Box
                    sx={{
                      width: 66,
                      height: 66,
                      borderRadius: 4,
                      display: "grid",
                      placeItems: "center",
                      color: "#ffffff",
                      background: project.accent,
                      boxShadow: `0 14px 32px ${project.glow}`,
                    }}
                  >
                    {project.icon}
                  </Box>

                  <Chip
                    label={project.subtitle}
                    sx={{
                      maxWidth: 180,
                      bgcolor: "rgba(255,255,255,0.07)",
                      color: "#cbd5e1",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </Stack>

                <Typography
                  sx={{
                    fontSize: { xs: "1.45rem", md: "1.75rem" },
                    fontWeight: 700,
                    mb: 1,
                    color: "#f8fafc",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.title}
                </Typography>

                <Typography
                  sx={{
                    color: "#94a3b8",
                    lineHeight: 1.85,
                    mb: 3,
                    minHeight: { md: 98 },
                  }}
                >
                  {project.description}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ mb: 3, flexWrap:"wrap"}}
                >
                  {project.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.05)",
                        color: "#cbd5e1",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    />
                  ))}
                </Stack>

                <Button
                  variant="contained"
                  endIcon={<ArrowOutwardRoundedIcon />}
                  onClick={() => onNavigate(project.key)}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 999,
                    px: 3,
                    py: 1.25,
                    background: project.accent,
                    boxShadow: "none",
                  }}
                >
                  Open Module
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

type GlassMiniCardProps = {
  title: string;
  subtitle: string;
  accent: string;
};

function GlassMiniCard({ title, subtitle, accent }: GlassMiniCardProps) {
  return (
    <Box
      sx={{
        borderRadius: 4,
        p: "1px",
        background: accent,
      }}
    >
      <Box
        sx={{
          borderRadius: 4,
          p: 2,
          bgcolor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            color: "#f8fafc",
            mb: 0.4,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: "0.92rem",
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}

export default LandingPage;