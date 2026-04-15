import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Task } from "./types/task";

interface TaskProps {
  task: Task;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (id: number, newTitle: string) => void;
}

function TaskItem({
  task,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editError, setEditError] = useState(false);

  function handleSaveEdit() {
    const trimmedValue = editedTitle.trim();

    if (!trimmedValue) {
      setEditError(true);
      return;
    }

    onEditTask(task.id, trimmedValue);
    setIsEditing(false);
    setEditError(false);
  }

  function handleCancelEdit() {
    setEditedTitle(task.title);
    setIsEditing(false);
    setEditError(false);
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        bgcolor: "#ffffff",
        transition: "0.2s",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        },
      }}
    >
      {isEditing ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            value={editedTitle}
            onChange={(e) => {
              setEditedTitle(e.target.value);
              if (e.target.value.trim()) {
                setEditError(false);
              }
            }}
            error={editError}
            helperText={editError ? "Please enter a valid task title" : ""}
            label="Edit Task"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "#fafafa",
              },
            }}
          />

          <StackButtons
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flex: 1,
              minWidth: 0,
            }}
          >
            <Checkbox
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
              sx={{
                color: "#1976d2",
                "&.Mui-checked": {
                  color: "#2e7d32",
                },
              }}
            />

            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: task.completed ? "#9ca3af" : "#111827",
                wordBreak: "break-word",
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Chip
              label={task.completed ? "Completed" : "Pending"}
              color={task.completed ? "success" : "warning"}
              sx={{
                fontWeight: 600,
                borderRadius: 2,
              }}
            />

            <IconButton
              onClick={() => setIsEditing(true)}
              sx={{
                color: "#2563eb",
                "&:hover": {
                  bgcolor: "#dbeafe",
                },
              }}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              onClick={() => onDeleteTask(task.id)}
              sx={{
                color: "#ef4444",
                "&:hover": {
                  bgcolor: "#fee2e2",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Paper>
  );
}

interface StackButtonsProps {
  onSave: () => void;
  onCancel: () => void;
}

function StackButtons({ onSave, onCancel }: StackButtonsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Button
        variant="contained"
        onClick={onSave}
        sx={{
          textTransform: "none",
          borderRadius: 3,
          fontWeight: 600,
        }}
      >
        Save
      </Button>

      <Button
        variant="outlined"
        onClick={onCancel}
        sx={{
          textTransform: "none",
          borderRadius: 3,
          fontWeight: 600,
        }}
      >
        Cancel
      </Button>
    </Box>
  );
}

export default TaskItem;