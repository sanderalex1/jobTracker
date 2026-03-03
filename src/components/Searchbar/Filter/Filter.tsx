import { InputAdornment, OutlinedInput, Select, MenuItem } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";

const Filter = () => {
  const [status, useStatus] = useState("");
  return (
    <Select
      value={status}
      variant="outlined"
      displayEmpty
      sx={{
        width: "15%",
        borderRadius: "2rem",
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#1976d2", // border on focus
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
      <MenuItem value="">All Statuses</MenuItem>
      <MenuItem value="Applied">Applied</MenuItem>
      <MenuItem value="Interview">Interview</MenuItem>
      <MenuItem value="Offer">Offer</MenuItem>
      <MenuItem value="Rejected">Rejected</MenuItem>
    </Select>
  );
};

export default Filter;
