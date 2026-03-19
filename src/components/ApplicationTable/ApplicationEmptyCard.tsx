import { Box, Typography } from "@mui/material";
import WorkOffIcon from "@mui/icons-material/WorkOff";
import { cardWrapperStyles } from "./styles";

const ApplicationEmptyCard = () => {
  return (
    <Box sx={cardWrapperStyles}>
      <WorkOffIcon sx={{ fontSize: "128px" }} />
      <Typography variant="h2">No applications yet</Typography>
      <Typography variant="body2">
        Click "Add Application" to get started tracking your job search
      </Typography>
    </Box>
  );
};

export default ApplicationEmptyCard;
