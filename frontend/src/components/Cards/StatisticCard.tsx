import { Box, Typography, useTheme } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import type { ApplicationStatus } from "../../types/types";
import { type JSX } from "react";

type StatisticCardProps = {
  status: ApplicationStatus;
  count: number;
  activeStatus: ApplicationStatus | "";
  onStatusClick: (status: ApplicationStatus) => void;
};

const StatisticCard = ({
  status,
  count,
  activeStatus,
  onStatusClick,
}: StatisticCardProps) => {
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
        border: activeStatus === status ? "2px solid" : "1px solid",
        borderColor:
          activeStatus === status ? theme.statusColors[status] : "divider",
        padding: "1.5rem",
        borderRadius: "1rem",
        display: "flex",
        gap: 4,
        justifyItems: "center",
        width: "100%",
        backgroundColor: theme.palette.background.default,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
          cursor: "pointer",
        },
      }}
      onClick={() => {
        onStatusClick(status);
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
