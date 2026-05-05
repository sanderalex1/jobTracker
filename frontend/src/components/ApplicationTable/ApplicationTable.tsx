import {
  Chip,
  IconButton,
  Link,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from "@mui/material";
import { useAppContext } from "../../context/ApplicationContext";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ApplicationEmptyCard from "./ApplicationEmptyCard";
import LinkIcon from "@mui/icons-material/Link";
import { StyledTableCell } from "../muiComponents";

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
    static: { applications, sortBy, order, page, total, limit },
    action: {
      removeApplication,
      setSelectedApplication,
      handleOpen,
      setOrder,
      handleSetSortBy,
      setPage,
      setLimit,
    },
  } = useAppContext();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

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
                        if (key === sortBy) {
                          // same column — toggle direction
                          setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                        } else {
                          // different column — reset to asc
                          handleSetSortBy(key);
                          setOrder("asc");
                        }
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
                <StyledTableCell>
                  {row.company}
                  {row.link ? (
                    <Link target="_blank" href={row.link} rel="noopener">
                      <IconButton>
                        <LinkIcon sx={{ color: "background.button" }} />
                      </IconButton>
                    </Link>
                  ) : null}
                </StyledTableCell>
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
        <TablePagination
          component="div"
          count={total}
          page={page - 1}
          onPageChange={(_, newPage) => setPage(newPage + 1)}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    );
  }
};

export default ApplicationTable;
