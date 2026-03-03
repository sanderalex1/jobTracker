import { createTheme } from "@mui/material/styles";
import { statusColors, statusColorsLight } from "./palette";
import { typography } from "./typography";
import { components } from "./components";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "rgb(251, 251, 251)" },
    secondary: { main: "rgb(69, 69, 69)" },
    background: {
      default: "rgb(30, 41, 59)",
      paper: "rgb(15, 23, 42)",
      button: "rgb(79, 70, 229)",
      card: "rgb(15, 23, 42)",
      headDashboard: "rgb(12, 18, 32)",
    },
    text: {
      primary: "rgb(251, 251, 251)",
    },
  },
  statusColors,
  typography,
  components,
  statusColorsLight,
});

export default darkTheme;
