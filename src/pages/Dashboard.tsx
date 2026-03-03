import StatisticCards from "../components/Cards/StatisticCards";
import ApplicationTable from "../components/ApplicationTable/ApplicationTable";
import Searchbar from "../components/Searchbar/Searchbar";
import { Container, Dialog } from "@mui/material";
import ApplicationEditor from "../components/ApplicationTable/ApplicationEditor";
import { useAppContext } from "../context/ApplicationContext";

const Dashboard = () => {
  const { open, handleClose } = useAppContext();

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
      <Dialog open={open} onClose={handleClose}>
        <ApplicationEditor />
      </Dialog>
    </Container>
  );
};

export default Dashboard;
