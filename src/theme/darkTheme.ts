import { createTheme } from "@mui/material/styles";
import { statusColors } from "./palette";
import { typography } from "./typography";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "rgb(251, 251, 251)" },
    secondary: { main: "rgb(69, 69, 69)" },
    background: {
      default: "#030213",
      paper: "#212121",
      button: "rgb(79, 70, 229)",
      card: "",
    },
    text: {
      primary: "rgb(251, 251, 251)",
    },
  },
  statusColors,
  typography,
});

export default darkTheme;
