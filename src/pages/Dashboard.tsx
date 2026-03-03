import StatisticCards from "../components/Cards/StatisticCards";
import ApplicationTable from "../components/ApplicationTable/ApplicationTable";
import Searchbar from "../components/Searchbar/Searchbar";
import { Container } from "@mui/material";

const Dashboard = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <StatisticCards />
      <Searchbar />
      <ApplicationTable />
    </Container>
  );
};

export default Dashboard;
