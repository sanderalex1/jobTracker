import styled from "@emotion/styled";
import {
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { useAppContext } from "../../context/ApplicationContext";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import ApplicationEmptyCard from "./ApplicationEmptyCard";

const ApplicationTable = () => {
  const theme = useTheme();

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.background.headDashboard,
      color: theme.palette.text.primary,
      fontSize: theme.typography.h4.fontSize,
      fontWeight: theme.typography.h4.fontWeight,
      lineHeight: theme.typography.h4.lineHeight,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: theme.typography.body1.fontSize,
      fontWeight: theme.typography.body1.fontWeight,
      lineHeight: theme.typography.body1.lineHeight,
    },
  }));
  const {
    applications,
    removeApplication,
    setSelectedApplication,
    handleOpen,
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
              <StyledTableCell>Company</StyledTableCell>
              <StyledTableCell align="left">Role</StyledTableCell>
              <StyledTableCell align="left">Location</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Applied Date</StyledTableCell>
              <StyledTableCell align="left">Follow-up Date</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
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
                <StyledTableCell>{row.appliedDate}</StyledTableCell>
                <StyledTableCell>{row.followUpDate}</StyledTableCell>
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
