import { useState } from "react";
import Box from "@mui/material/Box";
import LandingPage from "./components/LandingPage/LandingPage";
import ResumeBuilder from "./components/ResumeBuilder/ResumeBuilder";
import TaskManager from "./components/TaskManager/TaskManager";
import VoiceReminder from "./components/VoiceReminder/VoiceReminder";

type ProjectKey = "landing" | "task-manager" | "resume-builder" | "voice-reminder";

function App() {
  const [activeProject, setActiveProject] = useState<ProjectKey>("landing");

  const handleBackToHome = () => {
    setActiveProject("landing");
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {activeProject === "landing" && (
        <LandingPage onNavigate={setActiveProject} />
      )}

      {activeProject === "task-manager" && (
        <TaskManager onBack={handleBackToHome} />
      )}

      {activeProject === "resume-builder" && (
        <ResumeBuilder onBack={handleBackToHome} />
      )}
      {activeProject === "voice-reminder" && (
        <VoiceReminder onBack={handleBackToHome} />
      )}
    </Box>
  );
}

export default App;