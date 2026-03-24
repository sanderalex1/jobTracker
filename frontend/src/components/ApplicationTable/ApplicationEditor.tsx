import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../../context/ApplicationContext";
import type { ApplicationStatus, JobApplication } from "../../types/types";
import { StyledTextField } from "../muiComponents";

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
      id: selectedApplication?.id ?? crypto.randomUUID(),
      company: formJson.company,
      role: formJson.role,
      location: formJson.location,
      status: formJson.status as ApplicationStatus,
      appliedDate: new Date(formJson.appliedDate as string),
      followUpDate: formJson.followUpDate
        ? new Date(formJson.followUpDate as string)
        : undefined,
      notes: formJson.notes || undefined,
    };

    if (selectedApplication) {
      editApplication(applicationData.id, applicationData);
    } else {
      addApplication(applicationData);
    }
    handleClose();
  };

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
                selectedApplication?.followUpDate
                  ? new Date(selectedApplication.followUpDate)
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
            <StyledTextField
              margin="normal"
              name="link"
              defaultValue={selectedApplication?.link}
              label="Link"
              fullWidth
              variant="outlined"
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
