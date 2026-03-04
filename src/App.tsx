import Dashboard from "./pages/Dashboard";
import Header from "./components/UI/Header/Header";
import { Box, useTheme } from "@mui/material";
function App() {
  const theme = useTheme();
  return (
    <>
      <Header />

      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          height: "100svh",
        }}
      >
        <Dashboard />
      </Box>
    </>
  );
}

export default App;
