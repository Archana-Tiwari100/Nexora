import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import AppHeader from "../shared/AppHeader";
import StepperForm from "./StepperForm";
import TemplateSelector from "./TemplateSelector";

import PersonalForm from "./forms/PersonalForm";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";

import ClassicResumePreview from "./preview/ClassicResumePreview";
import ModernResumePreview from "./preview/ModernResumePreview";
import MinimalResumePreview from "./preview/MinimalResumePreview";

import useResumeStorage from "./hooks/useResumeStorage";
import type { ResumeTemplate } from "./types/types";

type ResumeBuilderProps = {
  onBack: () => void;
};

function ResumeBuilder({ onBack }: ResumeBuilderProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedTemplate, setSelectedTemplate] =
    useState<ResumeTemplate>("classic");
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const { data, setData } = useResumeStorage();
  const resumeRef = useRef<HTMLDivElement | null>(null);

  const createFileName = (fullName: string) => {
    const cleaned = fullName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    return cleaned ? `${cleaned}-resume.pdf` : "resume.pdf";
  };

  const handleDownloadPdf = async () => {
    if (!resumeRef.current) return;

    try {
      setIsExporting(true);
      await new Promise((resolve) => setTimeout(resolve, 100));

      const element = resumeRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 210;
      const pdfHeight = 297;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;

      if (imgHeight <= pdfHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
      } else {
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
      }

      pdf.save(createFileName(data.personalInfo.fullName));
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f5f7fb",
          overflow: "hidden",
        }}
      >
        <AppHeader
          title="Resume Builder"
          subtitle="Build your resume step by step with live preview."
          onBack={onBack}
          actionLabel={isExporting ? "Generating PDF..." : "Download PDF"}
          onActionClick={handleDownloadPdf}
          actionIcon={<DownloadRoundedIcon />}
          actionDisabled={isExporting}
        />

        <Box
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "460px 1fr" },
            gap: 2,
            p: 2,
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              height: 0,
              minHeight: "100%",
              p: 3,
              overflowY: "auto",
              overflowX: "hidden",
              borderRadius: 4,
              border: "1px solid #e5e7eb",
              bgcolor: "#ffffff",
              scrollbarWidth: "thin",
              scrollbarColor: "#cbd5e1 transparent",
              "&::-webkit-scrollbar": { width: "8px" },
              "&::-webkit-scrollbar-track": { background: "transparent" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#cbd5e1",
                borderRadius: "999px",
                border: "2px solid transparent",
                backgroundClip: "content-box",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#94a3b8",
              },
            }}
          >
            <StepperForm
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            >
              {activeStep === 0 && (
                <PersonalForm
                  personalInfo={data.personalInfo}
                  setPersonalInfo={(val) =>
                    setData((prev) => ({
                      ...prev,
                      personalInfo:
                        typeof val === "function"
                          ? val(prev.personalInfo)
                          : val,
                    }))
                  }
                />
              )}

              {activeStep === 1 && (
                <EducationForm
                  education={data.education}
                  setEducation={(val) =>
                    setData((prev) => ({
                      ...prev,
                      education:
                        typeof val === "function"
                          ? val(prev.education)
                          : val,
                    }))
                  }
                />
              )}

              {activeStep === 2 && (
                <ExperienceForm
                  experience={data.experience}
                  setExperience={(val) =>
                    setData((prev) => ({
                      ...prev,
                      experience:
                        typeof val === "function"
                          ? val(prev.experience)
                          : val,
                    }))
                  }
                />
              )}

              {activeStep === 3 && (
                <SkillsForm
                  skills={data.skills}
                  setSkills={(val) =>
                    setData((prev) => ({
                      ...prev,
                      skills:
                        typeof val === "function" ? val(prev.skills) : val,
                    }))
                  }
                />
              )}

              {activeStep === 4 && (
                <ProjectsForm
                  projects={data.projects}
                  setProjects={(val) =>
                    setData((prev) => ({
                      ...prev,
                      projects:
                        typeof val === "function" ? val(prev.projects) : val,
                    }))
                  }
                />
              )}
            </StepperForm>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              height: 0,
              minHeight: "100%",
              p: 3,
              overflowY: "auto",
              overflowX: "hidden",
              bgcolor: "#eef2f7",
              borderRadius: 4,
              border: "1px solid #e5e7eb",
              scrollbarWidth: "thin",
              scrollbarColor: "#cbd5e1 transparent",
              "&::-webkit-scrollbar": { width: "8px" },
              "&::-webkit-scrollbar-track": { background: "transparent" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#cbd5e1",
                borderRadius: "999px",
                border: "2px solid transparent",
                backgroundClip: "content-box",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#94a3b8",
              },
            }}
          >
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />

            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <Box ref={resumeRef}>
                {selectedTemplate === "classic" && (
                  <ClassicResumePreview
                    personalInfo={data.personalInfo}
                    education={data.education}
                    experience={data.experience}
                    skills={data.skills}
                    projects={data.projects}
                    isExporting={isExporting}
                  />
                )}

                {selectedTemplate === "modern" && (
                  <ModernResumePreview
                    personalInfo={data.personalInfo}
                    education={data.education}
                    experience={data.experience}
                    skills={data.skills}
                    projects={data.projects}
                    isExporting={isExporting}
                  />
                )}

                {selectedTemplate === "minimal" && (
                  <MinimalResumePreview
                    personalInfo={data.personalInfo}
                    education={data.education}
                    experience={data.experience}
                    skills={data.skills}
                    projects={data.projects}
                    isExporting={isExporting}
                  />
                )}
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default ResumeBuilder;