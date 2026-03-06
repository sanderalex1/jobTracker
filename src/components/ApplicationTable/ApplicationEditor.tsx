import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../../context/ApplicationContext";
import type { ApplicationStatus, JobApplication } from "../../types/types";
import styled from "@emotion/styled";

const ApplicationEditor = () => {
  const {
    static: { selectedApplication },
    action: { handleClose, addApplication, editApplication },
  } = useAppContext();
  const theme = useTheme();
  const [status, setStatus] = useState<ApplicationStatus>(
    selectedApplication?.status ?? "Applied",
  );

  const handleSumbit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const applicationData: JobApplication = {
      id: selectedApplication?.id ?? crypto.randomUUID(), // generate unique ID
      company: formJson.company,
      role: formJson.role,
      location: formJson.location,
      status: formJson.status as ApplicationStatus, // cast string to your enum type
      appliedDate: formJson.appliedDate,
      followUpDate: formJson.followUpDate,
      notes: formJson.notes || undefined, // optional field
    };

    if (selectedApplication) {
      editApplication(applicationData);
    } else {
      addApplication(applicationData);
    }
    handleClose();
  };

  const StyledTextField = styled(TextField)(() => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: "1rem",
      "&.Mui-focused fieldset": {
        borderColor: "#1976d2", // focus color
        borderWidth: "2px", // optional: make it thicker
      },
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#1976d2",
    },
  }));

  return (
    <Box sx={{ p: 5 }}>
      <DialogTitle>Add New Application</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSumbit} id="edit-form">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <StyledTextField
              required
              margin="dense"
              name="company"
              defaultValue={selectedApplication?.company}
              label="Company Name"
              type="text"
              fullWidth
              variant="outlined"
            />
            <StyledTextField
              required
              margin="dense"
              name="role"
              defaultValue={selectedApplication?.role}
              label="Role"
              type="text"
              fullWidth
              variant="outlined"
            />
            <StyledTextField
              required
              margin="dense"
              name="location"
              defaultValue={selectedApplication?.location}
              label="Location"
              type="text"
              fullWidth
              variant="outlined"
            />
            <Select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
              variant="outlined"
              displayEmpty
              sx={{
                width: "100%",
                borderRadius: "1rem",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                },
              }}
            >
              <MenuItem value="Applied">Applied</MenuItem>
              <MenuItem value="Interview">Interview</MenuItem>
              <MenuItem value="Offer">Offer</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
            <StyledTextField
              margin="normal"
              name="appliedDate"
              defaultValue={
                selectedApplication?.appliedDate
                  ? new Date(selectedApplication.appliedDate)
                      .toISOString()
                      .split("T")[0]
                  : new Date().toISOString().split("T")[0] // today’s date
              }
              label="Applied Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <StyledTextField
              margin="normal"
              name="followUpDate"
              defaultValue={
                selectedApplication?.appliedDate
                  ? new Date(selectedApplication.appliedDate)
                      .toISOString()
                      .split("T")[0]
                  : (() => {
                      const today = new Date();
                      today.setDate(today.getDate() + 7); // add 7 days
                      return today.toISOString().split("T")[0];
                    })()
              }
              label="Follow-up Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <StyledTextField
              margin="normal"
              name="notes"
              defaultValue={selectedApplication?.notes}
              label="Notes"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
            />
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            borderColor: theme.palette.background.button,
            color: theme.palette.text.primary,
            borderRadius: 3,
            px: 2,
          }}
          variant="outlined"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: theme.palette.background.button,
            color: "white",
            borderRadius: 3,
            px: 2,
          }}
          variant="contained"
          type="submit"
          form="edit-form"
        >
          Save
        </Button>
      </DialogActions>
    </Box>
  );
};

export default ApplicationEditor;
