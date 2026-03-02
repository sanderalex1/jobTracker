import { Box } from "@mui/material";
import StatisticCard from "./StatisticCard";
import { useAppContext } from "../../context/ApplicationContext";
import type { ApplicationStatus } from "../../data/types";

const StatisticCards = () => {
  const { uniqueStatus, statusCounter } = useAppContext();
  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
      }}
    >
      {uniqueStatus.map((status: ApplicationStatus) => (
        <StatisticCard
          key={status}
          status={status}
          count={statusCounter[status] ?? 0}
        />
      ))}
    </Box>
  );
};

export default StatisticCards;
