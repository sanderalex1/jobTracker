import {
  InputAdornment,
  OutlinedInput,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { useAppContext } from "../../../context/ApplicationContext";
import type { ApplicationStatus } from "../../../types/types";

const Filter = () => {
  const [status, setStatus] = useState<ApplicationStatus | "">("");
  const {
    action: { statusFilter },
  } = useAppContext();

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as ApplicationStatus | "";
    const parsed = value || undefined;

    setStatus(value);
    statusFilter(parsed);
  };

  return (
    <Select
      value={status ?? ""}
      onChange={handleChange}
      displayEmpty
      variant="outlined"
      sx={{
        width: "15%",
        borderRadius: "2rem",
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#1976d2",
          borderWidth: "2px",
        },
      }}
      input={
        <OutlinedInput
          startAdornment={
            <InputAdornment position="start">
              <FilterListIcon sx={{ color: "text.secondary" }} />
            </InputAdornment>
          }
        />
      }
    >
      <MenuItem value={""}>All Statuses</MenuItem>
      <MenuItem value="Applied">Applied</MenuItem>
      <MenuItem value="Interview">Interview</MenuItem>
      <MenuItem value="Offer">Offer</MenuItem>
      <MenuItem value="Rejected">Rejected</MenuItem>
    </Select>
  );
};

export default Filter;
