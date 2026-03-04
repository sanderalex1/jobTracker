import { createTheme } from "@mui/material/styles";
import { statusColors, statusColorsLight } from "./palette";
import { typography } from "./typography";
import { components } from "./components";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#ffffff" },
    secondary: { main: "#F1F2F6" },
    background: {
      default: "#ffffff",
      paper: "#fafafa",
      button: "rgb(79, 70, 229)",
      card: "#fafafa",
      headDashboard: "#e1e1e1",
    },
    text: {
      primary: "rgb(37, 37, 37)",
      secondary: "rgba(0, 0, 0, 0.6);",
      disabled: "#0000008f",
    },
  },
  statusColors,
  typography,
  components,
  statusColorsLight,
});

export default lightTheme;
