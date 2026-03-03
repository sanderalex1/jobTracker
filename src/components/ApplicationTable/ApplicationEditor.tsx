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
  const [status, useStatus] = useState("Applied");
  const { handleClose, addApplication } = useAppContext();
  const handleSumbit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    const newApplication: JobApplication = {
      id: crypto.randomUUID(), // generate unique ID
      company: formJson.company,
      role: formJson.role,
      location: formJson.location,
      status: formJson.status as ApplicationStatus, // cast string to your enum type
      appliedDate: formJson.appliedDate,
      followUpDate: formJson.followUpDate,
      notes: formJson.notes || undefined, // optional field
    };
    addApplication(newApplication);
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
            id="name"
            label="Company Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="role"
            label="Role"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            variant="outlined"
          />
          <Select
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="edit-form">
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default ApplicationEditor;
