import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import type { PersonalInfo } from "../types/types";
import {
  inputSx,
  sectionSubtitleSx,
  sectionTitleSx,
} from "../formStyles";

type PersonalFormProps = {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
};

function PersonalForm({
  personalInfo,
  setPersonalInfo,
}: PersonalFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box>
      <Typography variant="h5" sx={sectionTitleSx}>
        Personal Information
      </Typography>

      <Typography variant="body2" sx={sectionSubtitleSx}>
        Add your main profile and contact details.
      </Typography>

      <Stack spacing={2.2}>
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          value={personalInfo.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          sx={inputSx}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={personalInfo.email}
          onChange={handleChange}
          placeholder="john@example.com"
          sx={inputSx}
        />

        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          placeholder="+91 9876543210"
          sx={inputSx}
        />

        <TextField
          fullWidth
          label="Location"
          name="location"
          value={personalInfo.location}
          onChange={handleChange}
          placeholder="Bengaluru, India"
          sx={inputSx}
        />

        <TextField
          fullWidth
          multiline
          minRows={4}
          label="Professional Summary"
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          placeholder="Write a short summary about your profile, strengths, and career direction."
          sx={inputSx}
        />
      </Stack>
    </Box>
  );
}

export default PersonalForm;