import StatisticCards from "../components/Cards/StatisticCards";
import ApplicationTable from "../components/ApplicationTable/ApplicationTable";
import Searchbar from "../components/Searchbar/Searchbar";
import { Container } from "@mui/material";

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
      <StatisticCards />
    </Container>
  );
};

export default Dashboard;
