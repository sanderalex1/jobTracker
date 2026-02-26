import { Box } from "@mui/material";
import { mockApplications } from "../../data/mockData";
import StatisticCard from "./StatisticCard";

const StatisticCards = () => {
  const statusList = mockApplications.map((e) => e.status);
  const uniqueStatus = [...new Set(statusList)];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
      }}
    >
      {uniqueStatus.map((status) => (
        <StatisticCard key={status} status={status} />
      ))}
    </Box>
  );
};

export default StatisticCards;
