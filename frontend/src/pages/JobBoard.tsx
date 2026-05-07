import { Box, Container, Divider, Typography } from "@mui/material";
import { useAppContext } from "../context/ApplicationContext";
import { useScrapedJobs } from "../hooks/useScrapedJobs";
import JobCard from "../components/Cards/JobCard";

const JobBoard = () => {
  const {
    action: { handleOpen, setSelectedScrapedJob },
  } = useAppContext();

  const { scrapedJobs, markAsApplied } = useScrapedJobs();

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, py: 4 }}>
        <Typography variant="h1">Job Board</Typography>
        <Typography variant="body1">
          Browse scraped job listings and add them to your tracker
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{ pt: 2, pb: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {scrapedJobs.map((j) => (
          <JobCard
            key={j.id}
            isOpen={() => {
              setSelectedScrapedJob(j);
              handleOpen();
              markAsApplied(j.id);
            }}
            job={j}
          />
        ))}
      </Box>
    </Container>
  );
};

export default JobBoard;
