import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import DeleteIcon from '@mui/icons-material/Delete';

import type {
  Experience,
  ExperienceFormValues,
} from "../types/types";

type ExperienceFormProps = {
  experience: Experience[];
  setExperience: React.Dispatch<React.SetStateAction<Experience[]>>;
};

const initialExperienceForm: ExperienceFormValues = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
};

function ExperienceForm({
  experience,
  setExperience,
}: ExperienceFormProps) {
  const [form, setForm] = useState<ExperienceFormValues>(
    initialExperienceForm
  );
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
    setForm(initialExperienceForm);
    setEditId(null);
  };

  const handleSave = () => {
    if (!form.company.trim() || !form.role.trim()) {
      return;
    }

    if (editId !== null) {
      setExperience((prev) =>
        prev.map((item) =>
          item.id === editId ? { id: editId, ...form } : item
        )
      );
    } else {
      const newExperience: Experience = {
        id: Date.now(),
        ...form,
      };

      setExperience((prev) => [...prev, newExperience]);
    }

    resetForm();
  };

  const handleEdit = (item: Experience) => {
    setForm({
      company: item.company,
      role: item.role,
      startDate: item.startDate,
      endDate: item.endDate,
      description: item.description,
    });
    setEditId(item.id);
  };

  const handleDelete = (id: number) => {
    setExperience((prev) => prev.filter((item) => item.id !== id));

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
        Experience
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#6b7280",
          mb: 3,
        }}
      >
        Add your work experience, role, and key responsibilities.
      </Typography>

      <Stack spacing={2.2}>
        <TextField
          fullWidth
          label="Company"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Infosys"
        />

        <TextField
          fullWidth
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="UI Developer"
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="Start Date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            placeholder="Aug 2024"
          />

          <TextField
            fullWidth
            label="End Date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            placeholder="Present"
          />
        </Stack>

        <TextField
          fullWidth
          multiline
          minRows={4}
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your responsibilities, achievements, and technologies used."
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
            {editId !== null ? "Update Experience" : "Add Experience"}
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
        Added Experience
      </Typography>

      <Stack spacing={2}>
        {experience.length === 0 ? (
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px dashed #d1d5db",
              bgcolor: "#f9fafb",
              textAlign: "center",
            }}
          >
            <WorkOutlineOutlinedIcon
              sx={{ color: "#9ca3af", fontSize: 34, mb: 1 }}
            />
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: "#374151", mb: 0.5 }}
            >
              No experience added yet
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#6b7280" }}
            >
              Add your work history above.
            </Typography>
          </Box>
        ) : (
          experience.map((item) => (
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
                sx={{alignItems:"flex-start", justifyContent:"space-between"}}
                spacing={2}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    {item.role}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#4b5563",
                      mt: 0.5,
                    }}
                  >
                    {item.company}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6b7280",
                      mt: 0.5,
                    }}
                  >
                    {item.startDate} - {item.endDate}
                  </Typography>

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
                </Box>

                <Stack direction="row" spacing={0.5}>
                  <IconButton
                    onClick={() => handleEdit(item)}
                    sx={{
                      color: "#2563eb",
                    }}
                  >
                    <EditOutlinedIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => handleDelete(item.id)}
                    sx={{
                      color: "#ef4444",
                    }}
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

export default ExperienceForm;