import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type {
    Education,
    Experience,
    PersonalInfo,
    Project,
} from "../types/types";

type MinimalResumePreviewProps = {
    personalInfo: PersonalInfo;
    education: Education[];
    experience: Experience[];
    skills: string[];
    projects: Project[];
    isExporting?: boolean;
};

function MinimalResumePreview({
    personalInfo,
    education,
    experience,
    skills,
    projects,
    isExporting = false,
}: MinimalResumePreviewProps) {
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
                px: 5,
                py: 5,
            }}
        >
            <Typography
                sx={{
                    fontSize: "1.85rem",
                    fontWeight: 800,
                    lineHeight: 1.2,
                    color: "#111827",
                }}
            >
                {personalInfo.fullName || "Your Name"}
            </Typography>

            <Typography
                sx={{
                    mt: 0.7,
                    fontSize: "0.9rem",
                    color: "#6b7280",
                    lineHeight: 1.7,
                }}
            >
                {personalInfo.email || "your.email@example.com"} •{" "}
                {personalInfo.phone || "+91 9876543210"} •{" "}
                {personalInfo.location || "Your Location"}
            </Typography>

            <ThinSection title="Summary">
                <Typography sx={minimalText}>
                    {personalInfo.summary ||
                        "Write a short professional summary that highlights your experience, strengths, and career goals."}
                </Typography>
            </ThinSection>

            <ThinSection title="Skills">
                <Typography sx={minimalText}>
                    {skills.length === 0 ? "Your skills will appear here." : skills.join(", ")}
                </Typography>
            </ThinSection>

            <ThinSection title="Experience">
                {experience.length === 0 ? (
                    <Typography sx={minimalPlaceholder}>
                        Your work experience will appear here.
                    </Typography>
                ) : (
                    experience.map((item) => (
                        <Box key={item.id} sx={{ mb: 2.1 }}>
                            <Typography sx={minimalTitle}>
                                {item.role} — {item.company}
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
                                <Typography sx={{ ...minimalText, mt: 0.65 }}>
                                    {item.description}
                                </Typography>
                            )}
                        </Box>
                    ))
                )}
            </ThinSection>

            <ThinSection title="Education">
                {education.length === 0 ? (
                    <Typography sx={minimalPlaceholder}>
                        Your education details will appear here.
                    </Typography>
                ) : (
                    education.map((item) => (
                        <Box key={item.id} sx={{ mb: 2.1 }}>
                            <Typography sx={minimalTitle}>
                                {item.degree}
                                {item.fieldOfStudy ? ` in ${item.fieldOfStudy}` : ""}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "0.9rem",
                                    color: "#4b5563",
                                    mt: 0.25,
                                }}
                            >
                                {item.school}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "0.86rem",
                                    color: "#6b7280",
                                    mt: 0.25,
                                }}
                            >
                                {item.startYear || "Start"} - {item.endYear || "End"}
                                {item.marks ? ` • ${item.marks}` : ""}
                            </Typography>
                        </Box>
                    ))
                )}
            </ThinSection>

            <ThinSection title="Projects">
                {projects.length === 0 ? (
                    <Typography sx={minimalPlaceholder}>
                        Your projects will appear here.
                    </Typography>
                ) : (
                    projects.map((item) => (
                        <Box key={item.id} sx={{ mb: 2.1 }}>
                            <Typography sx={minimalTitle}>{item.title}</Typography>
                            {item.techStack && (
                                <Typography
                                    sx={{
                                        fontSize: "0.9rem",
                                        color: "#4b5563",
                                        mt: 0.25,
                                    }}
                                >
                                    {item.techStack}
                                </Typography>
                            )}
                            {item.description && (
                                <Typography sx={{ ...minimalText, mt: 0.65 }}>
                                    {item.description}
                                </Typography>
                            )}
                            {item.link && (
                                <Typography
                                    sx={{
                                        fontSize: "0.88rem",
                                        color: "#1d4ed8",
                                        mt: 0.6,
                                        wordBreak: "break-all",
                                    }}
                                >
                                    {item.link}
                                </Typography>
                            )}
                        </Box>
                    ))
                )}
            </ThinSection>
        </Box>
    );
}

function ThinSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <Box sx={{ mt: 3 }}>
            <Typography
                sx={{
                    fontSize: "0.9rem",
                    fontWeight: 800,
                    color: "#111827",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    mb: 0.9,
                    borderBottom: "1px solid #e5e7eb",
                    pb: 0.5,
                }}
            >
                {title}
            </Typography>
            {children}
        </Box>
    );
}

const minimalTitle = {
    fontSize: "0.98rem",
    fontWeight: 700,
    color: "#111827",
};

const minimalText = {
    fontSize: "0.92rem",
    color: "#4b5563",
    lineHeight: 1.75,
};

const minimalPlaceholder = {
    fontSize: "0.92rem",
    color: "#9ca3af",
};

export default MinimalResumePreview;