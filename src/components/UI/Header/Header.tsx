import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AddIcon from "@mui/icons-material/Add";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeMode } from "../../../theme/AppThemeProvider";

const Header = () => {
  const theme = useTheme();
  const { toggleTheme, darkMode } = useThemeMode();
  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "2px solid",
        borderColor: theme.palette.text.primary,
        alignItems: "center",
      }}
    >
      <Typography variant="h2">JobTrack</Typography>
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
