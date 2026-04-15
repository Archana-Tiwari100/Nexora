import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import type { SlideProps } from "@mui/material/Slide";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ChecklistIcon from "@mui/icons-material/Checklist";

import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import type { Task } from "./types/task";
import useLocalStorageTasks from "./hooks/useLocalStorageTasks";

type FilterType = "all" | "completed" | "pending";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function Home() {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { tasks, setTasks } = useLocalStorageTasks();

  const [filter, setFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastOpen(true);
  };

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    showToast("Task added successfully");
  };

  const handleToggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    showToast("Task updated successfully");
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    showToast("Task deleted successfully");
  };

  const handleEditTask = (id: number, newTitle: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
    showToast("Task edited successfully");
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "completed"
        ? task.completed
        : filter === "pending"
        ? !task.completed
        : true;

    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px - 56px)",
        display: "flex",
        alignItems: "center",
        py: 2,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "360px 1fr" },
            gap: 2,
            height: { lg: "calc(100vh - 64px - 56px - 32px)" },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid #e5e7eb",
              bgcolor: "#ffffff",
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: { xs: "auto", lg: "100%" },
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#111827",
                  mb: 0.5,
                }}
              >
                Add Task
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#6b7280",
                  mb: 3,
                }}
              >
                Add and organize your work quickly.
              </Typography>

              <Box
                sx={{
                  "& .MuiTextField-root .MuiOutlinedInput-root": {
                    minHeight: 56,
                    borderRadius: 3,
                    bgcolor: "#fafafa",
                  },
                  "& .MuiButton-root": {
                    minHeight: 56,
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
                  },
                }}
              >
                <TaskInput onClickAddTask={handleAddTask} />
              </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#94a3b8",
                  textAlign: "center",
                }}
              >
                Stay focused. Finish one task at a time.
              </Typography>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid #e5e7eb",
              bgcolor: "#ffffff",
              p: 3,
              display: "flex",
              flexDirection: "column",
              minHeight: { xs: "auto", lg: "100%" },
              overflow: "hidden",
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#111827",
                  mb: 0.5,
                }}
              >
                Task Dashboard
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#6b7280",
                }}
              >
                Track your progress and manage all tasks from one place.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
                gap: 2,
                mb: 2,
              }}
            >
              <TextField
                fullWidth
                label="Search Tasks"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by task title"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#fafafa",
                    minHeight: 54,
                  },
                }}
              />

              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  width: "100%",
                  justifyContent: { xs: "stretch", md: "flex-end" },
                }}
              >
                <Button
                  fullWidth
                  variant={filter === "all" ? "contained" : "outlined"}
                  color="info"
                  onClick={() => setFilter("all")}
                  sx={{
                    textTransform: "none",
                    borderRadius: 3,
                    fontWeight: 600,
                    minHeight: 54,
                  }}
                >
                  All
                </Button>

                <Button
                  fullWidth
                  variant={filter === "completed" ? "contained" : "outlined"}
                  color="success"
                  onClick={() => setFilter("completed")}
                  sx={{
                    textTransform: "none",
                    borderRadius: 3,
                    fontWeight: 600,
                    minHeight: 54,
                  }}
                >
                  Done
                </Button>

                <Button
                  fullWidth
                  variant={filter === "pending" ? "contained" : "outlined"}
                  color="error"
                  onClick={() => setFilter("pending")}
                  sx={{
                    textTransform: "none",
                    borderRadius: 3,
                    fontWeight: 600,
                    minHeight: 54,
                  }}
                >
                  Pending
                </Button>
              </Stack>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1.5,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  p: 1.75,
                  borderRadius: 3,
                  bgcolor: "#eef6ff",
                  border: "1px solid #dbeafe",
                  textAlign: "center",
                }}
              >
                <ChecklistIcon color="info" sx={{ fontSize: 26, mb: 0.5 }} />
                <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                  {tasks.length}
                </Typography>
                <Typography variant="caption" sx={{ color: "#475569" }}>
                  Total
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 1.75,
                  borderRadius: 3,
                  bgcolor: "#edfdf3",
                  border: "1px solid #ccebd7",
                  textAlign: "center",
                }}
              >
                <CheckCircleIcon
                  color="success"
                  sx={{ fontSize: 26, mb: 0.5 }}
                />
                <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                  {completedTasks}
                </Typography>
                <Typography variant="caption" sx={{ color: "#475569" }}>
                  Done
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 1.75,
                  borderRadius: 3,
                  bgcolor: "#fff4f4",
                  border: "1px solid #ffe0e0",
                  textAlign: "center",
                }}
              >
                <ScheduleIcon color="error" sx={{ fontSize: 26, mb: 0.5 }} />
                <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                  {pendingTasks}
                </Typography>
                <Typography variant="caption" sx={{ color: "#475569" }}>
                  Pending
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                overflow: "auto",
                pr: 0.5,
              }}
            >
              <TaskList
                tasks={filteredTasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
              />
            </Box>
          </Paper>
        </Box>
      </Container>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        slots={{ transition: SlideTransition }}
        sx={{
          "&.MuiSnackbar-root": {
            top: "20px",
            right: "20px",
          },
        }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          variant="filled"
          sx={{
            minWidth: "260px",
            borderRadius: 3,
            fontWeight: 600,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1.2,
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Home;