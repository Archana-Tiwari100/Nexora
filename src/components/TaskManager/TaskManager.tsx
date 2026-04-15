import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import AppHeader from "../shared/AppHeader";
import Home from "./Home";
import Footer from "./Footer";

type TaskManagerProps = {
  onBack: () => void;
};

function TaskManager({ onBack }: TaskManagerProps) {
  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f6f8fb",
        }}
      >
        <AppHeader
          title="Task Manager"
          subtitle="Organize your work in a clean and productive way."
          onBack={onBack}
        />

        <Box component="main" sx={{ flex: 1 }}>
          <Home />
        </Box>

        <Footer />
      </Box>
    </>
  );
}

export default TaskManager;