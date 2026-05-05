import Dashboard from "./pages/Dashboard";
import Header from "./components/UI/Header/Header";
import { Box, useTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobBoard from "./pages/JobBoard";
function App() {
  const theme = useTheme();
  return (
    <>
      <BrowserRouter>
        <Header />
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            height: "100svh",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<JobBoard />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
