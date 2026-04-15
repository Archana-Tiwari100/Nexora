import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";

import type {
  Project,
  ProjectFormValues,
} from "../types/types";

type ProjectsFormProps = {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};

const initialProjectForm: ProjectFormValues = {
  title: "",
  techStack: "",
  description: "",
  link: "",
};

function ProjectsForm({
  projects,
  setProjects,
}: ProjectsFormProps) {
  const [form, setForm] = useState<ProjectFormValues>(initialProjectForm);
  const [editId, setEditId] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialProjectForm);
    setEditId(null);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;

    if (editId !== null) {
      setProjects((prev) =>
        prev.map((item) =>
          item.id === editId ? { id: editId, ...form } : item
        )
      );
    } else {
      const newProject: Project = {
        id: Date.now(),
        ...form,
      };

      setProjects((prev) => [...prev, newProject]);
    }

    resetForm();
  };

  const handleEdit = (item: Project) => {
    setForm({
      title: item.title,
      techStack: item.techStack,
      description: item.description,
      link: item.link,
    });
    setEditId(item.id);
  };

  const handleDelete = (id: number) => {
    setProjects((prev) => prev.filter((item) => item.id !== id));

    if (editId === id) {
      resetForm();
    }
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "#111827",
          mb: 0.5,
        }}
      >
        Projects
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#6b7280",
          mb: 3,
        }}
      >
        Add your projects, tech stack, description, and project link.
      </Typography>

      <Stack spacing={2.2}>
        <TextField
          fullWidth
          label="Project Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Resume Builder App"
        />

        <TextField
          fullWidth
          label="Tech Stack"
          name="techStack"
          value={form.techStack}
          onChange={handleChange}
          placeholder="React, TypeScript, MUI"
        />

        <TextField
          fullWidth
          multiline
          minRows={4}
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe what the project does and your contribution."
        />

        <TextField
          fullWidth
          label="Project Link"
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="https://github.com/username/project"
        />

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              textTransform: "none",
              borderRadius: 3,
              px: 3,
              fontWeight: 600,
            }}
          >
            {editId !== null ? "Update Project" : "Add Project"}
          </Button>

          {editId !== null && (
            <Button
              variant="outlined"
              onClick={resetForm}
              sx={{
                textTransform: "none",
                borderRadius: 3,
                px: 3,
              }}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          color: "#111827",
          mb: 2,
        }}
      >
        Added Projects
      </Typography>

      <Stack spacing={2}>
        {projects.length === 0 ? (
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px dashed #d1d5db",
              bgcolor: "#f9fafb",
              textAlign: "center",
            }}
          >
            <FolderOpenOutlinedIcon
              sx={{ color: "#9ca3af", fontSize: 34, mb: 1 }}
            />
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: "#374151", mb: 0.5 }}
            >
              No projects added yet
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#6b7280" }}
            >
              Add your best projects above.
            </Typography>
          </Box>
        ) : (
          projects.map((item) => (
            <Box
              key={item.id}
              sx={{
                p: 2,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                bgcolor: "#fafafa",
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    {item.title}
                  </Typography>

                  {item.techStack && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#4b5563",
                        mt: 0.5,
                      }}
                    >
                      {item.techStack}
                    </Typography>
                  )}

                  {item.description && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#4b5563",
                        mt: 1,
                        lineHeight: 1.7,
                      }}
                    >
                      {item.description}
                    </Typography>
                  )}

                  {item.link && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#2563eb",
                        mt: 1,
                        wordBreak: "break-all",
                      }}
                    >
                      {item.link}
                    </Typography>
                  )}
                </Box>

                <Stack direction="row" spacing={0.5}>
                  <IconButton
                    onClick={() => handleEdit(item)}
                    sx={{ color: "#2563eb" }}
                  >
                    <EditOutlinedIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => handleDelete(item.id)}
                    sx={{ color: "#ef4444" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
}

export default ProjectsForm;