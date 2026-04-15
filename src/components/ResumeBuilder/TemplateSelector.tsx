import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import type { ResumeTemplate } from "./types/types";

type TemplateSelectorProps = {
  selectedTemplate: ResumeTemplate;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<ResumeTemplate>>;
};

const templates: {
  id: ResumeTemplate;
  title: string;
  description: string;
}[] = [
  {
    id: "classic",
    title: "Classic",
    description: "Formal and professional layout",
  },
  {
    id: "modern",
    title: "Modern",
    description: "Bold structure with strong sections",
  },
  {
    id: "minimal",
    title: "Minimal",
    description: "Clean and ATS-friendly design",
  },
];

function TemplateSelector({
  selectedTemplate,
  setSelectedTemplate,
}: TemplateSelectorProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: "#111827",
          mb: 1,
        }}
      >
        Choose Template
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#6b7280",
          mb: 2,
        }}
      >
        Pick the design that best matches your resume style.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 2,
        }}
      >
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id;

          return (
            <Paper
              key={template.id}
              elevation={0}
              onClick={() => setSelectedTemplate(template.id)}
              sx={{
                p: 2,
                borderRadius: 4,
                border: isSelected
                  ? "2px solid #2563eb"
                  : "1px solid #e5e7eb",
                bgcolor: isSelected ? "#eff6ff" : "#ffffff",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: isSelected
                  ? "0 10px 24px rgba(37, 99, 235, 0.12)"
                  : "0 4px 12px rgba(15, 23, 42, 0.04)",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 28px rgba(15, 23, 42, 0.10)",
                  borderColor: "#93c5fd",
                },
              }}
            >
              <TemplateMiniPreview type={template.id} />

              <Box sx={{ mt: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    {template.title}
                  </Typography>

                  {isSelected && (
                    <Chip
                      label="Selected"
                      size="small"
                      sx={{
                        bgcolor: "#dbeafe",
                        color: "#1d4ed8",
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#6b7280",
                    mt: 0.8,
                    lineHeight: 1.6,
                  }}
                >
                  {template.description}
                </Typography>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}

type TemplateMiniPreviewProps = {
  type: ResumeTemplate;
};

function TemplateMiniPreview({ type }: TemplateMiniPreviewProps) {
  if (type === "classic") {
    return (
      <Box
        sx={{
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          bgcolor: "#ffffff",
          p: 1.5,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 1 }}>
          <Box
            sx={{
              width: "55%",
              height: 10,
              bgcolor: "#d1d5db",
              mx: "auto",
              borderRadius: 1,
              mb: 0.8,
            }}
          />
          <Box
            sx={{
              width: "80%",
              height: 6,
              bgcolor: "#e5e7eb",
              mx: "auto",
              borderRadius: 1,
            }}
          />
        </Box>

        {[1, 2, 3].map((item) => (
          <Box key={item} sx={{ mb: 1 }}>
            <Box
              sx={{
                width: "35%",
                height: 7,
                bgcolor: "#cbd5e1",
                borderRadius: 1,
                mb: 0.6,
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: 5,
                bgcolor: "#e5e7eb",
                borderRadius: 1,
                mb: 0.4,
              }}
            />
            <Box
              sx={{
                width: "85%",
                height: 5,
                bgcolor: "#e5e7eb",
                borderRadius: 1,
              }}
            />
          </Box>
        ))}
      </Box>
    );
  }

  if (type === "modern") {
    return (
      <Box
        sx={{
          height: 155,
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          display: "grid",
          gridTemplateColumns: "34% 1fr",
        }}
      >
        <Box sx={{ bgcolor: "#1d4ed8" }} />
        <Box sx={{ bgcolor: "#ffffff", p: 1.2 }}>
          <Box
            sx={{
              width: "60%",
              height: 10,
              bgcolor: "#cbd5e1",
              borderRadius: 1,
              mb: 0.8,
            }}
          />
          <Box
            sx={{
              width: "90%",
              height: 5,
              bgcolor: "#e5e7eb",
              borderRadius: 1,
              mb: 1,
            }}
          />
          {[1, 2, 3].map((item) => (
            <Box key={item} sx={{ mb: 0.9 }}>
              <Box
                sx={{
                  width: "40%",
                  height: 6,
                  bgcolor: "#93c5fd",
                  borderRadius: 1,
                  mb: 0.5,
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  height: 5,
                  bgcolor: "#e5e7eb",
                  borderRadius: 1,
                  mb: 0.35,
                }}
              />
              <Box
                sx={{
                  width: "78%",
                  height: 5,
                  bgcolor: "#e5e7eb",
                  borderRadius: 1,
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: 155,
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        bgcolor: "#ffffff",
        p: 1.5,
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: 9,
          bgcolor: "#d1d5db",
          borderRadius: 1,
          mb: 1,
        }}
      />
      <Box
        sx={{
          width: "90%",
          height: 5,
          bgcolor: "#e5e7eb",
          borderRadius: 1,
          mb: 1.2,
        }}
      />
      {[1, 2, 3, 4].map((item) => (
        <Box key={item} sx={{ mb: 0.9 }}>
          <Box
            sx={{
              width: "28%",
              height: 6,
              bgcolor: "#cbd5e1",
              borderRadius: 1,
              mb: 0.4,
            }}
          />
          <Box
            sx={{
              width: "100%",
              height: 5,
              bgcolor: "#e5e7eb",
              borderRadius: 1,
              mb: 0.3,
            }}
          />
          <Box
            sx={{
              width: "72%",
              height: 5,
              bgcolor: "#e5e7eb",
              borderRadius: 1,
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

export default TemplateSelector;