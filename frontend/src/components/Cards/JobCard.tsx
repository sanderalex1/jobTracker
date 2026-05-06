import { Box, Button, Chip, Typography } from "@mui/material";

const JobCard = () => {
  return (
    <Box sx={{ p: 8 }}>
      <Box>
        <Typography variant="h3"></Typography>
      </Box>
      <Box>
        <Chip></Chip>
        <Button></Button>
      </Box>
    </Box>
  );
};

export default JobCard;
