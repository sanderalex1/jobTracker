import { Box, Typography, useTheme } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import type { ApplicationStatus } from "../../data/types";
import type { JSX } from "react";

type StatisticCardProps = {
  status: ApplicationStatus;
  count: number;
};

const StatisticCard = ({ status, count }: StatisticCardProps) => {
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
        borderColor: "divider",
        padding: "1.5rem",
        borderRadius: "1rem",
        display: "flex",
        gap: 4,
        justifyItems: "center",
        width: "100%",
        backgroundColor: theme.palette.background.default,
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        },
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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{ color: theme.palette.text.secondary }}
          variant="body1"
        >
          {status}
        </Typography>
        <Typography variant="h1">{count}</Typography>
      </Box>
    </Box>
  );
};

export default StatisticCard;
