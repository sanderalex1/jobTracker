import { Box, Grid } from "@mui/material";
import StatisticCard from "./StatisticCard";
import { useAppContext } from "../../context/ApplicationContext";
import {
  ApplicationStatusEnum,
  type ApplicationStatus,
} from "../../types/types";
import { useState } from "react";

const StatisticCards = () => {
  const [activeStatus, setActiveStatus] = useState<ApplicationStatus | "">("");
  const {
    static: { stats },
    action: { setStatus },
  } = useAppContext();

  const handleStatusClick = (clickedStatus: ApplicationStatus) => {
    if (clickedStatus === activeStatus) {
      setActiveStatus("");
      setStatus("");
    } else {
      setActiveStatus(clickedStatus);
      setStatus(clickedStatus);
    }
  };

  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {ApplicationStatusEnum.map((status: ApplicationStatus) => (
          <Grid key={status} size={{ xs: 4, sm: 4, md: 3 }}>
            <StatisticCard
              status={status}
              stats={stats}
              activeStatus={activeStatus}
              onStatusClick={handleStatusClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatisticCards;
