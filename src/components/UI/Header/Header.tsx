import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AddIcon from "@mui/icons-material/Add";
import LightModeIcon from "@mui/icons-material/LightMode";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useThemeMode } from "../../../theme/AppThemeProvider";

const Header = () => {
  const theme = useTheme();
  const { toggleTheme, darkMode } = useThemeMode();
  return (
    <Box
      sx={{
        py: 2.5,
        px: 8,
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: "divider",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "center",
        }}
      >
        <WorkOutlineIcon fontSize="large" />
        <Typography variant="h2">JobTrack</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
        }}
      >
        <IconButton
          onClick={toggleTheme}
          sx={{ color: theme.palette.text.primary }}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Button
          sx={{
            backgroundColor: theme.palette.background.button,
            borderRadius: "1rem",
            pr: "1rem",
            display: "flex",
            gap: 1,
          }}
        >
          <AddIcon />
          <Typography variant="button" sx={{ textTransform: "capitalize" }}>
            Add Application
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
