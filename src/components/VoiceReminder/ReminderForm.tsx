import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import AddAlertRoundedIcon from "@mui/icons-material/AddAlertRounded";
import type { ReminderRepeat, ReminderVoice } from "./types/types";

type ReminderFormProps = {
  onAddReminder: (
    message: string,
    time: string,
    voice: ReminderVoice,
    repeat: ReminderRepeat
  ) => void;
};

const voiceOptions: { value: ReminderVoice; label: string }[] = [
  { value: "default", label: "Default Voice" },
  { value: "calm", label: "Calm Voice" },
  { value: "motivational", label: "Motivational Voice" },
  { value: "friendly", label: "Friendly Voice" },
];

const repeatOptions: { value: ReminderRepeat; label: string }[] = [
  { value: "none", label: "One Time" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
];

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    bgcolor: "rgba(248,250,252,0.9)",
    transition: "all 0.2s ease",
    "& fieldset": {
      borderColor: "#e5e7eb",
    },
    "&:hover fieldset": {
      borderColor: "#cbd5e1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2563eb",
      borderWidth: "1.5px",
    },
  },
};

function ReminderForm({ onAddReminder }: ReminderFormProps) {
  const [message, setMessage] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [voice, setVoice] = useState<ReminderVoice>("default");
  const [repeat, setRepeat] = useState<ReminderRepeat>("none");

  const getPreviewSpeech = () => {
    const base = message || "Hey, it is time to complete your reminder.";

    switch (voice) {
      case "calm":
        return `Gentle reminder. ${base}`;
      case "motivational":
        return `Let's go. ${base} You can do it.`;
      case "friendly":
        return `Hey, just a quick reminder. ${base}`;
      default:
        return base;
    }
  };

  const handleAdd = () => {
    onAddReminder(message, time, voice, repeat);
    setMessage("");
    setTime("");
    setVoice("default");
    setRepeat("none");
  };

  const handlePreviewVoice = () => {
    const utterance = new SpeechSynthesisUtterance(getPreviewSpeech());
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          color: "#111827",
          mb: 0.5,
        }}
      >
        Add Reminder
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#6b7280",
          mb: 3,
          lineHeight: 1.7,
        }}
      >
        Create voice reminders with schedule, repeat mode, and speaking style.
      </Typography>

      <Stack spacing={2.2}>
        <TextField
          fullWidth
          label="Reminder Message"
          placeholder="Drink water, start workout, attend meeting..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={inputSx}
        />

        <TextField
          fullWidth
          type="time"
          label="Reminder Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          variant="outlined"
          slotProps={{
            inputLabel: { shrink: true },
          }}
          sx={inputSx}
        />

        <TextField
          fullWidth
          select
          label="Voice Type"
          value={voice}
          onChange={(e) => setVoice(e.target.value as ReminderVoice)}
          sx={inputSx}
        >
          {voiceOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          select
          label="Repeat"
          value={repeat}
          onChange={(e) => setRepeat(e.target.value as ReminderRepeat)}
          sx={inputSx}
        >
          {repeatOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ pt: 1 }}
        >
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddAlertRoundedIcon />}
            onClick={handleAdd}
            sx={{
              textTransform: "none",
              borderRadius: 3,
              py: 1.25,
              fontWeight: 700,
              boxShadow: "none",
            }}
          >
            Add Reminder
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<VolumeUpRoundedIcon />}
            onClick={handlePreviewVoice}
            sx={{
              textTransform: "none",
              borderRadius: 3,
              py: 1.25,
              fontWeight: 600,
            }}
          >
            Preview Voice
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={{
          mt: 4,
          p: 2.2,
          borderRadius: 4,
          background:
            "linear-gradient(135deg, rgba(239,246,255,1), rgba(238,242,255,1))",
          border: "1px solid #dbeafe",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: "#1d4ed8",
            mb: 0.5,
          }}
        >
          Example Reminder
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#475569",
            lineHeight: 1.7,
          }}
        >
          “Hey, it’s time to drink water and stay fresh.”
        </Typography>
      </Box>
    </Box>
  );
}

export default ReminderForm;