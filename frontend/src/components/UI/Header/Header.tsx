import {
  Box,
  Button,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AddIcon from "@mui/icons-material/Add";
import LightModeIcon from "@mui/icons-material/LightMode";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useThemeMode } from "../../../theme/AppThemeProvider";
import { useAppContext } from "../../../context/ApplicationContext";

const Header = () => {
  const theme = useTheme();
  const { toggleTheme, darkMode } = useThemeMode();
  const {
    action: { handleOpen },
  } = useAppContext();

  const pages = [
    { page: "Tracker", href: "/" },
    { page: "Job Board", href: "/jobs" },
  ];

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
        <Box>
          {pages.map((p) => (
            <Button
              key={p.href}
              sx={{
                overflow: "visible",
                paddingBottom: "8px",
                "& .MuiTouchRipple-root": { color: "rgb(79, 70, 229)" },
              }}
            >
              <NavLink
                to={p.href}
                style={({ isActive }) => ({
                  color: isActive ? "rgb(79, 70, 229)" : "rgb(37, 37, 37)",
                  textDecoration: "none",
                  borderBottom: isActive ? "2px solid currentColor" : "none",
                  textTransform: "capitalize",
                  padding: "0.5rem",
                })}
              >
                {p.page}
              </NavLink>
            </Button>
          ))}
        </Box>
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
          <Typography
            variant="button"
            sx={{ textTransform: "capitalize" }}
            onClick={handleOpen}
          >
            Add Application
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
