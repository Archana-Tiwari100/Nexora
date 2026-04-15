export const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    bgcolor: "#f8fafc",
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

export const primaryButtonSx = {
  textTransform: "none",
  borderRadius: 3,
  px: 3,
  py: 1.1,
  fontWeight: 600,
  boxShadow: "none",
};

export const secondaryButtonSx = {
  textTransform: "none",
  borderRadius: 3,
  px: 3,
  py: 1.1,
  fontWeight: 500,
};

export const sectionTitleSx = {
  fontWeight: 700,
  color: "#111827",
  mb: 0.5,
};

export const sectionSubtitleSx = {
  color: "#6b7280",
  mb: 3,
};

export const cardItemSx = {
  p: 2,
  borderRadius: 3,
  border: "1px solid #e5e7eb",
  bgcolor: "#f8fafc",
};