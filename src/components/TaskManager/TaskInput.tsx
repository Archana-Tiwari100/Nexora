import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

interface TaskInputProps {
  onClickAddTask: (title: string) => void;
}

function TaskInput({ onClickAddTask }: TaskInputProps) {
  const [taskInput, setTaskInput] = useState<string>("");
  const [taskInputError, setTaskInputError] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTaskInput(value);

    if (value.trim()) {
      setTaskInputError(false);
    } else {
      setTaskInputError(true);
    }
  }

  function handleAddTask() {
    const trimmedValue = taskInput.trim();

    if (!trimmedValue) {
      setTaskInputError(true);
      return;
    }

    onClickAddTask(trimmedValue);
    setTaskInput("");
    setTaskInputError(false);
  }

  // Enter key support
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleAddTask();
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        fullWidth
        label="Enter your task"
        variant="outlined"
        value={taskInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="e.g. Finish React project"
        error={taskInputError}
        helperText={taskInputError ? "Please enter a valid task" : ""}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            bgcolor: "#fafafa",
            minHeight: 56,
          },
        }}
      />

      <Button
        variant="contained"
        onClick={handleAddTask}
        sx={{
          height: 52,
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 700,
          fontSize: "1rem",
          boxShadow: "none",
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          "&:hover": {
            background: "linear-gradient(135deg, #1d4ed8, #1e40af)",
          },
        }}
      >
        Add Task
      </Button>
    </Box>
  );
}

export default TaskInput;