import { Box, Container, Typography } from "@mui/material";

const JobBoard = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, py: 4 }}>
        <Typography variant="h1">Job Board</Typography>
        <Typography variant="body1">
          Browse scraped job listings and add them to your tracker
        </Typography>
      </Box>
    </Container>
  );
};

export default JobBoard;
