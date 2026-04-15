import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import RecordVoiceOverRoundedIcon from "@mui/icons-material/RecordVoiceOverRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import SnoozeRoundedIcon from "@mui/icons-material/SnoozeRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import type { Reminder } from "./types/types";

type ReminderListProps = {
  reminders: Reminder[];
  onDeleteReminder: (id: number) => void;
  onSnoozeReminder: (id: number) => void;
};

function ReminderList({
  reminders,
  onDeleteReminder,
  onSnoozeReminder,
}: ReminderListProps) {
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
        Upcoming Reminders
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#6b7280",
          mb: 3,
          lineHeight: 1.7,
        }}
      >
        Your scheduled speaking reminders will appear here with repeat mode and status.
      </Typography>

      {reminders.length === 0 ? (
        <Box
          sx={{
            minHeight: 320,
            display: "grid",
            placeItems: "center",
            borderRadius: 4,
            border: "1px dashed #d1d5db",
            bgcolor: "#f8fafc",
            p: 3,
            textAlign: "center",
          }}
        >
          <Box>
            <Box
              sx={{
                width: 72,
                height: 72,
                mx: "auto",
                mb: 2,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                bgcolor: "#eef2ff",
                color: "#4f46e5",
              }}
            >
              <NotificationsActiveRoundedIcon sx={{ fontSize: 34 }} />
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#111827",
                mb: 1,
              }}
            >
              No reminders yet
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#6b7280",
                maxWidth: 340,
                mx: "auto",
                lineHeight: 1.7,
                mb: 2,
              }}
            >
              Add your first reminder from the left panel. It will appear here
              with time, message, voice, and repeat settings.
            </Typography>

            <Chip
              label="Voice reminders will be listed here"
              sx={{
                bgcolor: "#ffffff",
                border: "1px solid #e5e7eb",
                color: "#475569",
              }}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {reminders.map((reminder) => (
            <Box
              key={reminder.id}
              sx={{
                p: 2.2,
                borderRadius: 4,
                border: "1px solid #e5e7eb",
                bgcolor: "#ffffff",
                boxShadow: "0 8px 20px rgba(15,23,42,0.04)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 2,
                  mb: 1.2,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#111827",
                    lineHeight: 1.5,
                    flex: 1,
                  }}
                >
                  {reminder.message}
                </Typography>

                <IconButton
                  onClick={() => onDeleteReminder(reminder.id)}
                  sx={{
                    color: "#ef4444",
                  }}
                >
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  mb: 1.5,
                }}
              >
                <Chip
                  icon={<AccessTimeRoundedIcon />}
                  label={reminder.time}
                  size="small"
                  sx={{
                    bgcolor: "#f8fafc",
                    border: "1px solid #e5e7eb",
                  }}
                />

                <Chip
                  icon={<RecordVoiceOverRoundedIcon />}
                  label={reminder.voice}
                  size="small"
                  sx={{
                    bgcolor: "#f8fafc",
                    border: "1px solid #e5e7eb",
                    textTransform: "capitalize",
                  }}
                />

                <Chip
                  icon={<RepeatRoundedIcon />}
                  label={reminder.repeat}
                  size="small"
                  sx={{
                    bgcolor: "#f8fafc",
                    border: "1px solid #e5e7eb",
                    textTransform: "capitalize",
                  }}
                />

                <Chip
                  label={reminder.triggered ? "Triggered" : "Pending"}
                  size="small"
                  color={reminder.triggered ? "success" : "warning"}
                  sx={{
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Button
                variant="outlined"
                size="small"
                startIcon={<SnoozeRoundedIcon />}
                onClick={() => onSnoozeReminder(reminder.id)}
                sx={{
                  textTransform: "none",
                  borderRadius: 3,
                  fontWeight: 600,
                }}
              >
                Snooze 5 min
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ReminderList;