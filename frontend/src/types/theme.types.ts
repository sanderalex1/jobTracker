import "@mui/material/styles";
import type { statusColors, statusColorsLight } from "../theme/palette";

type StatusColors = typeof statusColors;
type StatusColorsLight = typeof statusColorsLight;

declare module "@mui/material/styles" {
  interface Theme {
    statusColors: StatusColors;
    statusColorsLight: StatusColorsLight;
  }

  interface ThemeOptions {
    statusColors?: StatusColors;
    statusColorsLight?: StatusColorsLight;
  }

  interface TypeBackground {
    button?: string;
    card?: string;
    headDashboard?: string;
  }

  interface PaletteOptions {
    background?: Partial<TypeBackground>;
  }
}
