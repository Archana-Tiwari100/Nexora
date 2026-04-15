import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TaskItem from "./TaskItem";
import type { Task } from "./types/task";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, newTitle: string) => void;
}

function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}: TaskListProps) {
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 700,
          color: "#111827",
        }}
      >
        Your Tasks
      </Typography>

      {tasks.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            border: "1px dashed #d1d5db",
            bgcolor: "#f9fafb",
          }}
        >
          <Typography variant="h6" sx={{ color: "#374151", mb: 1 }}>
            No tasks available
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            Add your first task to get started.
          </Typography>
        </Paper>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default TaskList;