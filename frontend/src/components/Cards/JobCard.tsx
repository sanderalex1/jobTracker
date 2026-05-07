import {
  Box,
  Button,
  Collapse,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import AddIcon from "@mui/icons-material/Add";
import BusinessIcon from "@mui/icons-material/Business";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import type { ScrapedJob } from "../../types/types";
import { JobCardTypography } from "../muiComponents";
import { useState } from "react";

const JobCard = ({
  job,
  addApplication,
}: {
  job: ScrapedJob;
  addApplication: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={{
        p: 4,
        border: "1px solid",
        borderRadius: 3,
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="h3">{job.title}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <JobCardTypography variant="body1">
              <BusinessIcon sx={{ fontSize: "16px" }} />
              {job.company}
            </JobCardTypography>
            <JobCardTypography>
              <LocationPinIcon sx={{ fontSize: "16px" }} />
              {job.location}
            </JobCardTypography>
            <JobCardTypography>
              <CalendarMonthIcon sx={{ fontSize: "16px" }} />
              {job.postedDate
                ? new Date(job.postedDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : ""}
            </JobCardTypography>
            {job.salary && (
              <JobCardTypography sx={{ color: "green" }}>
                <AttachMoneyIcon sx={{ color: "green", fontSize: "16px" }} />
                {job.salary}
              </JobCardTypography>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Link
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "background.button",
              },
            }}
            target="_blank"
            href={job.link}
          >
            <LaunchIcon sx={{ display: "flex", alignSelf: "center" }} />
          </Link>
          <Button
            onClick={addApplication}
            sx={{
              backgroundColor: "background.button",
              borderRadius: "1rem",
              p: "0.5rem",
              display: "flex",
              gap: 0.5,
            }}
          >
            <AddIcon fontSize="small" />
            <Typography
              variant="button"
              sx={{ textTransform: "capitalize", fontSize: "12px" }}
            >
              Add to Tracker
            </Typography>
          </Button>
        </Box>
      </Box>
      <Divider sx={{ py: 0.5 }} />
      <Box sx={{ pt: 2 }}>
        <Collapse in={expanded} collapsedSize={60}>
          <Typography variant="body2">{job.description}</Typography>
        </Collapse>
        <Typography
          onClick={() => setExpanded((prev) => !prev)}
          sx={{
            color: "background.button",
            cursor: "pointer",
            mt: 1,
          }}
        >
          {expanded ? (
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              variant="body2"
            >
              Show less <ArrowDropUpIcon fontSize="small" />
            </Typography>
          ) : (
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              variant="body2"
            >
              Show more <ArrowDropDownIcon fontSize="small" />
            </Typography>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default JobCard;
