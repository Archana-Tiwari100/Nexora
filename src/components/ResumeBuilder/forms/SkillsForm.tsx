import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

type SkillsFormProps = {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
};

function SkillsForm({ skills, setSkills }: SkillsFormProps) {
  const [skillInput, setSkillInput] = useState<string>("");

  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();

    if (!trimmedSkill) return;
    if (skills.includes(trimmedSkill)) return;

    setSkills((prev) => [...prev, trimmedSkill]);
    setSkillInput("");
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToDelete));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
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
        Skills
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#6b7280",
          mb: 3,
        }}
      >
        Add your key technical and professional skills.
      </Typography>

      <Stack spacing={2.2}>
        <TextField
          fullWidth
          label="Add Skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="React, TypeScript, CSS, Communication"
        />

        <Button
          variant="contained"
          onClick={handleAddSkill}
          sx={{
            textTransform: "none",
            borderRadius: 3,
            px: 3,
            fontWeight: 600,
            alignSelf: "flex-start",
          }}
        >
          Add Skill
        </Button>
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
        Added Skills
      </Typography>

      {skills.length === 0 ? (
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px dashed #d1d5db",
            bgcolor: "#f9fafb",
            textAlign: "center",
          }}
        >
          <LightbulbOutlinedIcon
            sx={{ color: "#9ca3af", fontSize: 34, mb: 1 }}
          />
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, color: "#374151", mb: 0.5 }}
          >
            No skills added yet
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#6b7280" }}
          >
            Add your important skills above.
          </Typography>
        </Box>
      ) : (
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              onDelete={() => handleDeleteSkill(skill)}
              sx={{
                borderRadius: 2.5,
                fontWeight: 500,
                bgcolor: "#eef2ff",
                color: "#3730a3",
                border: "1px solid #c7d2fe",
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default SkillsForm;