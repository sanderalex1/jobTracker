import { Box, Typography, useTheme } from "@mui/material";
import WorkOffIcon from "@mui/icons-material/WorkOff";

const ApplicationEmptyCard = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        border: "1px solid",
        borderRadius: 4,
        borderColor: theme.palette.divider,
        width: "100%",
        height: "100%",
        padding: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        color: theme.palette.text.disabled,
      }}
    >
      <WorkOffIcon sx={{ fontSize: "128px" }} />
      <Typography variant="h2">No applications yet</Typography>
      <Typography variant="body2">
        Click "Add Application" to get started tracking your job search
      </Typography>
    </Box>
  );
};

export default ApplicationEmptyCard;
