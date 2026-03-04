import { Box, Grid } from "@mui/material";
import StatisticCard from "./StatisticCard";
import { useAppContext } from "../../context/ApplicationContext";
import {
  ApplicationStatusEnum,
  type ApplicationStatus,
} from "../../data/types";

const StatisticCards = () => {
  const {
    static: { statusCounter },
  } = useAppContext();
  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {(Object.keys(ApplicationStatusEnum) as ApplicationStatus[]).map(
          (status: ApplicationStatus) => (
            <Grid key={status} size={{ xs: 4, sm: 4, md: 3 }}>
              <StatisticCard
                status={status}
                count={statusCounter[status] ?? 0}
              />
            </Grid>
          ),
        )}
      </Grid>
    </Box>
  );
};

export default StatisticCards;
