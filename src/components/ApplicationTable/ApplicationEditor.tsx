import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../../context/ApplicationContext";
import type { ApplicationStatus, JobApplication } from "../../data/types";

const ApplicationEditor = () => {
  const { handleClose, addApplication, editApplication, selectedApplication } =
    useAppContext();
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

  return (
    <>
      <DialogTitle>Add New Application</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSumbit} id="edit-form">
          <TextField
            required
            margin="dense"
            name="company"
            defaultValue={selectedApplication?.company}
            label="Company Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            name="role"
            defaultValue={selectedApplication?.role}
            label="Role"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
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
              borderRadius: "2rem",
            }}
          >
            <MenuItem value="Applied">Applied</MenuItem>
            <MenuItem value="Interview">Interview</MenuItem>
            <MenuItem value="Offer">Offer</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
          <TextField
            required
            margin="dense"
            name="appliedDate"
            defaultValue={selectedApplication?.appliedDate}
            label="Applied Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            required
            margin="dense"
            name="followUpDate"
            defaultValue={selectedApplication?.followUpDate}
            label="Follow-up Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          sx={{ background: "blue" }}
          variant="outlined"
          type="submit"
          form="edit-form"
        >
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default ApplicationEditor;
