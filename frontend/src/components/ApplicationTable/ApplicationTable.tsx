import {
  Chip,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { useAppContext } from "../../context/ApplicationContext";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ApplicationEmptyCard from "./ApplicationEmptyCard";
import { StyledTableCell } from "../muiComponents";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropUp";

const ApplicationTable = () => {
  const theme = useTheme();

  const headers = [
    { label: "Company", sortKey: "company" },
    { label: "Role", sortKey: null },
    { label: "Location", sortKey: null },
    { label: "Status", sortKey: null },
    { label: "Applied Date", sortKey: "applied_date" },
    { label: "Follow-up Date", sortKey: null },
    { label: "Actions", sortKey: null },
  ];

  const {
    static: { applications, sortBy, order },
    action: {
      removeApplication,
      setSelectedApplication,
      handleOpen,
      setOrder,
      setSortBy,
    },
  } = useAppContext();

  if (applications.length === 0) {
    return <ApplicationEmptyCard />;
  } else {
    return (
      <TableContainer
        sx={{
          border: "1px solid",
          borderRadius: "1rem",
          borderColor: "divider",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <StyledTableCell key={header.label} align="left">
                  {header.sortKey ? (
                    <span
                      onClick={() => {
                        const key = header.sortKey as
                          | "company"
                          | "applied_date";
                        setSortBy(key);
                        setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {header.label}
                      {header.sortKey === sortBy
                        ? order === "asc"
                          ? "↑"
                          : "↓"
                        : "↕"}
                    </span>
                  ) : (
                    header.label
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((row) => (
              <TableRow
                hover={true}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.background.paper,
                  },
                }}
                key={row.id}
              >
                <StyledTableCell>{row.company}</StyledTableCell>
                <StyledTableCell>{row.role}</StyledTableCell>
                <StyledTableCell>{row.location}</StyledTableCell>
                <StyledTableCell>
                  <Chip
                    label={row.status}
                    sx={{
                      backgroundColor: theme.statusColors[row.status], // dynamic color
                      color: theme.palette.text.primary, // optional text color
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(row.appliedDate).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>
                  {row.followUpDate
                    ? new Date(row.followUpDate).toLocaleDateString()
                    : ""}
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    sx={{ color: theme.statusColors.Applied }}
                    onClick={() => {
                      (setSelectedApplication(row), handleOpen());
                    }}
                  >
                    <CreateIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: theme.statusColors.Rejected }}
                    onClick={() => removeApplication(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};

export default ApplicationTable;
