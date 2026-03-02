import Dashboard from "./pages/Dashboard";
import Header from "./components/UI/Header/Header";
import { Box, useTheme } from "@mui/material";
function App() {
  const theme = useTheme();
  return (
    <>
      <Header />
      <body>
        <Box sx={{ backgroundColor: theme.palette.background.paper }}>
          <Dashboard />
        </Box>
      </body>
    </>
  );
}

export default App;
