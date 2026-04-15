import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import type {
    Education,
    Experience,
    PersonalInfo,
    Project,
} from "../types/types";

type ClassicResumePreviewProps = {
    personalInfo: PersonalInfo;
    education: Education[];
    experience: Experience[];
    skills: string[];
    projects: Project[];
    isExporting?: boolean;
};

function ClassicResumePreview({
    personalInfo,
    education,
    experience,
    skills,
    projects,
    isExporting = false,
}: ClassicResumePreviewProps) {
    return (
        <ResumePage isExporting={isExporting}>
            <Box sx={{ textAlign: "center", mb: 3.5 }}>
                <Typography
                    sx={{
                        fontSize: "2.1rem",
                        fontWeight: 800,
                        color: "#111827",
                        letterSpacing: "0.03em",
                        textTransform: "uppercase",
                        lineHeight: 1.15,
                    }}
                >
                    {personalInfo.fullName || "Your Name"}
                </Typography>

                <Typography
                    sx={{
                        mt: 1.2,
                        fontSize: "0.92rem",
                        color: "#4b5563",
                        lineHeight: 1.8,
                    }}
                >
                    {personalInfo.email || "your.email@example.com"}
                    {"  |  "}
                    {personalInfo.phone || "+91 9876543210"}
                    {"  |  "}
                    {personalInfo.location || "Your Location"}
                </Typography>
            </Box>

            <ResumeSection title="Professional Summary">
                <Typography sx={bodyText}>
                    {personalInfo.summary ||
                        "Write a short professional summary that highlights your experience, strengths, and career goals."}
                </Typography>
            </ResumeSection>

            <ResumeSection title="Skills">
                {skills.length === 0 ? (
                    <Typography sx={placeholderText}>
                        Your skills will appear here.
                    </Typography>
                ) : (
                    <Typography sx={bodyText}>{skills.join(" • ")}</Typography>
                )}
            </ResumeSection>

            <ResumeSection title="Experience">
                {experience.length === 0 ? (
                    <Typography sx={placeholderText}>
                        Your work experience will appear here.
                    </Typography>
                ) : (
                    experience.map((item) => (
                        <Box key={item.id} sx={{ mb: 2.5 }}>
                            <TopMetaRow
                                title={item.role || "Role"}
                                subtitle={item.company || "Company"}
                                rightText={`${item.startDate || "Start"} - ${item.endDate || "End"}`}
                            />
                            {item.description && (
                                <Typography sx={{ ...bodyText, mt: 0.8 }}>
                                    {item.description}
                                </Typography>
                            )}
                        </Box>
                    ))
                )}
            </ResumeSection>

            <ResumeSection title="Education">
                {education.length === 0 ? (
                    <Typography sx={placeholderText}>
                        Your education details will appear here.
                    </Typography>
                ) : (
                    education.map((item) => (
                        <Box key={item.id} sx={{ mb: 2.5 }}>
                            <TopMetaRow
                                title={`${item.degree}${item.fieldOfStudy ? ` in ${item.fieldOfStudy}` : ""}`}
                                subtitle={item.school || "School / College"}
                                rightText={`${item.startYear || "Start"} - ${item.endYear || "End"}`}
                            />
                            {item.marks && (
                                <Typography
                                    sx={{
                                        fontSize: "0.9rem",
                                        color: "#4b5563",
                                        mt: 0.5,
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
                    <Typography sx={placeholderText}>
                        Your projects will appear here.
                    </Typography>
                ) : (
                    projects.map((item) => (
                        <Box key={item.id} sx={{ mb: 2.5 }}>
                            <Typography sx={entryTitle}>{item.title || "Project Title"}</Typography>
                            {item.techStack && (
                                <Typography
                                    sx={{
                                        fontSize: "0.92rem",
                                        color: "#374151",
                                        mt: 0.35,
                                        fontStyle: "italic",
                                    }}
                                >
                                    {item.techStack}
                                </Typography>
                            )}
                            {item.description && (
                                <Typography sx={{ ...bodyText, mt: 0.8 }}>
                                    {item.description}
                                </Typography>
                            )}
                            {item.link && (
                                <Typography
                                    sx={{
                                        fontSize: "0.9rem",
                                        color: "#1d4ed8",
                                        mt: 0.7,
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
        </ResumePage>
    );
}

function ResumePage({ children, isExporting }: { children: React.ReactNode; isExporting: boolean }) {
    return (
        <Box
            sx={{
                width: "210mm",
                minHeight: "297mm",
                bgcolor: "#ffffff",
                color: "#111827",
                boxShadow: isExporting
                    ? "none"
                    : "0 12px 32px rgba(15, 23, 42, 0.14)",
                borderRadius: "8px",
                px: { xs: 3, sm: 6 },
                py: { xs: 4, sm: 5 },
            }}
        >
            {children}
        </Box>
    );
}

function ResumeSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <Box sx={{ mb: 3.4 }}>
            <Typography
                sx={{
                    fontSize: "0.98rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#111827",
                    mb: 1,
                }}
            >
                {title}
            </Typography>
            <Divider sx={{ mb: 1.6, borderColor: "#d1d5db" }} />
            {children}
        </Box>
    );
}

function TopMetaRow({
    title,
    subtitle,
    rightText,
}: {
    title: string;
    subtitle: string;
    rightText: string;
}) {
    return (
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
                <Typography sx={entryTitle}>{title}</Typography>
                <Typography
                    sx={{
                        fontSize: "0.93rem",
                        color: "#374151",
                        mt: 0.3,
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>

            <Typography
                sx={{
                    fontSize: "0.88rem",
                    color: "#6b7280",
                    whiteSpace: "nowrap",
                }}
            >
                {rightText}
            </Typography>
        </Box>
    );
}

const entryTitle = {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#111827",
    lineHeight: 1.4,
};

const bodyText = {
    fontSize: "0.94rem",
    color: "#4b5563",
    lineHeight: 1.8,
    textAlign: "justify",
};

const placeholderText = {
    fontSize: "0.94rem",
    color: "#9ca3af",
};

export default ClassicResumePreview;