import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "1rem",
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2", // focus color
      borderWidth: "2px", // optional: make it thicker
    },
  },
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: "#1976d2",
  },
}));
