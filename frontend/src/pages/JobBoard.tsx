import {
  Box,
  Container,
  Divider,
  TablePagination,
  Typography,
} from "@mui/material";
import { useAppContext } from "../context/ApplicationContext";
import { useScrapedJobs } from "../hooks/useScrapedJobs";
import JobCard from "../components/Cards/JobCard";

const JobBoard = () => {
  const {
    action: { addApplication },
  } = useAppContext();

  const { scrapedJobs, markAsApplied, setLimit, setPage, limit, total, page } =
    useScrapedJobs();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

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
        <TablePagination
          component="div"
          count={total}
          page={page - 1}
          onPageChange={(_, newPage) => setPage(newPage + 1)}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {scrapedJobs.map((j) => (
          <JobCard
            key={j.id}
            addApplication={() => {
              markAsApplied(j.id);
              addApplication({
                id: crypto.randomUUID(),
                company: j.company,
                role: j.title,
                location: j.location,
                link: j.link,
                notes: j.description ?? undefined,
                status: "Applied",
                appliedDate: new Date(),
              });
            }}
            job={j}
          />
        ))}
      </Box>
    </Container>
  );
};

export default JobBoard;
