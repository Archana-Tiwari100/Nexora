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
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

import type {
  Education,
  EducationFormValues,
} from "../types/types";

import {
  cardItemSx,
  inputSx,
  primaryButtonSx,
  secondaryButtonSx,
  sectionSubtitleSx,
  sectionTitleSx,
} from "../formStyles";

type EducationFormProps = {
  education: Education[];
  setEducation: React.Dispatch<React.SetStateAction<Education[]>>;
};

const initialEducationForm: EducationFormValues = {
  school: "",
  degree: "",
  fieldOfStudy: "",
  marks: "",
  startYear: "",
  endYear: "",
};

function EducationForm({
  education,
  setEducation,
}: EducationFormProps) {
  const [form, setForm] = useState<EducationFormValues>(initialEducationForm);
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
    setForm(initialEducationForm);
    setEditId(null);
  };

  const handleSave = () => {
    if (!form.school.trim() || !form.degree.trim()) return;

    if (editId !== null) {
      setEducation((prev) =>
        prev.map((item) =>
          item.id === editId ? { id: editId, ...form } : item
        )
      );
    } else {
      const newEducation: Education = {
        id: Date.now(),
        ...form,
      };

      setEducation((prev) => [...prev, newEducation]);
    }

    resetForm();
  };

  const handleEdit = (item: Education) => {
    setForm({
      school: item.school,
      degree: item.degree,
      fieldOfStudy: item.fieldOfStudy,
      marks: item.marks,
      startYear: item.startYear,
      endYear: item.endYear,
    });
    setEditId(item.id);
  };

  const handleDelete = (id: number) => {
    setEducation((prev) => prev.filter((item) => item.id !== id));

    if (editId === id) {
      resetForm();
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={sectionTitleSx}>
        Education
      </Typography>

      <Typography variant="body2" sx={sectionSubtitleSx}>
        Add your academic history with marks or CGPA.
      </Typography>

      <Stack spacing={2.2}>
        <TextField
          fullWidth
          label="School / College"
          name="school"
          value={form.school}
          onChange={handleChange}
          placeholder="XYZ University"
          sx={inputSx}
        />

        <TextField
          fullWidth
          label="Degree"
          name="degree"
          value={form.degree}
          onChange={handleChange}
          placeholder="B.Tech"
          sx={inputSx}
        />

        <TextField
          fullWidth
          label="Field of Study"
          name="fieldOfStudy"
          value={form.fieldOfStudy}
          onChange={handleChange}
          placeholder="Computer Science"
          sx={inputSx}
        />

        <TextField
          fullWidth
          label="Marks / Percentage / CGPA"
          name="marks"
          value={form.marks}
          onChange={handleChange}
          placeholder="8.2 CGPA / 85%"
          sx={inputSx}
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="Start Year"
            name="startYear"
            value={form.startYear}
            onChange={handleChange}
            placeholder="2018"
            sx={inputSx}
          />

          <TextField
            fullWidth
            label="End Year"
            name="endYear"
            value={form.endYear}
            onChange={handleChange}
            placeholder="2022"
            sx={inputSx}
          />
        </Stack>

        <Stack direction="row" spacing={1.5}>
          <Button variant="contained" onClick={handleSave} sx={primaryButtonSx}>
            {editId !== null ? "Update Education" : "Add Education"}
          </Button>

          {editId !== null && (
            <Button variant="outlined" onClick={resetForm} sx={secondaryButtonSx}>
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
        Added Education
      </Typography>

      <Stack spacing={2}>
        {education.length === 0 ? (
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px dashed #d1d5db",
              bgcolor: "#f9fafb",
              textAlign: "center",
            }}
          >
            <SchoolOutlinedIcon
              sx={{ color: "#9ca3af", fontSize: 34, mb: 1 }}
            />
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: "#374151", mb: 0.5 }}
            >
              No education added yet
            </Typography>
            <Typography variant="body2" sx={{ color: "#6b7280" }}>
              Add your academic details above.
            </Typography>
          </Box>
        ) : (
          education.map((item) => (
            <Box key={item.id} sx={cardItemSx}>
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
                    {item.degree}
                    {item.fieldOfStudy ? ` - ${item.fieldOfStudy}` : ""}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#4b5563",
                      mt: 0.5,
                    }}
                  >
                    {item.school}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6b7280",
                      mt: 0.5,
                    }}
                  >
                    {item.startYear} - {item.endYear}
                    {item.marks ? ` • ${item.marks}` : ""}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={0.5}>
                  <IconButton onClick={() => handleEdit(item)} sx={{ color: "#2563eb" }}>
                    <EditOutlinedIcon />
                  </IconButton>

                  <IconButton onClick={() => handleDelete(item.id)} sx={{ color: "#ef4444" }}>
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

export default EducationForm;