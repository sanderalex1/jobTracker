import { styled } from "@mui/material/styles";
import { TableCell, tableCellClasses, TextField } from "@mui/material";
import type { Theme } from "@mui/material/styles";

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

export const StyledTableCell = styled(TableCell)(
  ({ theme }: { theme: Theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.background.headDashboard,
      color: theme.palette.text.primary,
      fontSize: theme.typography.h4.fontSize,
      fontWeight: theme.typography.h4.fontWeight,
      lineHeight: theme.typography.h4.lineHeight,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: theme.typography.body1.fontSize,
      fontWeight: theme.typography.body1.fontWeight,
      lineHeight: theme.typography.body1.lineHeight,
    },
  }),
);
