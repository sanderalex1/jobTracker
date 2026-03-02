import {
  TextField,
  InputAdornment,
  Select,
  Box,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
const Searchbar = () => {
  const [status, useStatus] = useState("");

  return (
    <Box sx={{ display: "flex", gap: 4 }}>
      <TextField
        variant="outlined"
        placeholder="Search by company, role, or location..."
        sx={{
          width: "85%",
          "& .MuiOutlinedInput-root": {
            borderRadius: "2rem",
            "&:hover fieldset": {
              borderColor: "black", // hover color
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2", // focus color
              borderWidth: "2px", // optional: make it thicker
            },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          },
        }}
      />
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
    </Box>
  );
};

export default Searchbar;
