import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type StepperFormProps = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
};

const steps = [
  "Personal",
  "Education",
  "Experience",
  "Skills",
  "Projects",
];

function StepperForm({
  activeStep,
  setActiveStep,
  children,
}: StepperFormProps) {
  const isLastStep = activeStep === steps.length - 1;

  return (
    <Box>
      {/* STEP HEADER */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#111827",
            mb: 0.5,
          }}
        >
          {steps[activeStep]}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "#6b7280" }}
        >
          Step {activeStep + 1} of {steps.length}
        </Typography>
      </Box>

      {/* PREMIUM STEPPER */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          mb: 3,
          "& .MuiStepConnector-line": {
            borderColor: "#e5e7eb",
          },
        }}
      >
        {steps.map((label, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;

          return (
            <Step key={label}>
              <StepLabel
                icon={
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: 700,

                      bgcolor: isCompleted
                        ? "#dcfce7"
                        : isActive
                        ? "#dbeafe"
                        : "#f3f4f6",

                      color: isCompleted
                        ? "#16a34a"
                        : isActive
                        ? "#2563eb"
                        : "#9ca3af",

                      border: isActive
                        ? "2px solid #2563eb"
                        : "1px solid #e5e7eb",

                      transition: "0.2s",
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircleIcon sx={{ fontSize: 18 }} />
                    ) : (
                      index + 1
                    )}
                  </Box>
                }
              >
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive
                      ? "#111827"
                      : "#6b7280",
                  }}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {/* FORM CONTENT */}
      <Box sx={{ mb: 3 }}>{children}</Box>

      {/* ACTION BUTTONS */}
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Button
          disabled={activeStep === 0}
          onClick={() => setActiveStep((prev) => prev - 1)}
          sx={{
            textTransform: "none",
            borderRadius: 2.5,
            px: 2.5,
          }}
        >
          Back
        </Button>

        <Button
          variant="contained"
          onClick={() =>
            setActiveStep((prev) => prev + 1)
          }
          sx={{
            textTransform: "none",
            borderRadius: 2.5,
            px: 3,
            fontWeight: 600,
          }}
        >
          {isLastStep ? "Finish" : "Next"}
        </Button>
      </Stack>
    </Box>
  );
}

export default StepperForm;