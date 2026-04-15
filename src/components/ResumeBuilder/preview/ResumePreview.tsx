import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import type {
  Education,
  Experience,
  PersonalInfo,
  Project,
} from "../types/types";

type ResumePreviewProps = {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
};

function ResumePreview({
  personalInfo,
  education,
  experience,
  skills,
  projects,
}: ResumePreviewProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 2,
      }}
    >
      <Box
        sx={{
          width: "210mm",
          minHeight: "297mm",
          bgcolor: "#ffffff",
          color: "#111827",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
          borderRadius: "6px",
          px: { xs: 3, sm: 5 },
          py: { xs: 4, sm: 5 },
          overflow: "hidden",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 800,
              letterSpacing: "0.02em",
              lineHeight: 1.2,
              textTransform: "uppercase",
            }}
          >
            {personalInfo.fullName || "Your Name"}
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: "0.95rem",
              color: "#4b5563",
              lineHeight: 1.7,
            }}
          >
            {personalInfo.email || "your.email@example.com"}
            {" • "}
            {personalInfo.phone || "+91 9876543210"}
            {" • "}
            {personalInfo.location || "Your Location"}
          </Typography>
        </Box>

        <ResumeSection title="Professional Summary">
          <Typography
            sx={{
              fontSize: "0.96rem",
              color: "#374151",
              lineHeight: 1.8,
              textAlign: "justify",
            }}
          >
            {personalInfo.summary ||
              "Write a short professional summary that highlights your experience, strengths, and career goals. This section should give recruiters a quick overview of your profile."}
          </Typography>
        </ResumeSection>

        <ResumeSection title="Skills">
          {skills.length === 0 ? (
            <Typography sx={{ fontSize: "0.95rem", color: "#9ca3af" }}>
              Your skills will appear here.
            </Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  sx={{
                    borderRadius: 2,
                    bgcolor: "#f3f4f6",
                    color: "#374151",
                    fontWeight: 500,
                    border: "1px solid #e5e7eb",
                  }}
                />
              ))}
            </Box>
          )}
        </ResumeSection>

        <ResumeSection title="Experience">
          {experience.length === 0 ? (
            <Typography sx={{ fontSize: "0.95rem", color: "#9ca3af" }}>
              Your work experience will appear here.
            </Typography>
          ) : (
            experience.map((item) => (
              <Box key={item.id} sx={{ mb: 2.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#111827",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.role}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "0.95rem",
                        color: "#374151",
                        mt: 0.4,
                      }}
                    >
                      {item.company}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "#6b7280",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.startDate || "Start"} - {item.endDate || "End"}
                  </Typography>
                </Box>

                {item.description && (
                  <Typography
                    sx={{
                      fontSize: "0.94rem",
                      color: "#4b5563",
                      mt: 0.8,
                      lineHeight: 1.8,
                      textAlign: "justify",
                    }}
                  >
                    {item.description}
                  </Typography>
                )}
              </Box>
            ))
          )}
        </ResumeSection>

        <ResumeSection title="Education">
          {education.length === 0 ? (
            <Typography sx={{ fontSize: "0.95rem", color: "#9ca3af" }}>
              Your education details will appear here.
            </Typography>
          ) : (
            education.map((item) => (
              <Box key={item.id} sx={{ mb: 2.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#111827",
                        lineHeight: 1.4,
                      }}
                    >
                      {item.degree}
                      {item.fieldOfStudy ? ` in ${item.fieldOfStudy}` : ""}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "0.95rem",
                        color: "#374151",
                        mt: 0.4,
                      }}
                    >
                      {item.school}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "#6b7280",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.startYear || "Start"} - {item.endYear || "End"}
                  </Typography>
                </Box>

                {item.marks && (
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "#4b5563",
                      mt: 0.6,
                    }}
                  >
                    Marks / CGPA: {item.marks}
                  </Typography>
                )}
              </Box>
            ))
          )}
        </ResumeSection>

        <ResumeSection title="Projects">
          {projects.length === 0 ? (
            <Typography sx={{ fontSize: "0.95rem", color: "#9ca3af" }}>
              Your projects will appear here.
            </Typography>
          ) : (
            projects.map((item) => (
              <Box key={item.id} sx={{ mb: 2.5 }}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#111827",
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </Typography>

                {item.techStack && (
                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      color: "#374151",
                      mt: 0.4,
                    }}
                  >
                    {item.techStack}
                  </Typography>
                )}

                {item.description && (
                  <Typography
                    sx={{
                      fontSize: "0.94rem",
                      color: "#4b5563",
                      mt: 0.8,
                      lineHeight: 1.8,
                      textAlign: "justify",
                    }}
                  >
                    {item.description}
                  </Typography>
                )}

                {item.link && (
                  <Typography
                    sx={{
                      fontSize: "0.92rem",
                      color: "#2563eb",
                      mt: 0.8,
                      wordBreak: "break-all",
                    }}
                  >
                    {item.link}
                  </Typography>
                )}
              </Box>
            ))
          )}
        </ResumeSection>
      </Box>
    </Box>
  );
}

type ResumeSectionProps = {
  title: string;
  children: React.ReactNode;
};

function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <Box sx={{ mb: 3.5 }}>
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#111827",
          mb: 1,
        }}
      >
        {title}
      </Typography>

      <Divider
        sx={{
          mb: 1.8,
          borderColor: "#d1d5db",
        }}
      />

      {children}
    </Box>
  );
}

export default ResumePreview;