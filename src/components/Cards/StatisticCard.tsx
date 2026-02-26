import { Box, useTheme } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import type { ApplicationStatus } from "../../data/types";
import type { JSX } from "react";

type StatisticCardProps = {
  status: ApplicationStatus;
};

const StatisticCard = ({ status }: StatisticCardProps) => {
  const theme = useTheme();

  const statusIcons: Record<ApplicationStatus, JSX.Element> = {
    Applied: <ArticleIcon fontSize="large" />,
    Interview: <CalendarMonthIcon fontSize="large" />,
    Offer: <CheckCircleIcon fontSize="large" />,
    Rejected: <CancelIcon fontSize="large" />,
  };

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: theme.palette.text.primary,
        p: "1.5rem",
      }}
    >
      <Box
        sx={{
          color: theme.statusColors[status],
          backgroundColor: theme.statusColorsLight[status],
          p: "0.75rem",
          borderRadius: "1rem",
        }}
        key={status}
      >
        {statusIcons[status]}
      </Box>
    </Box>
  );
};

export default StatisticCard;
