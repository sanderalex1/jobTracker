import { TextField, InputAdornment, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import Filter from "./Filter/Filter";

const Searchbar = () => {
  return (
    <Box sx={{ display: "flex", gap: 4 }}>
      <TextField
        variant="outlined"
        placeholder="Search by company, role, or location..."
        sx={{
          width: "85%",
          "& .MuiOutlinedInput-root": {
            borderRadius: "2rem",
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
      <Filter />
    </Box>
  );
};

export default Searchbar;
