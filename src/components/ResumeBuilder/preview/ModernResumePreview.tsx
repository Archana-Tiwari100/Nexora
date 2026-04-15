import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import type {
  Education,
  Experience,
  PersonalInfo,
  Project,
} from "../types/types";

type ModernResumePreviewProps = {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  isExporting?: boolean;
};

function ModernResumePreview({
  personalInfo,
  education,
  experience,
  skills,
  projects,
   isExporting = false,
}: ModernResumePreviewProps) {
  return (
    <Box
      sx={{
        width: "210mm",
        minHeight: "297mm",
        bgcolor: "#ffffff",
        boxShadow: isExporting
          ? "none"
          : "0 12px 32px rgba(15, 23, 42, 0.14)",
        borderRadius: "8px",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "72mm 1fr",
      }}
    >
      {/* LEFT SIDEBAR */}
      <Box
        sx={{
          bgcolor: "#0f172a",
          color: "#ffffff",
          px: 3,
          py: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.7rem",
            fontWeight: 800,
            lineHeight: 1.2,
            mb: 1.2,
          }}
        >
          {personalInfo.fullName || "Your Name"}
        </Typography>

        <Typography
          sx={{
            fontSize: "0.88rem",
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.8,
            mb: 3,
          }}
        >
          {personalInfo.email || "your.email@example.com"}
          <br />
          {personalInfo.phone || "+91 9876543210"}
          <br />
          {personalInfo.location || "Your Location"}
        </Typography>

        <SidebarSection title="Skills">
          {skills.length === 0 ? (
            <Typography sx={sidePlaceholder}>
              Skills appear here
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.08)",
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 2,
                    height: 28,
                  }}
                />
              ))}
            </Box>
          )}
        </SidebarSection>

        <SidebarSection title="Education">
          {education.length === 0 ? (
            <Typography sx={sidePlaceholder}>
              Education appears here
            </Typography>
          ) : (
            education.map((item) => (
              <Box key={item.id} sx={{ mb: 1.8 }}>
                <Typography sx={sideTitle}>
                  {item.degree}
                </Typography>
                <Typography sx={sideText}>
                  {item.school}
                </Typography>
                <Typography sx={sideTextMuted}>
                  {item.startYear || "Start"} - {item.endYear || "End"}
                </Typography>
                {item.marks && (
                  <Typography sx={sideTextMuted}>
                    {item.marks}
                  </Typography>
                )}
              </Box>
            ))
          )}
        </SidebarSection>
      </Box>

      {/* RIGHT CONTENT */}
      <Box
        sx={{
          px: 4,
          py: 4,
          color: "#111827",
        }}
      >
        <MainSection title="Professional Summary">
          <Typography sx={mainText}>
            {personalInfo.summary ||
              "Write a short professional summary that highlights your experience, strengths, and career goals."}
          </Typography>
        </MainSection>

        <MainSection title="Experience">
          {experience.length === 0 ? (
            <Typography sx={mainPlaceholder}>
              Your work experience will appear here.
            </Typography>
          ) : (
            experience.map((item) => (
              <Box key={item.id} sx={{ mb: 2.6 }}>
                <Typography sx={mainTitle}>{item.role}</Typography>
                <Typography
                  sx={{
                    fontSize: "0.94rem",
                    color: "#2563eb",
                    mt: 0.25,
                    fontWeight: 600,
                  }}
                >
                  {item.company}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.86rem",
                    color: "#6b7280",
                    mt: 0.25,
                  }}
                >
                  {item.startDate || "Start"} - {item.endDate || "End"}
                </Typography>
                {item.description && (
                  <Typography sx={{ ...mainText, mt: 0.8 }}>
                    {item.description}
                  </Typography>
                )}
              </Box>
            ))
          )}
        </MainSection>

        <MainSection title="Projects">
          {projects.length === 0 ? (
            <Typography sx={mainPlaceholder}>
              Your projects will appear here.
            </Typography>
          ) : (
            projects.map((item) => (
              <Box key={item.id} sx={{ mb: 2.5 }}>
                <Typography sx={mainTitle}>{item.title}</Typography>
                {item.techStack && (
                  <Typography
                    sx={{
                      fontSize: "0.92rem",
                      color: "#2563eb",
                      mt: 0.25,
                    }}
                  >
                    {item.techStack}
                  </Typography>
                )}
                {item.description && (
                  <Typography sx={{ ...mainText, mt: 0.8 }}>
                    {item.description}
                  </Typography>
                )}
                {item.link && (
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "#1d4ed8",
                      mt: 0.65,
                      wordBreak: "break-all",
                    }}
                  >
                    {item.link}
                  </Typography>
                )}
              </Box>
            ))
          )}
        </MainSection>
      </Box>
    </Box>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{
          fontSize: "0.86rem",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#93c5fd",
          mb: 1.2,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function MainSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ mb: 3.2 }}>
      <Typography
        sx={{
          fontSize: "0.98rem",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#111827",
          mb: 1.1,
          borderBottom: "2px solid #dbeafe",
          pb: 0.6,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

const sideTitle = {
  fontSize: "0.9rem",
  fontWeight: 700,
  color: "#ffffff",
  lineHeight: 1.4,
};

const sideText = {
  fontSize: "0.84rem",
  color: "rgba(255,255,255,0.85)",
  mt: 0.3,
  lineHeight: 1.6,
};

const sideTextMuted = {
  fontSize: "0.82rem",
  color: "rgba(255,255,255,0.65)",
  mt: 0.2,
};

const sidePlaceholder = {
  fontSize: "0.84rem",
  color: "rgba(255,255,255,0.55)",
};

const mainTitle = {
  fontSize: "1rem",
  fontWeight: 700,
  color: "#111827",
  lineHeight: 1.4,
};

const mainText = {
  fontSize: "0.94rem",
  color: "#4b5563",
  lineHeight: 1.8,
  textAlign: "justify",
};

const mainPlaceholder = {
  fontSize: "0.94rem",
  color: "#9ca3af",
};

export default ModernResumePreview;